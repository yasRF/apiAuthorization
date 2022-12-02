"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    request_data = request.get_json(force=True)
    email = request_data['email']
    password = request_data['password']
    
    new_user = User(
        email=email,
        password=password,
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()),201
   

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email = email).first()
    print(user)
    
    if user == None:
        return jsonify({"msg":"pon bien las credenciales!"}),401
       

    access_token = create_access_token(identity=user.mail)

    response_body = {
        "message": " Accendiendo a Login",
        "token": access_token
    }


    return jsonify(response_body), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def handle_private():
     # Access the identity of the current user with get_jwt_identity
    response_body ={
        "msg": "accediendo a zona privada",
        "correcto":"true",
        "user": get_jwt_identity()
    }

    return jsonify(logged_in_as=current_user), 200

   
   


if __name__ == "__main__":
    app.run()