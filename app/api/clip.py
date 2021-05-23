from flask import Blueprint, request
from app.models import db, Clip, Like, Comment
from flask_login import current_user, login_required

clip_routes = Blueprint('clips', __name__)

@clip_routes.route('/<id>')
@login_required
def profile_user(id):
  clip = Clip.query.filter_by(id=id).first()
  comments = Comment.query.filter_by(clipId=id).all()

  return {
    "clipDict": clip.to_dict() if clip else {},
    "commentDict": [comment.to_dict() for comment in comments]
  }

@clip_routes.route('/edit/<id>', methods=["PATCH"])
@login_required
def edit_clip(id):
  clip = Clip.query.filter_by(id=id).first()
  clip.title = request.get_json()['title']
  clip.description = request.get_json()['description']
  db.session.commit()
  return {
    "clipDict": clip.to_dict()
  }

@clip_routes.route('/editComment/<id>', methods=["PATCH"])
@login_required
def eidt_comment(id):
  comment = Comment.query.filter_by(id=id).first()
  comment.description = request.get_json()['description']
  db.session.commit()
  return comment.to_dict()


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
  return {}

@clip_routes.route('/delete/comment/<id>', methods=['DELETE'])
@login_required
def comment_delete(id):
  comment = Comment.query.filter_by(id=id).first()
  db.session.delete(comment)
  db.session.commit()
  return {}

@clip_routes.route('/<id>/comments', methods=["POST"])
@login_required
def clip_comment(id):
  data = request.json

  clipComment = Comment(
    userId=current_user.id,
    clipId=id,
    description=data['description'],
    userName=current_user.username
  )
  db.session.add(clipComment)
  db.session.commit()
  return clipComment.to_dict()

@clip_routes.route('/delete/<id>', methods=["DELETE"])
@login_required
def delete_clip(id):
  clip = Clip.query.filter_by(id=id).first()
  db.session.delete(clip)
  db.session.commit()
  return {}
