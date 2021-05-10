from flask import Blueprint, request
from app.models import db, Clip, Like, Comment
from flask_login import current_user, login_required

clip_routes = Blueprint('clips', __name__)

@clip_routes.route('/<id>')
@login_required
def profile_user(id):
  clip = Clip.query.filter_by(id=id).first()

  return {
    "clipDict": clip.to_dict()
  }

@clip_routes.route('/<id>/like', methods=['POST'])
@login_required
def clip_like(id):
  like = Like(userId=current_user.id, clipId=id)
  db.session.add(like)
  db.session.commit()
  return like.to_dict()

@clip_routes.route('/like/<likeId>', methods=['DELETE'])
@login_required
def clip_unlike(likeId):
  like = Like.query.get(likeId)
  db.session.delete(like)
  db.session.commit()
  return

@clip_routes.route('/<id>/comments', methods=["POST"])
@login_required
def clip_comment(id):
  data = request.json

  clipComment = Comment(
    userId=current_user.id,
    clipId=id,
    description=data['description']
  )
  db.session.add(clipComment)
  db.session.commit()
  return clipComment.to_dict()
