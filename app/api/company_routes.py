from flask import Blueprint,request
from flask_login import login_required, current_user
from sqlalchemy import func, desc


#from app.models import Company, Review, Image, User, Category, db
from app.forms import CreateCompanyForm, CreateReviewForm