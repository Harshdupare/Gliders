from flask import Flask , request ,jsonify 
import jsons
import json
from  model  import final_result
import os
import hashlib
import datetime
from flask_cors import CORS
from flask_pymongo import MongoClient
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


app = Flask(__name__)



# Load environment variables
load_dotenv()

# Configure CORS
CORS(app, origins="*",supports_credentials=True)

# Configure Flask JWT
jwt = JWTManager(app)
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)

# Configure MongoDB
MONGO_URL = os.environ.get("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client["medbot"]
users_collection = db["users"]
login_collection = db["loginsession"]
pages_collection = db["pages"]


# Routes
@app.route("/signup", methods=["POST"])
def register():
    new_user = request.get_json()  # store the json body request
    # Hash the password
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest()
    # Check if the username or email already exists
    existing_user = users_collection.find_one({"$or":[{"username": new_user["username"]}, {"email": new_user["email"]}]})
    if not existing_user:
        users_collection.insert_one(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'Username or Email already exists'}), 409

@app.route("/login", methods=["POST"])    
def login():
    login_details = request.get_json()
    # Check if the login information is provided
    if 'email' not in login_details or 'password' not in login_details:
        return jsonify({'msg': 'Invalid login details'}), 400
    
    # Query the database based on email
    user_from_db = users_collection.find_one({'email': login_details['email']})
    
    if user_from_db:
        encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
        if encrypted_password == user_from_db['password']:
            access_token = create_access_token(identity=user_from_db['email'])

            user_from_db.update({'access_token': access_token})
            # harsh commits
            print(user_from_db)
            login_collection.insert_one(user_from_db)
            
            
            return jsonify({'access_token': access_token, 'redirect_url': '/interface'}), 200

    return jsonify({'msg': 'The email or password is incorrect'}), 401

@app.route("/", methods=["POST"])
@jwt_required
def profile():
    current_user = get_jwt_identity()
    user_from_db = users_collection.find_one({'username':current_user})
    if user_from_db:
        del user_from_db['id'], user_from_db['password']
        return jsonify({'profile' : user_from_db}), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404

@app.route('/data',methods=['POST'])
def Queryparsing():
    if request.method == 'POST':
        data = request.data.decode('utf-8')
        res = jsons.dump(final_result(data))
        print(type(res))
        return res


@app.route('/history/<object_id>', methods=['POST','PUT'])
def history(object_id):
    if request.method == 'POST':
        data = request.data.decode('utf-8')
        data_dict = json.loads(data)  # Parse JSON string into dictionary
        data_dict.update({"source_id": object_id})
        pages_collection.insert_one(data_dict)
        return "page created"
    elif request.method == 'PUT':
        page_details = request.get_json()
        page_instance = pages_collection.find_one({'source_id': object_id})
        page_instance.update({"data" : page_details['data']})
        return "page updated"


@app.route('/history', methods=['GET'])
def gethistory():
    if request.method == 'GET':
        page_instance = pages_collection.find()
        page_list = list(page_instance)
        print(page_list)
       
        if page_list:  # Check if the list is not empty
            res_att_list = []  # Create an empty list to store dictionaries
            res = jsons.dump(page_list, default=str)
            print(len(res))
            for i in res:
                res_obj = i
                res_att = {
                    'finalque': res_obj['finalque'],
                    'response': res_obj['response']
                }
                res_att_list.append(res_att)  # Append each dictionary to the list
                print("Print Statement:", res_att)
            return jsonify(res_att_list)  # Return the list of dictionaries as JSON
        else:
            return jsonify({'error': 'No history found for the specified object ID'})
        
    

if __name__ == '__main__':
    app.run(debug=False)





# res = jsons.dump(page_list,default=str)
# print(res)
# res_obj = res[0]

# res_att = {
#     'finalque': res_obj['finalque'],
#     'response': res_obj['response']
# }
# print(res_att)
# return jsonify(res_att)