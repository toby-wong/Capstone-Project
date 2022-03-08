import query

def testInitDB():
    db = query.initDB()
    assert db is not None, "Database should exist"
    return db

def testEmailExists(db):
    user = query.emailExists(db, "y0unggil10919@gmail.com")
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
    query.newUser(db, testUser)
    user = db.users.find_one(testUser)
    assert user is not None, "User should exist"

    if __name__ == "__main__":
        db = testInitDB()
        testEmailExists(db)
        testNewUser(db)