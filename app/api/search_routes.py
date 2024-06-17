from flask import Blueprint, jsonify, request
from app.models import Company, Review, Image, Category
from sqlalchemy import func, desc, or_, and_
from flask_sqlalchemy import Pagination

search_route = Blueprint("search", __name__)


def generate_substrings(search_term, min_length=5):
    """Generate substrings with a minimum length for more flexible matching."""
    substrings = {search_term}
    for i in range(min_length, len(search_term)):
        substrings.add(search_term[:i])
    return substrings


def map_rating_condition(query, rating):

    if rating == 5:
        query = query.having(func.avg(Review.stars) >= 4.5)
    elif rating == 4:
        query = query.having(func.avg(Review.stars) >= 4)
    elif rating == 3:
        query = query.having(func.avg(Review.stars) >= 3)
    elif rating == 2:
        query = query.having(func.avg(Review.stars) >= 2)
    elif rating == 1:
        query = query.having(func.avg(Review.stars) >= 1)
    return query



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
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)

    # base query to fetch companies
    query = Company.query

    # apply filters to the query
    if rating:
        query = query.join(Review).group_by(Company.id)
        query = map_rating_condition(query, int(rating))

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

    construction_category_id = 1
    electrician_category_id = 2
    landscaper_category_id = 3
    masonry_category_id = 4
    painter_category_id = 5
    plumber_category_id = 6

    if (
        search_query
        and search_query.lower() == "building"
        or search_query
        and search_query.lower() == "pipe"
        or search_query
        and search_query.lower() == "sink"
    ):
        query = query.filter(Company.category_id == plumber_category_id)
    elif search_query and search_query.lower() == "construction":
        query = query.filter(Company.category_id == construction_category_id)
    elif (
        search_query
        and search_query.lower() == "vets"
        or search_query
        and search_query.lower() == "doctor"
    ):
        query = query.filter(Company.category_id == electrician_category_id)
    elif search_query and search_query.lower() == "services":
        query = query.filter(Company.category_id == landscaper_category_id)
    elif (
        search_query
        and search_query.lower() == "ground"
        or search_query
        and search_query.lower() == "cement"
    ):
        query = query.filter(Company.category_id == masonry_category_id)
    elif (
        search_query
        and search_query.lower() == "paint"
        or search_query
        and search_query.lower() == "indoor design"
    ):
        query = query.filter(Company.category_id == painter_category_id)
    elif search_query:
        search_terms = search_query.split()
        all_filters = []
        for term in search_terms:
            substrings = generate_substrings(term)
            term_filters = [
                Company.name.ilike(f"%{substring}%")
                | Company.category.has(Category.name.ilike(f"%{substring}%"))
                | Company.reviews.any(Review.review.ilike(f"%{substring}%"))
                | Company.description.ilike(f"%{substring}%")
                for substring in substrings
            ]
            all_filters.append(or_(*term_filters))
        query = query.filter(and_(*all_filters))

    # Apply pagination to the query
    try:
        # Apply pagination to the query
        paginated_query = query.paginate(page=page, per_page=per_page, error_out=False)
    except Exception as e:
        return {"errors": {"message": str(e)}}, 500

    companies = paginated_query.items

    company_data = []
    for company in companies:
        # pull all reviews for biz
        reviews = Review.query.filter_by(company_id=company.id).all()
        num_reviews = len(reviews)
        total_stars = sum(review.stars for review in reviews)

        # Calculate average stars and map to the desired rating
        avg_stars = total_stars / num_reviews if num_reviews > 0 else None
        mapped_rating = avg_stars
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
        company_dict["avg_stars"] = mapped_rating
        company_dict["num_reviews"] = num_reviews
        company_dict["recent_review_text"] = recent_review_text
        company_dict["images"] = image_urls
        company_dict["category"] = category_data

        company_data.append(company_dict)
    return jsonify(
        {
            "companies": company_data,
            "total": paginated_query.total,
            "pages": paginated_query.pages,
            "current_page": paginated_query.page,
            "next_page": paginated_query.next_num,
            "prev_page": paginated_query.prev_num,
            "per_page": paginated_query.per_page,
        }
    )
