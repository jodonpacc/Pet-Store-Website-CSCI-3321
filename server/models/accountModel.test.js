const { authenticateUser, getUserInfo, login, logout, createAccount } = require('./accountModel.js');
const db = require("../db_connection.js").db_connection;

afterAll(async () => {
    await db.end(); // Close the database connection pool
});

test('Grant authentication to User', (done) => {
    authenticateUser("user2", "password", (err, success, statusMessage, isAdmin) => {
        if (err) {
            throw err;
        } else {
            expect(success).toBeTruthy(); // Check if the success is true
            expect(isAdmin).toBeFalsy(); // Check if isAdmin is false for regular user
            done(); // Indicate that the test is complete
        }
    })
});

test('Grant authentication to Admin', (done) => {
    authenticateUser("admin", "password", (err, success, statusMessage, isAdmin) => {
        if (err) {
            throw err;
        } else {
            expect(success).toBeTruthy(); 
            expect(isAdmin).toBeTruthy(); 
            done(); 
        }
    })
});

test('Deny authentication', (done) => {
    authenticateUser("user69", "HEHEHA", (err, success, statusMessage, isAdmin) => {
        if (err) {
            throw err;
        } else {
            expect(success).toBeFalsy(); 
            expect(isAdmin).toBeFalsy(); 
            done();
        }
    })
});

test('Fail to create duplicate account', (done) => {
    createAccount("user2", "NewPass", (msg) => {
        expect(msg).toEqual("There is already an account associated with this username.")
        done();
    })
});

// Other tests that use sessions or create an account will need to be acceptance.