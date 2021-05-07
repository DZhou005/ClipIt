from .db import db
from .user import User
from sqlalchemy.sql import func

class Clip(db.Model):
  __tablename__= 'clips'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  title = db.Column(db.Text)
  description = db.Column(db.Text)
  clipUrl = db.Column(db.String, nullable=False)
  user = db.relationship('User', back_populates='clips')
  createdAt = db.Column(db.DateTime(timezone=True), nullable=False, server_default=func.now())

  def to_dict(self):
    return{
      "id": self.id,
      "user": self.user.to_dict(),
      "title": self.title,
      "clipUrl": self.clipUrl,
      "description": self.description,
      "createAt": self.createdAt
    }

  def to_simple_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "clipUrl": self.clipUrl,
      "createdAt": self.createdAt
    }
