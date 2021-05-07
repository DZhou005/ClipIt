from flask import Blueprint, request
from app.models import db, Clip
from flask_login import current_user, login_required

allClips_routes = Blueprint('allClips', __name__)

@allClips_routes.route('/')
@login_required
def main_page():
  clips = Clip.query.all()

  return {
    "clipDict": [clip.to_dict() for clip in clips]
  }
