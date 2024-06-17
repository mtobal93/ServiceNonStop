from flask import Blueprint, request;
from flask_login import login_required, current_user
from sqlalchemy import func, desc
from app.models import Company, Review, Image, User, Category, db;
from app.forms import CreateCompanyForm, CreateReviewForm

company_routes = Blueprint('companies', __name__)

@company_routes.route('/<int:id>')
def get_company(id):
    """
    Query for a company by id and returns that company in a dictionary
    """
    company = Company.query.get(id)
    if (company is None):
        return {'message': 'Company couldn\'t be found' }, 404

    company_data = []
    company_dict = company.to_dict()
    review_images = {}


    reviews = Review.query.filter(Review.company_id == id).all()
    review_ids = [review.id for review in reviews]
    review_images = Image.query.filter((Image.imageable_type == 'review'), Image.imageable_id.in_(review_ids)).all()

    total_stars = 0
    num_reviews = len(reviews)

    for review in reviews:
        total_stars += review.stars

        review_image_data = [{
            'id': image.id,
            'url': image.url,
            'uploaded_by_id': image.uploaded_by_id,
            } for image in review_images]

    company_dict['reviews'] = {
        'num_reviews': num_reviews,
        'avg_stars': None,
    }

    if num_reviews > 0:
        avg_stars = total_stars / num_reviews
        company_dict['reviews']['avg_stars'] = avg_stars
        company_dict['review_images'] = review_image_data


    company_images = Image.query.filter((Image.imageable_type == 'company'), Image.imageable_id == id).all()
    company_image_urls = [{'id': image.id, 'image_url': image.url, 'uploaded_by_id': image.uploaded_by_id} for image in company_images]
    company_dict['company_images'] = company_image_urls

    categories = Category.query.filter(Category.id == company.category_id)
    category_dict = { category.id: {
        'id': category.id,
        'name': category.name
        } for category in categories }
    category_data = category_dict.get(company.category_id)

    company_dict['category'] = category_data

    company_dict['set_hours'] = company.set_hours
    company_dict['hours'] = {
        'mon_open': company.mon_open,
        'mon_close': company.mon_close,
        'tues_open': company.tues_open,
        'tues_close': company.tues_close,
        'wed_open': company.wed_open,
        'wed_close': company.wed_close,
        'thu_open': company.thu_open,
        'thu_close': company.thu_close,
        'fri_open': company.fri_open,
        'fri_close': company.fri_close,
        'sat_open': company.sat_open,
        'sat_close': company.sat_close,
        'sun_open': company.sun_open,
        'sun_close': company.sun_close,
    }

    company_data.append(company_dict)
    return { 'company': company_data }


@company_routes.route('/<int:id>/reviews')
def get_reviews_by_company_id(id):
    company = Company.query.get(id)

    if (company == None):
        return {"message": "Company couldn\'t be found"}, 404

    reviews = Review.query.filter(Review.company_id == id).order_by(Review.created_at.desc()).all()


    user_ids = [review.user_id for review in reviews]
    users = User.query.filter(User.id.in_(user_ids)).all()
    review_ids = [review.id for review in reviews]
    review_images = Image.query.filter((Image.imageable_type == 'review'), Image.imageable_id.in_(review_ids)).all()

    user_images = Image.query.filter(Image.imageable_type == 'user').filter(User.id.in_(user_ids)).all()

    user_image_dict = {image.imageable_id: image.url for image in user_images}

    all_reviews = Review.query.all()

    user_num_reviews = {}

    for review in all_reviews:
        user_id = review.user_id
        if user_id in user_num_reviews:
            user_num_reviews[user_id] += 1
        else:
            user_num_reviews[user_id] = 1

    all_company_review_images = Image.query.filter(Image.imageable_type != 'user').all()

    user_num_images = {}

    for image in all_company_review_images:
        user_id = image.uploaded_by_id
        if user_id in user_num_images:
            user_num_images[user_id] += 1
        else:
            user_num_images[user_id] = 1

    users_dict = { user.id: {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'city': user.city,
        'state': user.state,
        'user_image_url': user_image_dict.get(user.id),
        'user_num_reviews': user_num_reviews.get(user.id, 0),
        'user_num_images': user_num_images.get(user.id, 0)
        } for user in users }


    reviews_list = []

    for review in reviews:
        user_data = users_dict.get(review.user_id)
        review_image_data =  [{
                    'id': image.id,
                    'url': image.url,
                    'uploaded_by_id': image.uploaded_by_id
                    } for image in review_images if image.uploaded_by_id == review.user_id]

        if len(review_image_data) == 0:
            review_image_data = "No review images found"

        review_data = {
                'id': review.id,
                'user_id': review.user_id,
                'company_id': review.company_id,
                'review': review.review,
                'stars': review.stars,
                'created_at': review.created_at,
                'updated_at': review.updated_at,
                'user': user_data,
                'review_images': review_image_data
        }

        reviews_list.append(review_data)

    if len(reviews_list) == 0:
        return { "reviews": "No reviews found" }
    else:
        return { 'reviews': reviews_list }


