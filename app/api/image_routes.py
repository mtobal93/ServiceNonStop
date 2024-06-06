from flask import Blueprint, Request, render_template, redirect
from app.models import db, Image
from app.forms import ImageForm
from flask_login import current_user, login_required

# NEED AWS
import os

image_routes = Blueprint("images", __name__)

