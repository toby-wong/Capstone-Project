from cgi import print_arguments
from ipaddress import collapse_addresses
import pymongo
import sys
from pprint import pprint
from pymongo import MongoClient


def initDB():
    client = MongoClient('localhost', 27017)
    db = client.parkIT
    return db

def emailExists(db, email):
    user = db.users.find_one({"email": email})
    if user is None:
        return False
    else:
        return True

def newUser(db, email, firstName, lastName, password, phoneNumber, username):
    user = db.users.find_one({"email": email})
    if user is None:
        db.users.insert_one({
            "email": email, 
            "firstName": firstName,
            "lastName": lastName,
            "password": password,
            "phoneNumber": phoneNumber,
            "username": username
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

