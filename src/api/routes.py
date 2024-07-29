"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Group, GroupMember, Path, Favorite_paths
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash # Asegúrate de importar esta función
import cloudinary.uploader  #cloudinary

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def handle_register():
    request_body = request.get_json()
    user_email = request_body.get("email", None)
    user_password = request_body.get("password", None)
    user_name = request_body.get("username", None)
    if not user_email or not user_password:
        return jsonify({"Error": "Email y contraseña son campos requeridos."}), 401
    
    existing_user = User.query.filter_by(email=user_email).first()
    if existing_user:
        return jsonify({"Error": "El usuario ya existe."}), 400
    # Genera el hash de la contraseña
    hashed_password = generate_password_hash(user_password, method='pbkdf2:sha256')
    new_user = User(
        email=user_email,
        password=hashed_password, #aca se cambio para especificar que va con hash
        username = user_name
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
        return jsonify({"error": "Email y contraseña son campos requeridos."}), 401

    user = User.query.filter_by(email=user_email).first()

    if user is None or not check_password_hash(user.password, user_password):
        return jsonify({"Error": "Correo o contraseña incorrectos."}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200


#   
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    
    user = User.query.get(user_id) 


    if not user:
       return jsonify({"Mensaje": "Usuario no encontrado."}), 404
 

    return jsonify(user.serialize()), 200




@api.route('/home', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email}), 200


@api.route('/create_group', methods=['POST'])
@jwt_required()
def create_group():
    
    request_body = request.get_json()
    user_id = request_body.get("user_id", None)
    group_name = request_body.get("group_name", None)

    if not group_name:
        return jsonify({"error": "Group name is required"}), 401

    new_group = Group(
        name=group_name,
    )

    try:
        db.session.add(new_group)
        db.session.commit()
        db.session.refresh(new_group) # se agrega refresh para refrescar el objeto recien creado..
        first_member_group = GroupMember(
            user_id=user_id,
            group_id=new_group.id,
            role="admin"
        )
        db.session.add(first_member_group)
        db.session.commit()
        serialized_group = new_group.serialize() # se serializa el grupo, antes de cerrar la sesión.
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"error": str(error)}), 500
    finally:
        db.session.close()
    return jsonify(serialized_group), 201



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



@api.route('/add_group_members', methods=['POST'])
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

@api.route('/group/members', methods=['GET'])
def get_members():

    request_body = request.get_json()
    group_id = request_body.get("group_id", None)
    
    group_members = GroupMember.query.filter_by(group_id=group_id).all()
    print(group_members)



    if not group_members:
       return jsonify({"Mensaje": "Miembros no encontrados."}), 404
 

    return jsonify([member.serialize() for member in group_members]), 200

@api.route('/change_password', methods=['PUT'])
def change_password():
    try:
        data = request.get_json()
        if 'email' not in data or 'password' not in data:
            return jsonify({"msg": "Missing email or password parameter"}), 400
        email = data['email']
        new_password = data['password']
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "User not found"}), 404
        # Hashear la nueva contraseña
        user.password = generate_password_hash(new_password, method='pbkdf2:sha256')
        db.session.commit()
        # Incluir la nueva contraseña en texto plano en la respuesta
        return jsonify({"msg": "Password updated successfully", "new_password": new_password}), 200
    except Exception as e:
        # Manejar cualquier excepción inesperada
        return jsonify({"error": "Error al procesar la solicitud", "details": str(e)}), 500

@api.route('/update_profile', methods=['PUT'])
def update_profile():
    try:
        request_data = request.get_json()  # Obtiene los datos enviados en la solicitud en formato JSON
        user_id = request_data.get('user_id')  # Extrae el ID del usuario de los datos de la solicitud
        username = request_data.get('username')  # Extrae el nombre de usuario de los datos de la solicitud
        email = request_data.get('email')  # Extrae el correo electrónico de los datos de la solicitud
        image_url = request_data.get('imageUrl')  # Extrae la URL de la imagen de perfil de los datos de la solicitud
        background_url = request_data.get('backgroundUrl')  # Extrae la URL de la imagen de fondo de los datos de la solicitud

        if not user_id or not username or not email:
            return jsonify({"error": "User ID, username, and email are required."}), 400  # Verifica que user_id, username y email estén presentes, si no, devuelve un error 400

        user = User.query.get(user_id)  # Busca al usuario en la base de datos por su ID
        if not user:
            return jsonify({"error": "User not found."}), 404  # Si no se encuentra el usuario, devuelve un error 404

        # Actualiza los campos del usuario con los nuevos valores
        user.username = username
        user.email = email
        user.image_url = image_url
        user.background_url = background_url

        db.session.commit()  # Guarda los cambios en la base de datos
        return jsonify({"msg": "Profile updated successfully."}), 200  # Devuelve un mensaje de éxito con un código 200

    except Exception as e:
        return jsonify({"error": "Error processing request", "details": str(e)}), 500  # Si ocurre una excepción, devuelve un error 500 con detalles del error


   #Ruta para subir imagenes
@api.route('/upload_image', methods=['POST'])
@jwt_required()
def upload_image():

    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        upload_result = cloudinary.uploader.upload(file)
        image_url = upload_result.get('url')

        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        user.img = image_url
        db.session.commit()
        return jsonify({"message": "Image uploaded successfully", "image_url": image_url}), 200

    except Exception as e:
        return jsonify({"error": "Error uploading image", "details": str(e)}), 500 