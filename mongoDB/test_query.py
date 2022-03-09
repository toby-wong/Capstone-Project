from query import *
import unittest

class TestQueryDB(unittest.TestCase):
    def testInitDB(self):
        db = initDB()
        assert db is not None, "Database should exist"
    
    def testEmailExists(self):
        db = initDB()
        user = emailExists(db, "y0unggil10919@gmail.com")
        assert user is not None, "Email should exist"

    def testPhoneExists(self):
        db = initDB()
        user = emailExists(db, "y0unggil10919@gmail.com")
        assert user is not None, "Phone should exist"

    def testGetPermissions(self):
        return

class TestUpdateDB(unittest.TestCase):
    def testNewUser(self):
        db = initDB()
        testUser = {
            "email": "tobywong@gmail.com",
            "name": "Toby Wong",
            "password": "12345678",
            "phoneNumber": "0467891234",
            "username": "tobywong"
        }
        newUser(db, testUser)
        user = db.users.find_one(testUser)
        assert user is not None, "User should exist"

    def testChangePassword(self):
        db = initDB()
        testEmail = "y0unggil0919@gmail.com"
        testPassword = "password"
        assert db.users.find_one({"email": email})["password"] != testPassword, "Test password should not be the same as existing password"
        changePassword(db, testEmail, testPassword)
        assert db.users.find_one({"email": email})["password"] == testPassword, "Current password is not updated to test password"

    def testUpdateDetails(self):
        return

    def testDeleteUser(self):
        return

    def testUpdatePermissions(self):
        return