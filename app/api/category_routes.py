from flask import Blueprint;
from app.models import db, Category

category_routes = Blueprint("categories", __name__)

@category_routes.route('')
def get_categories():
    
    categories = Category.query.all()
    category_listing = [{"id": category.id, 'name': category.name } for category in categories ]

    return {'categories': category_listing}