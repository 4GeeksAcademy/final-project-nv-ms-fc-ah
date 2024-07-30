"""empty message

Revision ID: ae4381e803fe
Revises: f52d7eee7918
Create Date: 2024-07-27 23:13:04.292231

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ae4381e803fe'
down_revision = 'f52d7eee7918'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Path', schema=None) as batch_op:
        batch_op.add_column(sa.Column('difficulty', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('lat', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('lng', sa.Integer(), nullable=False))
        batch_op.drop_constraint('Path_description_key', type_='unique')
        batch_op.create_unique_constraint(None, ['difficulty'])
        batch_op.drop_column('description')

    with op.batch_alter_table('User', schema=None) as batch_op:
        batch_op.drop_constraint('User_path_id_fkey', type_='foreignkey')
        batch_op.drop_column('path_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('User', schema=None) as batch_op:
        batch_op.add_column(sa.Column('path_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('User_path_id_fkey', 'Path', ['path_id'], ['id'])

    with op.batch_alter_table('Path', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_unique_constraint('Path_description_key', ['description'])
        batch_op.drop_column('lng')
        batch_op.drop_column('lat')
        batch_op.drop_column('difficulty')

    # ### end Alembic commands ###