@company_routes.route('/<int:company_id>/reviews', methods=['POST'])
@login_required
def create_review(company_id):

    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    company_owner_id = get_company(company_id)['company'][0]['owner_id']
    current_user_id = current_user.id



    forbidden_res = {'errors': {'message': 'Forbidden' }}, 403

    def forbidden_res_func():

        return {'errors': {'message': 'Forbidden' }}, 403

    existing_review = Review.query.filter(Review.user_id == current_user_id, Review.company_id== company_id).first()
    if existing_review:
        return forbidden_res_func()

    if current_user_id == company_owner_id:
        return forbidden_res_func()



    if not existing_review:
        if form.validate_on_submit():
            review = Review(
                user_id = current_user_id,
                company_id = company_id,
                review = form.data['review'],
                stars = form.data['stars']
            )
            db.session.add(review)
            db.session.commit()

            return review.to_dict()
    return form.errors, 401


@company_routes.route('/', methods=['POST'])
@login_required
def create_company():
    form = CreateCompanyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        company = Company(
            owner_id = current_user.id,
            category_id = form.data['category_id'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            name=form.data['name'],
            description=form.data['description'],
            website=form.data['website'],
            email=form.data['email'],
            phone=form.data['phone'],
            price=form.data['price'],
            set_hours=form.data['set_hours'],
            mon_open=form.data['mon_open'],
            mon_close=form.data['mon_close'],
            tues_open=form.data['tues_open'],
            tues_close=form.data['tues_close'],
            wed_open=form.data['wed_open'],
            wed_close=form.data['wed_close'],
            thu_open=form.data['thu_open'],
            thu_close=form.data['thu_close'],
            fri_open=form.data['fri_open'],
            fri_close=form.data['fri_close'],
            sat_open=form.data['sat_open'],
            sat_close=form.data['sat_close'],
            sun_open=form.data['sun_open'],
            sun_close=form.data['sun_close'],
        )
        db.session.add(company)
        db.session.commit()

        return company.to_dict()
    return form.errors, 401



@company_routes.route('/<int:id>/images')
def get_images_by_company_id(id):
    company = Company.query.get(id)

    if (company == None):
        return {"message": "Company couldn't be found" }, 404

    reviews = Review.query.filter(Review.company_id == id).all()
    review_ids = [review.id for review in reviews]
    review_images = Image.query.filter((Image.imageable_type == 'review'), Image.imageable_id.in_(review_ids)).all()

    images_dict = {}

    review_images_data = [{
        'id': image.id,
        'url': image.url,
        'uploaded_by_id': image.uploaded_by_id,
        'user': {
            'id': image.uploaded_by.id,
            'first_name': image.uploaded_by.first_name,
            'last_name': image.uploaded_by.last_name
            },
        'imageable_id': image.imageable_id,
        'imageable_type': image.imageable_type,
        'created_at': image.created_at,
        'updated_at': image.updated_at
        } for image in review_images]

    images_dict['review_images'] = review_images_data

    company_images = Image.query.filter((Image.imageable_type == 'company'), Image.imageable_id == id).all()

    company_images_data = [{
        'id': image.id,
        'url': image.url,
        'uploaded_by_id': image.uploaded_by_id,
        'user': {
            'id': image.uploaded_by.id,
            'first_name': image.uploaded_by.first_name,
            'last_name': image.uploaded_by.last_name
            },
        'imageable_id': image.imageable_id,
        'imageable_type': image.imageable_type,
        'created_at': image.created_at,
        'updated_at': image.updated_at
        } for image in company_images]

    images_dict['company_images'] = company_images_data
    images_dict['company_id'] = id
    images_dict['company_name'] = company.name

    return { 'images': images_dict }, 200


@company_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def update_company(id):

    company = Company.query.get(id)

    if company is None:
        return {'message': 'Company couldn\'t be found' }, 404

    if company.owner_id != current_user.id:
        return {'message': 'YOU DONT OWN THIS COMPANY!'}, 401

    form = CreateCompanyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        company.category_id = form.data['category_id']
        company.address = form.data['address']
        company.city = form.data['city']
        company.state = form.data['state']
        company.zip_code = form.data['zip_code']
        company.name = form.data['name']
        company.description = form.data['description']
        company.website = form.data['website']
        company.email = form.data['email']
        company.phone = form.data['phone']
        company.price = form.data['price']
        company.set_hours=form.data['set_hours']
        company.mon_open=form.data['mon_open']
        company.mon_close=form.data['mon_close']
        company.tues_open=form.data['tues_open']
        company.tues_close=form.data['tues_close']
        company.wed_open=form.data['wed_open']
        company.wed_close=form.data['wed_close']
        company.thu_open=form.data['thu_open']
        company.thu_close=form.data['thu_close']
        company.fri_open=form.data['fri_open']
        company.fri_close=form.data['fri_close']
        company.sat_open=form.data['sat_open']
        company.sat_close=form.data['sat_close']
        company.sun_open=form.data['sun_open']
        company.sun_close=form.data['sun_close']

        try:

            db.session.commit()
            return company.to_dict()
        except Exception as e:

            db.session.rollback()
            return {'message': 'An error occurred while updating the company.'}, 500

    return {"errors": form.errors}, 400


@company_routes.route('/current')
@login_required
def get_user_companies():

    userId = current_user.id

    companies = Company.query.filter(Company.owner_id == userId)


    if companies is None:
        return {'message': 'Company couldn\'t be found' }, 404

    company_data = []
    for company in companies:
        #calculate avg stars
        avg_stars = Review.query.filter_by(company_id=company.id).with_entities(func.avg(Review.stars)).scalar()
        #and num reviews
        num_reviews = Review.query.filter_by(company_id=company.id).count()
        #and an image
        image = Image.query.filter_by(imageable_id=company.id, imageable_type='company').first()
        categories = Category.query.filter(Category.id == company.category_id)
        category_dict = { category.id: {
            'id': category.id,
            'name': category.name
            } for category in categories }
        category_data = category_dict.get(company.category_id)

        company_dict = company.to_dict()
        company_dict['avg_stars'] = avg_stars
        company_dict['num_reviews'] = num_reviews
        company_dict['image'] = image.url if image else None

        company_dict['category'] = category_data
        company_dict['set_hours'] = company.set_hours
        company_dict['hours'] = {
            'mon_open': company.mon_open,
            'mon_close': company.mon_close,
            'tues_open': company.tues_open,
            'tues_close': company.tues_close,
            'wed_open': company.wed_open,
            'wed_close': company.wed_close,
            'thu_open': company.thu_open,
            'thu_close': company.thu_close,
            'fri_open': company.fri_open,
            'fri_close': company.fri_close,
            'sat_open': company.sat_open,
            'sat_close': company.sat_close,
            'sun_open': company.sun_open,
            'sun_close': company.sun_close,
        }

        company_data.append(company_dict)

    return { 'companies': company_data }


@company_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_company(id):

    company = Company.query.get(id)

    if company is None:
        return {'message': 'Company couldn\'t be found' }, 404

    if company.owner_id != current_user.id:
        return {'messsage': 'YOU DONT OWN THIS COMPANY!'}, 401


    try:
        db.session.delete(company)
        db.session.commit()
        return { 'message' : 'Successfully Deleted' }, 200
    except Exception as e:
        db.session.rollback()
        return {'message': 'An error occurred while deleting the company.'}, 500


@company_routes.route('')
def get_companies():

    companies = Company.query.all()
    company_data = []

    for company in companies:
    #calculate avg stars
        avg_stars = Review.query.filter_by(company_id=company.id).with_entities(func.avg(Review.stars)).scalar()
    #and num reviews
        num_reviews = Review.query.filter_by(company_id=company.id).count()
    #and bring over review text too
        recent_review = Review.query.filter_by(company_id=company.id).order_by(desc(Review.id)).first()
        recent_review_text = recent_review.review if recent_review else None
    #and image

        images = Image.query.filter_by(imageable_id=company.id, imageable_type='company').all()
        image_urls = [image.url for image in images]

        categories = Category.query.filter(Category.id == company.category_id)
        category_dict = { category.id: {
            'id': category.id,
            'name': category.name
            } for category in categories }
        category_data = category_dict.get(company.category_id)


        company_dict = company.to_dict()
        company_dict['avg_stars'] = avg_stars
        company_dict['num_reviews'] = num_reviews
        company_dict['recent_review_text'] = recent_review_text
        company_dict['images'] = image_urls
        company_dict['category'] = category_data

        company_data.append(company_dict)

    return { 'companies': company_data }
