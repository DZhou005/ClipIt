"""empty message

Revision ID: 8f41b3329caf
Revises: 95dbd36880c8
Create Date: 2021-05-20 15:24:14.674375

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8f41b3329caf'
down_revision = '95dbd36880c8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('comments_clipId_fkey', 'comments', type_='foreignkey')
    op.create_foreign_key(None, 'comments', 'clips', ['clipId'], ['id'], ondelete='CASCADE')
    op.drop_constraint('likes_clipId_fkey', 'likes', type_='foreignkey')
    op.create_foreign_key(None, 'likes', 'clips', ['clipId'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'likes', type_='foreignkey')
    op.create_foreign_key('likes_clipId_fkey', 'likes', 'clips', ['clipId'], ['id'])
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.create_foreign_key('comments_clipId_fkey', 'comments', 'clips', ['clipId'], ['id'])
    # ### end Alembic commands ###