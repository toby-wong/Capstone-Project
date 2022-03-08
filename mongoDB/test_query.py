from query import *

def testInitDB():
    db = initDB()
    assert db is not None, "Database should exist"
    return db

def testEmailExists(db):
    user = emailExists(db, "y0unggil10919@gmail.com")
    assert user is not None, "User should exist"

def testNewUser(db):
    testUser = {
        "email": "y0unggil0919@gmail.com",
        "firstName": "Younggil",
        "lastName": "Tak",
        "password": "12345678",
        "phoneNumber": "0404111222",
        "username": "y0unggil0919"
    }
    newUser(db, testUser)
    user = db.users.find_one(testUser)
    assert user is not None, "User should exist"

def testChangePassword(db):
    testEmail = "y0unggil0919@gmail.com"
    testPassword = "password"
    assert db.users.find_one({"email": email})["password"] != testPassword, "Test password should not be the same as existing password"
    changePassword(db, testEmail, testPassword)
    assert db.users.find_one({"email": email})["password"] == testPassword, "Current password is not updated to test password"

# def testUpdateDetails(db):
#     return

def testDeleteUser(db):
    return

def testGetPermissions(db):
    return

def testUpdatePermissions(db):
    return


if __name__ == "__main__":
    db = testInitDB()
    testEmailExists(db)
    testNewUser(db)