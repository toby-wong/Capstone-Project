from cgi import print_arguments
from ipaddress import collapse_addresses
import pymongo
import sys
from pprint import pprint
from pymongo import MongoClient

# Initialise MongoDB instance
def initDB():
    client = pymongo.MongoClient("mongodb+srv://admin:admin@parkit.wnpku.mongodb.net/parkIT?retryWrites=true&w=majority")
    db = client.parkIT
    return db

# Check if email exists in database
def emailExists(db, email):
    user = db.users.find_one({"email": email})
    if user is None:
        return False
    else:
        return True

# Create new user in database 
def newUser(db, user):
    if not emailExists(db, user["email"]):
        db.users.insert_one({
            "email": user["email"], 
            "firstName": user["firstName"],
            "lastName": user["lastName"],
            "password": user["password"],
            "phoneNumber": user["phoneNumber"],
            "username": user["username"]
        })
        return True
    else:
        return False

if __name__ == "__main__":
    db = initDB()
    if db is None:
        print("Error: Database not found")
        sys.exit(1)
    else:
        print('db initialized')
    
    collection = db.users
    pprint(collection)
    pprint(collection.find_one())
    pprint(collection.find_one({"email": "y0unggil0919@gmail.com"}))
    pprint(collection.find_one({"email": "toby@wong.com.au"}))

