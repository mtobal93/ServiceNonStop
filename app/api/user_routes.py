from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Image, Review, Company
from .company_routes import get_company

from sqlalchemy import func 


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():

    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route("/<int:id>/images/all")
def user_images_all(id):

    user_images_all = Image.query.filter(Image.uploaded_by_id == id).filter(Image.imageable_type != 'user').all() # fetching all images uploaded by user and all associated data

    user_images_all_list = []  
    for user_image in user_images_all: 
        user_image_dict = {}
        user_image_dict['id'] = user_image.id
        user_image_dict['image_url'] = user_image.url
        user_image_dict['type'] = user_image.imageable_type
        user_image_dict['type_id'] = user_image.imageable_id 




        if user_image_dict['type'] == 'company':
            company_id = user_image_dict['type_id']
            user_image_dict['company_id'] = company_id
            user_image_dict['comp_images_count'] = Image.query.filter(Image.imageable_type == 'company').filter(Image.imageable_id == company_id).count()
            

        # ! refactor to use get review by id request instead
        if user_image_dict['type'] == 'review':
            get_review_res = Review.query.filter(Review.id == user_image_dict['type_id']).first()
            company_id = get_review_res.company_id
            user_image_dict['company_id'] = company_id
            user_image_dict['comp_images_count'] = 'not applicable'


        get_company_res =  get_company(company_id)
        company_name = get_company_res['company'][0]['name']
        user_image_dict['company_name'] = company_name
            

        user_images_all_list.append(user_image_dict)

        


    return user_images_all_list

@user_routes.route('/<int:id>/reviews')
def user_reviews(id):

    from .review_routes import get_review 
    user_reviews = Review.query.filter(Review.user_id == id).all()


    def format_reviews(review):
        review_id = review.to_dict()['id']
        review_dict_indiv = get_review(review_id) 
        company = get_company(review_dict_indiv['company_id'])
        review_dict_indiv['company'] = company 
        del review_dict_indiv['company_id']

        return { review_id: review_dict_indiv } 


    all_reviews_dict = [format_reviews(user_review) for user_review in user_reviews]  
    return all_reviews_dict

@user_routes.route('/<int:id>')
def user(id):

    user = User.query.get(id)
    dict_user = user.to_dict()
    

    user_image = Image.query.filter(Image.imageable_type == 'user' and Image.imageable_id == id).first()
    user_pfp = {'id': user_image.id, 'image_url': user_image.url}
    dict_user['user_pfp'] = user_pfp

    review_count = Review.query.filter(Review.user_id == id).count()
    dict_user['num_reviews'] = review_count

    image_count = Image.query.filter(Image.uploaded_by_id == id).filter(Image.imageable_type != 'user').count()
    dict_user['num_images'] = image_count    



    return dict_user
