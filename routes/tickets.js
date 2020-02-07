var express = require('express');
var router = express.Router();
var moment = require('moment')

/* 
HINT

Use moment library to maniplate datetime
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



module.exports = router;
