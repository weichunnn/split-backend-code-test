var express = require('express');
var router = express.Router();
var moment = require('moment')

/* 
HINT

Use moment library to manipulate datetime
https://momentjs.com/

*/

router.post('/oneSettlementPerWeek', function(req, res, next) {
    let paymentDate = moment()
    res.json({"paymentDate":paymentDate.format('DD-MM-YYYY')})
});


router.post('/twoSettlementPerWeek', function(req, res, next) {
    let paymentDate = moment()
    res.json({"paymentDate":paymentDate.format('DD-MM-YYYY')})
});

router.post('/calculateSettlementAmount', function(req, res, next) {
    let totalSum = 0 
    res.json({"totalSum": totalSum})
});

/*

Create API to CRUD function for tickets
Use NPM sqlite3 save the tickets 
https://www.npmjs.com/package/sqlite3

Write your own test case on the APIs

Dockerise the nodejs app while ensuring the app process restart itself when it crash

*/

//Custom GET API that will crash the app
router.get('/crashApp', function(req, res, next) {
    let totalSum = []
    while(true){
        let temp = {"test": 123, "data": [1,2,4,56,23,23,]}
        totalSum.push(temp)
    }
    res.json({"message":"This will not be return as app will crash"})
});


module.exports = router;
