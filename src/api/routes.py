"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Group, GroupMember, Path, Favorite_paths
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def handle_register():
    request_body = request.get_json()
    user_email = request_body.get("email", None)
    user_password = request_body.get("password", None)

    if not user_email or not user_password:
        return jsonify({"Error": "Email and password are required"}), 401

    existing_user = User.query.filter_by(email=user_email).first()
    if existing_user:
        return jsonify({"Error": "User already exists."}), 400

    new_user = User(
        email=user_email,
        password=user_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201


@api.route('/login', methods=['POST'])
def handle_login():
    request_body = request.get_json()
    user_email = request_body.get("email", None)
    user_password = request_body.get("password", None)

    if not user_email or not user_password:
        return jsonify({"error": "Email and password are required"}), 401

    user = User.query.filter_by(email=user_email, password=user_password).first()

    if user is None:
        return jsonify({"Error": "Invalid email or password."}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200


@api.route('/home', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email}), 200


@api.route('/groups', methods=['POST'])
@jwt_required()
def create_group():
    request_body = request.get_json()
    group_name = request_body.get("name", None)
    path_id = request_body.get("path_id", None)

    if not group_name or not path_id:
        return jsonify({"error": "Group name and path ID are required"}), 401

    new_group = Group(
        name=group_name,
        path_id=path_id
    )

    db.session.add(new_group)
    db.session.commit()

    return jsonify(new_group.serialize()), 201


@api.route('/paths', methods=['POST'])
@jwt_required()
def create_path():
    request_body = request.get_json()
    title_name = request_body.get("Title_name", None)
    description = request_body.get("Description", None)
    direction = request_body.get("Direction", None)

    if not title_name or not description or not direction:
        return jsonify({"error": "Title name, description and direction are required"}), 401

    new_path = Path(
        Title_name=title_name,
        Description=description,
        Direction=direction
    )

    db.session.add(new_path)
    db.session.commit()

    return jsonify(new_path.serialize()), 201


@api.route('/favorite_paths', methods=['POST'])
@jwt_required()
def add_favorite_path():
    request_body = request.get_json()
    user_id = request_body.get("user_id", None)
    path_id = request_body.get("path_id", None)

    if not user_id or not path_id:
        return jsonify({"error": "User ID and path ID are required"}), 401

    new_favorite_path = Favorite_paths(
        user_id=user_id,
        path_id=path_id
    )

    db.session.add(new_favorite_path)
    db.session.commit()

    return jsonify(new_favorite_path.serialize()), 201


@api.route('/group_members', methods=['POST'])
@jwt_required()
def add_group_member():
    request_body = request.get_json()
    group_id = request_body.get("group_id", None)
    user_id = request_body.get("user_id", None)
    role = request_body.get("role", None)

    if not group_id or not user_id or not role:
        return jsonify({"error": "Group ID, user ID, and role are required"}), 401

    new_group_member = GroupMember(
        group_id=group_id,
        user_id=user_id,
        role=role
    )

    db.session.add(new_group_member)
    db.session.commit()

    return jsonify(new_group_member.serialize()), 201
