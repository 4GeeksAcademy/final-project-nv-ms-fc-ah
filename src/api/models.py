from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__= "User"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    img = db.Column(db.String(120), nullable=True, default='https://avatar.iran.liara.run/public/49')

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "img": self.img
        }

class GroupMember(db.Model):
    __tablename__= "Group Member"
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('Group.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "group_id": self.group_id,
            "user_id": self.user_id,
            "role": self.role
        }

class Group(db.Model):
    __tablename__= "Group"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    path_id = db.Column(db.Integer, db.ForeignKey('Path.id'), nullable=False)

    def serialize(self):
        return {
            "id":"self.id",
            "name": self.name,
            "path_id": self.path_id,
        }

class Path(db.Model):   
    __tablename__= "Path"
    id = db.Column(db.Integer, primary_key=True)
    title_name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(120), unique=True, nullable=False)
    direction = db.Column(db.String(120), nullable=False)
    img = db.Column(db.String(120), nullable=True, default='default.jpg')

    def serialize(self):
        return {
            "id": self.id,
            "title_name": self.Title_name,
            "description": self.description,
            "direction": self.direction,
            "img": self.img
        }

class Favorite_paths(db.Model):
     __tablename__= "Favorite Path"
     id = db.Column(db.Integer, primary_key=True)
     user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
     path_id = db.Column(db.Integer, db.ForeignKey('Path.id'), nullable=False)

     def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "path_id": self.path_id
        }