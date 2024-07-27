"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Group, GroupMember, Path, Favorite_paths
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash # Asegúrate de importar esta función
from cloudinary.uploader import upload  #cloudinary
from datetime import timedelta
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

    expires = timedelta(days=3)
    access_token = create_access_token(identity=user.id, expires_delta=expires)
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



@api.route('/groups', methods=['GET'])
def get_groups():
    groups = Group.query.all()
    return jsonify([groups.serialize() for groups in groups]), 200


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
#ruta para subir imagenes
@api.route('/upload', methods=['PUT'])
@jwt_required()
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400  
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    try:
        # Subir la imagen a Cloudinary
        upload_result = cloudinary.uploader.upload(file)
        return jsonify({"url": upload_result['secure_url']}), 200
    except Exception as e:
        return jsonify({"error": "Error uploading image", "details": str(e)}), 500
@api.route('/image/<string:image_id>', methods=['GET'])
def get_image(image_id):
    # Construir la URL de la imagen usando el ID
    cloud_name = 'dfle6uz4i'  # lo tome de la pagina
    image_url = f'https://res.cloudinary.com/{dfle6uz4i}/image/upload/{image_id}'
    image_url = f'https://res.cloudinary.com/dfle6uz4i/image/upload/{image_id}'
    # Devolver la URL de la imagen en la respuesta
    return jsonify({"url": image_url}), 200
@api.route('/update_profile', methods=['POST'])
def update_profile():
    try:
        request_data = request.get_json()
        name = request_data['name']
        surname = request_data['surname']
        email = request_data['email']
        imageUrl = request_data['imageUrl']
        backgroundUrl = request_data['backgroundUrl']
        # Aquí actualizas el perfil del usuario en la base de datos
        user = User.query.filter_by(email=email).first()
        if user:
            user.name = name
            user.surname = surname
            user.image_url = imageUrl
            user.background_url = backgroundUrl
            db.session.commit()
            return jsonify({"msg": "Perfil actualizado exitosamente"}), 200
        else:
            return jsonify({"error": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500