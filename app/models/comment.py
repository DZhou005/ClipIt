from .db import db
from .user import User
from .clip import Clip
from sqlalchemy.sql import func


class Comment(db.Model):
  __tablename__='comments'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  clipId = db.Column(db.Integer, db.ForeignKey('clips.id'), nullable=False)
  userName = db.Column(db.String, nullable=False)
  description = db.Column(db.Text, nullable=False)
  # createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())


  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "clipId": self.clipId,
      "description": self.description,
      "userName": self.userName,
      # "createdAt": self.createdAt
    }
