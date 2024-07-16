"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def handle_register():

    request_body = request.get_json()
    user_email = request_body.get("email", None)
    user_password = request_body.get("password", None)
    user_is_active = request_body.get("user_is_active", True)
    
    if not user_email or not user_password:
        return jsonify({"Error": "Email and password are required"}), 401

    existing_user = User.query.filter_by(email = user_email).first()
    if existing_user:
        return jsonify({"Error": "User already exists."}), 400
        
    new_user = User(
        email= user_email,
        password= user_password,
        is_active= user_is_active
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
        return ({"Error":"Invalid email or password."}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200


@api.route('/home', methods=['GET'])
@jwt_required()
def handle_private():
    get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    print(f", ID: {user.id}, Email: {user.email}")
    return jsonify({"id": user.id, "email": user.email }), 200
    