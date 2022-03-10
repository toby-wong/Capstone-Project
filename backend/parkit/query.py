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
            "username": user["username"],
            "permissions": {
                "consumer": False,
                "provider": False,
                "admin": False
            }
        })
        return True
    else:
        return False

# Change password for user
def changePassword(db, email, newPassword):
    if emailExists(db, email):
        db.users.update_one({"email": email}, {"$set": {"password": newPassword}})
        return True
    else:
        return False

# need to update function to include verification for new email/phone
# def updateDetails(db, email, newDetails):
#     if emailExists(db, email):
#         for key in newDetails:
#             db.users.update_one({"email": email}, {"$set": {key: newDetails[key]}})
#         return True
#     else:
#         return False

# Delete user from database
def deleteUser(db, email):
    if emailExists(db, email):
        db.users.delete_one({"email": email})
        return True
    else:
        return False

# Get permissions for user
def getPermissions(db, email):
    if emailExists(db, email):
        user = db.users.find_one({"email": email})
        return user["permissions"]
    else:
        return False

# Update permissions for user
def updatePermissions(db, email, permissions):
    if emailExists(db, email):
        for key in permissions:
            db.users.update_one({"email": email}, {"$set": {"permissions"[key]: permissions[key]}})
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

