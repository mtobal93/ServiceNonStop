from flask import Blueprint, jsonify, request
from app.models import Company, Review, Image, Category
from sqlalchemy import func, desc, or_
from urllib.parse import unquote

search_route = Blueprint("search", __name__)


@search_route.route("/")
def search():
    """
    Query for all companies with optional filters and return them
    in a list of company dictionaries
    """
    # Fetch filter params from request
    rating = request.args.get("rating")
    price_string = request.args.get("price")
    prices = price_string.split(",") if price_string else []
    city_state = request.args.get("location")
    category = request.args.get("category")
    search_query = request.args.get("search_query")

    # base query to fetch companies
    query = Company.query

    # apply filters to the query
    if rating:
        query = (
            query.join(Review)
            .group_by(Company.id)
            .having(func.avg(Review.stars) >= float(rating))
        )

    if prices:
        query = query.filter(Company.price.in_(prices))

    if city_state:
        try:
            city, state = city_state.split(", ")
            query = query.filter(Company.city == city, Company.state == state)
        except ValueError:
            query = None
            return {
                "errors": {
                    "message": "Invalid format for city_state. Please provide a string in the format 'city, state'."
                }
            }, 403

    if category:
        query = query.filter(Company.category_id == category)

    if search_query:
        query = query.filter(
            or_(
                Company.name.ilike(f"%{search_query}%"),
                Company.category.has(Category.name.ilike(f"%{search_query}%")),
                Company.reviews.any(Review.review.ilike(f"%{search_query}%")),
                Company.description.ilike(f"%{search_query}%"),
            )
        )

    companies = query.all()

    company_data = []
    for company in companies:
        # pull all reviews for biz
        reviews = Review.query.filter_by(company_id=company.id).all()
        num_reviews = Review.query.filter_by(company_id=company.id).count()
        # if reviews exists
        total_stars = 0

        if reviews:
            for review in reviews:
                total_stars += review.stars
        else:
            avg_stars = None
        if num_reviews > 0:
            avg_stars = total_stars / num_reviews

        # and num reviews
        # and bring over review text too
        recent_review = (
            Review.query.filter_by(company_id=company.id)
            .order_by(desc(Review.id))
            .first()
        )
        recent_review_text = recent_review.review if recent_review else None
        # and image

        images = Image.query.filter_by(
            imageable_id=company.id, imageable_type="company"
        ).all()
        image_urls = [image.url for image in images]

        categories = Category.query.filter(Category.id == company.category_id)
        category_dict = {
            category.id: {"id": category.id, "name": category.name}
            for category in categories
        }
        category_data = category_dict.get(company.category_id)

        company_dict = company.to_dict()
        company_dict["avg_stars"] = avg_stars
        company_dict["num_reviews"] = num_reviews
        company_dict["recent_review_text"] = recent_review_text
        company_dict["images"] = image_urls
        company_dict["category"] = category_data

        company_data.append(company_dict)
    return {"companies": company_data}
