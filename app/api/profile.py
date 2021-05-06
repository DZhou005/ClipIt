from flask import Blueprint, request
from app.models import db, Clip, User
from flask_login import current_user, login_required

profile_routes = Blueprint('profiles', __name__)

@profile_routes.route('/<name>')
@login_required
def profile_user(name):
  user = User.query.filter_by(username=name).first()
  
  return {
    "userDict": user.to_user_dict()
  }
