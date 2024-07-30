"""empty message

Revision ID: 55a7d57f0b53
Revises: 93c2fa0cf835
Create Date: 2024-07-29 23:17:03.129134

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '55a7d57f0b53'
down_revision = '93c2fa0cf835'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Path', schema=None) as batch_op:
        batch_op.alter_column('img',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Path', schema=None) as batch_op:
        batch_op.alter_column('img',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)

    # ### end Alembic commands ###
