from flask import Blueprint, request, render_template, redirect
from app.models import db, Image
from app.forms import ImageForm
from flask_login import current_user, login_required
from app.utils.aws import upload_file_to_s3, get_unique_filename
import os

image_routes = Blueprint("images", __name__)


@image_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
            # return render_template("post_form.html", form=form, errors=[upload])
            return {"error": "Error uploading image no url in upload"}

        url = upload["url"]
        new_image = Image(
            uploaded_by_id=current_user.id,
            imageable_id=request.form.get("imageable_id"),
            imageable_type=request.form.get("imageable_type"),
            url=url,
        )
        db.session.add(new_image)
        db.session.commit()

        return {
            "message": "Image uploaded successfully",
            "image": {
                "id": new_image.id,
                "uploaded_by_id": new_image.uploaded_by_id,
                "imageable_id": new_image.imageable_id,
                "imageable_type": new_image.imageable_type,
                "url": new_image.url,
            },
        }
    if form.errors:
        print(form.errors)
        # return render_template("post_form.html", form=form, errors=form.errors)
        return {"error": "Form validation failed", "errors": form.errors}

    # return render_template("post_form.html", form=form, errors=None)
    return {"error": "Unexpected error"}


@image_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_image(id):
    image = Image.query.get(id)

    if image == None:
        return {"message": "Image couldn't be found"}, 404

    if image.uploaded_by_id != current_user.id:
        return {"message": "Unauthorized"}, 401

    try:
        db.session.delete(image)
        db.session.commit()
        return {"message": "Successfully deleted"}, 200
    except Exception as e:
        db.session.rollback()
        return {"message": "An error occurred while deleting the image"}, 500
