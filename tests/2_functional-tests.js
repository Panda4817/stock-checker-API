const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("Viewing one stock: GET request to /api/stock-prices/", function (done) {
        let stock = "goog"
        let checkbox = "false"
        chai
            .request(server)
            .get(`/api/stock-prices/?stock=${stock}&like=${checkbox}`)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(
                    res.body,
                    "response should be an object"
                );
                assert.property(
                    res.body,
                    "stockData",
                );
                assert.property(
                    res.body.stockData,
                    "stock",
                );
                assert.property(
                    res.body.stockData,
                    "price",
                );
                assert.property(
                    res.body.stockData,
                    "likes",
                );
                done();
            });
    });

    test("Viewing one stock and liking it: GET request to /api/stock-prices/", function (done) {
        let stock = "amzn"
        let checkbox = "true"
        chai
            .request(server)
            .get(`/api/stock-prices/?stock=${stock}&like=${checkbox}`)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(
                    res.body,
                    "response should be an object"
                );
                assert.property(
                    res.body,
                    "stockData",
                );
                assert.property(
                    res.body.stockData,
                    "stock",
                );
                assert.property(
                    res.body.stockData,
                    "price",
                );
                assert.property(
                    res.body.stockData,
                    "likes",
                );
                assert.equal(
                    res.body.stockData.likes,
                    1,
                );
                done();
            });
    });

    test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function (done) {
        let stock = "amzn"
        let checkbox = "true"
        chai
            .request(server)
            .get(`/api/stock-prices/?stock=${stock}&like=${checkbox}`)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(
                    res.body,
                    "response should be an object"
                );
                assert.property(
                    res.body,
                    "stockData",
                );
                assert.property(
                    res.body.stockData,
                    "stock",
                );
                assert.property(
                    res.body.stockData,
                    "price",
                );
                assert.property(
                    res.body.stockData,
                    "likes",
                );
                assert.equal(
                    res.body.stockData.likes,
                    1,
                );
                done();
            });
    });

    test("Viewing two stocks: GET request to /api/stock-prices/", function (done) {
        let stock1 = "amzn"
        let stock2 = "goog"
        let checkbox = "false"
        chai
            .request(server)
            .get(`/api/stock-prices/?stock=${stock1}&stock=${stock2}&like=${checkbox}`)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(
                    res.body,
                    "response should be an object"
                );
                assert.property(
                    res.body,
                    "stockData",
                );
                assert.property(
                    res.body.stockData[0],
                    "stock",
                );
                assert.property(
                    res.body.stockData[0],
                    "price",
                );
                assert.property(
                    res.body.stockData[0],
                    "rel_likes",
                );
                assert.property(
                    res.body.stockData[1],
                    "stock",
                );
                assert.property(
                    res.body.stockData[1],
                    "price",
                );
                assert.property(
                    res.body.stockData[1],
                    "rel_likes",
                );
                done();
            });
    });
    
    test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function (done) {
        let stock1 = "amzn"
        let stock2 = "goog"
        let checkbox = "true"
        chai
            .request(server)
            .get(`/api/stock-prices/?stock=${stock1}&stock=${stock2}&like=${checkbox}`)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isObject(
                    res.body,
                    "response should be an object"
                );
                assert.property(
                    res.body,
                    "stockData",
                );
                assert.property(
                    res.body.stockData[0],
                    "stock",
                );
                assert.property(
                    res.body.stockData[0],
                    "price",
                );
                assert.property(
                    res.body.stockData[0],
                    "rel_likes",
                );
                assert.property(
                    res.body.stockData[1],
                    "stock",
                );
                assert.property(
                    res.body.stockData[1],
                    "price",
                );
                assert.property(
                    res.body.stockData[1],
                    "rel_likes",
                );
                done();
            });
    });
    
});
