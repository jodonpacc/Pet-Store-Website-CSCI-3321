const {getProductInfo, getAllProducts} = require('./productModel.js');
const db = require("../db_connection.js").db_connection;

afterAll(async () => {
    await db.end(); // Close the database connection pool
});

test('Get all products', (done) => {
    getAllProducts((err, res) => {
        console.log(res)
        if (err) {
            throw err;
        } else {
            expect(res).toBeTruthy();
            expect(res[0].product_id).toEqual(1);
            done(); 
        }
    })
});

test('Get product by ID', (done) => {
    getProductInfo(1, (err, res) => {
        if (err) {
            throw err;
        } else {
            expect(res).toBeTruthy();
            expect(res.product_id).toEqual(1);
            expect(res.price).toEqual('4.99');
            done(); 
        }
    })
});

test('Fail get product by ID: Invalid ID', (done) => {
    getProductInfo(-69, (err, res) => {
        expect(err).toBeTruthy();
        done();
    })
});