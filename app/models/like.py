from .db import db
from .clip import Clip

class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
  clipId = db.Column(db.Integer, db.ForeignKey('clips.id',ondelete='CASCADE'), nullable = False)
  user = db.relationship("User", back_populates="likes")
  clips = db.relationship("Clip", back_populates="likes")


  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "clipId": self.clipId
    }
