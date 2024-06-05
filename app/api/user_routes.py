from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Company, Review, Image

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    user_dict = user.to_dict()

    user_image = Image.query.filter(Image.imageable_type == "user" and Image.imageable_id == id).first()
    user_profile_pic = {
        "id": user_image.id,
        "image_url": user_image.url
    }
    review_counts = Review.query.filter(Review.user_id == id).count()
    image_counts = Image.query.filter(Image.uploaded_by == id).filter(Image.imageable_type == 'user').count()


    user_dict["user_profile_pic"] = user_profile_pic
    user_dict['review_counts'] = review_counts
    user_dict["image_counts"] = image_counts

    return user_dict)
