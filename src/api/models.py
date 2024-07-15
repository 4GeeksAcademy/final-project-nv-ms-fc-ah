from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__= "User"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    img = db.Column(db.String(120), nullable=True, default='default.jpg')

class GroupMember(db.Model):
    __tablename__= "Group Member"
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    role = db.Column(db.String(50), nullable=False)


class Group(db.Model):
    __tablename__= "Group"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    path_id = db.Column(db.Integer, db.ForeignKey('path.id'), nullable=False)

class Path(db.Model):   
    __tablename__= "Path"
    id = db.Column(db.Integer, primary_key=True)
    Title_name = db.Column(db.String(80), unique=True, nullable=False)
    Description = db.Column(db.String(120), unique=True, nullable=False)
    Direction = db.Column(db.String(120), nullable=False)
    img = db.Column(db.String(120), nullable=True, default='default.jpg')

class Favorite_paths(db.Model):
     __tablename__= "Favorita Path"
     id = db.Column(db.Integer, primary_key=True)
     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
     path_id = db.Column(db.Integer, db.ForeignKey('path.id'), nullable=False)
     def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }