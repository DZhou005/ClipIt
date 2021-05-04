from .db import db
from .user import User
from .clip import Clip

class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  clipId = db.Column(db.Integer, db.ForeignKey('clips.id'), nullable = False)
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)
