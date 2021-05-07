from flask import Blueprint, request
from app.models import db, Clip
from flask_login import current_user, login_required

clip_routes = Blueprint('clips', __name__)

@clip_routes.route('/<id>')
@login_required
def profile_user(id):
  clip = Clip.query.filter_by(id=id).first()

  return {
    "clipDict": clip.to_dict()
  }
