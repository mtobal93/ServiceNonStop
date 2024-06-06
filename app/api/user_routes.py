from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Company, Review, Image
from .company_routes import get_company_by_company_id


user_routes = Blueprint("users", __name__)


@user_routes.route("/")
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route("/<int:id>")
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    user_dict = user.to_dict()

    user_image = Image.query.filter(
        Image.imageable_type == "user" and Image.imageable_id == id
    ).first()
    user_profile_pic = {"id": user_image.id, "image_url": user_image.url}
    review_counts = Review.query.filter(Review.user_id == id).count()
    image_counts = (
        Image.query.filter(Image.uploaded_by_id == id)
        .filter(Image.imageable_type == "user")
        .count()
    )

    user_dict["user_profile_pic"] = user_profile_pic
    user_dict["review_counts"] = review_counts
    user_dict["image_counts"] = image_counts

    return user_dict


@user_routes.route("<int:id>/images/all")
def get_all_user_images(id):
    user_all_images = (
        Image.query.filter(Image.uploaded_by_id == id)
        .filter(Image.imageable_type != "user")
        .all()
    )

    user_all_images_list = []

    for user_image in user_all_images:
        user_image_dict = {}
        user_image_dict["id"] = user_image.id
        user_image_dict["image_url"] = user_image.url
        user_image_dict['type'] = user_image.imageable_type
        user_image_dict['type_id'] = user_image.imageable_id

        company_id: int

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


        get_company_res =  get_company_by_company_id(company_id)
        company_name = get_company_res['company'][0]['name']
        user_image_dict['company_name'] = company_name
            

        user_all_images_list.append(user_image_dict)

    return user_all_images_list


@user_routes.route('/<int:id>/reviews')
def user_reviews(id):
    """
    Query to fetch all reviews written by a specific user and returns them in a list of dictionaries
    """
    from .review_routes import reviews_route, get_review # importing here to resolve circular import error
    user_reviews = Review.query.filter(Review.user_id == id).all()
    # all_user_reviews = {'reviews': []} # create dict to hold list of all reviews

    def format_reviews(review):
        review_id = review.to_dict()['id'] # extract review id
        review_dict_indiv = get_review(review_id) # use get review by id route to simplify this route
        company = get_company_by_company_id(review_dict_indiv['company_id'])
        review_dict_indiv['company'] = company 
        del review_dict_indiv['company_id']

        return { review_id: review_dict_indiv } # create a final dict to hold each review with the key as the id for easier routing


    all_reviews_dict = [format_reviews(user_review) for user_review in user_reviews] # structure final response dict by calling the above helper function to 
    return all_reviews_dict