from .db import db
from .user import User
from .clip import Clip

class Comment(db.Model):
  __tablename__='comments'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  clipId = db.Column(db.Integer, db.ForeignKey('clips.id'), nullable=False)
  description = db.Column(db.Text, nullable=False)
  createdAt = db.Column(db.DateTime, nullable=False)
