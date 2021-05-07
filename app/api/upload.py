from flask import Blueprint, request
from app.models import db, Clip
from flask_login import current_user, login_required
from app.AWS_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

upload_routes = Blueprint("upload", __name__)


@upload_routes.route("", methods=["POST"])
@login_required
def upload_clip():
    if "clip" not in request.files:
        return {"errors": "clip required"}, 400

    clip = request.files["clip"]
    title = request.form["title"]
    description = request.form["description"]

    if not allowed_file(clip.filename):
        return {"errors": "file type not permitted"}, 400

    clip.filename = get_unique_filename(clip.filename)

    upload = upload_file_to_s3(clip)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_clip = Clip(userId=current_user.id, clipUrl=url, title=title, description=description)
    db.session.add(new_clip)
    db.session.commit()
    return {"url": url}
