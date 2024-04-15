const { addListing, removeListing, editListing, removeFile } = require('./adminModel.js');
const db = require("../db_connection.js").db_connection;

afterAll(async () => {
    await db.end(); // Close the database connection pool
});

test('Add product listing', (done) => {
    addListing("admin", {title: "Hi", description: "Bruh", price: 13.99, quantity: 5, password: "password"}, null, (results) => {
        //{ message: "Product listing added successfully", success: true, dbResult: result }
        expect(results.success).toBeTruthy();
        done(); 
    })
});


//FAILS: Times out instead of having a valid error message

test('Fail to add product listing: Invalid Fields', (done) => {
    addListing("admin", {title: "Hi", description: "Bruh", price: "13.99", quantity: 5, password: "password"}, null, (results) => {
        //{ message: "One or more of your entries is invalid.", success: false, dbResult: err2 }
        expect(results.success).toBeFalsy();
        expect(results.messsage).toEqual("One or more of your entries is invalid.");
        done(); 
    })
});

test('Fail to add product listing: Invalid Login', (done) => {
    addListing("admin", {title: "Hi", description: "Bruh", price: 13.99, quantity: 5, password: "wrong pass"}, null, (results) => {
        expect(results.success).toBeFalsy();
        done(); 
    })
});

test('Edit Listing', (done) => {
    editListing("admin", {
        id: 1, 
        title: 'Sample Product 1', 
        description: "Bruh", //'This is the description of Sample Product 1.',
        price: '4.99', 
        quantity: 10, 
        password: "password"
    }, null, (results) => {
        expect(results.success).toBeTruthy();
        done(); 
    })
});

test('Edit Listing Again', (done) => {
    editListing("admin", {
        id: 1, 
        title: 'Sample Product 1', 
        description: 'This is the description of Sample Product 1.',
        price: '4.99', 
        quantity: 10, 
        password: "password"
    }, null, (results) => {
        expect(results.success).toBeTruthy();
        done(); 
    })
});

test('Fail Edit Listing: Invalid ID', (done) => {
    editListing("admin", {
        id: -79, 
        title: 'Sample Product 1', 
        description: "Bruh",
        price: '4.99', 
        quantity: 10, 
        password: "password"
    }, null, (results) => {
        expect(results.success).toBeFalsy();
        expect(results.message).toEqual('There is no product with the given product ID.');
        done(); 
    })
});

test('Fail Edit Listing: Invalid Login', (done) => {
    editListing("admin", {
        id: 1, 
        title: 'Sample Product 1', 
        description: 'This is the description of Sample Product 1.',
        price: '4.99', 
        quantity: 10, 
        password: "wrong pass"
    }, null, (results) => {
        expect(results.success).toBeFalsy();
        done(); 
    })
});

// Remove Listing will be acceptance test