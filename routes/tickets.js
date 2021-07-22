var express = require("express");
var router = express.Router();
var moment = require("moment");

// sqlite3 import and init
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(":memory:");

/* 
HINT

Use moment library to manipulate datetime
https://momentjs.com/

*/

// Assignment 1
router.post("/oneSettlementPerWeek", function (req, res, next) {
  // use req.body to get JSON of start and end dates. We are only concerned with end dates.
  let endDate = moment(req.body["end"], "DD-MM-YYYY");
  //add changes below
  const paymentDate = moment(endDate).add(1, "weeks").isoWeekday(1);

  res.json({ paymentDate: moment(paymentDate).format("DD-MM-YYYY") });
});

router.post("/twoSettlementPerWeek", function (req, res, next) {
  let endDate = moment(req.body["end"], "DD-MM-YYYY");

  //add changes below
  var paymentDate = "";
  moment(endDate).isoWeekday() <= 3
    ? (paymentDate = moment(endDate).isoWeekday(4))
    : (paymentDate = moment(endDate).add(1, "weeks").isoWeekday(1));

  res.json({ paymentDate: moment(paymentDate).format("DD-MM-YYYY") });
});

// Assignment 2
router.post("/calculateSettlementAmount", function (req, res, next) {
  //add changes below
  var total = 0;
  req.body.forEach(
    (ticket) => (total += ticket.price * (1 - ticket.MDR / 100))
  );
  // rounded up to 2d.p
  const roundedUpSum = Math.ceil(total * 100) / 100;

  res.json({ totalSum: roundedUpSum });
});

/*

Assignment 3

Create API to CRUD function for tickets
Use NPM sqlite3 save the tickets 
https://www.npmjs.com/package/sqlite3

Ticket

{
  "ticketId":"TES2312-32",
  "price" , "203.10",
  "MDR" : "2.0",
  "currency" : "SGD",
  "travelAgentName" : "SPLIT-TEST-AGENT01"
}
Provide a solution to restart the app instance if it crashes.
*/

router.get("/", function (req, res, next) {
  db.all(
    "SELECT ticketId, price, MDR, currency, travelAgentName FROM tickets",
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json({
        tickets: rows,
      });
    }
  );
});

router.post("/", function (req, res, next) {
  const { ticketId, price, MDR, currency, travelAgentName } = req.body;
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS tickets (ticketId TEXT PRIMARY KEY, price DECIMAL, MDR DECIMAL, currency TEXT, travelAgentName TEXT )"
    ).run(
      "INSERT INTO tickets VALUES (?, ?, ?, ?, ?)",
      [ticketId, price, MDR, currency, travelAgentName],
      (err) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
        res.status(200).json({
          message: `Insert Successful for ticket with ID ${ticketId}`,
        });
      }
    );
  });
});

router.put("/:id", function (req, res, next) {
  const { id } = req.params;
  const { price } = req.body;

  db.serialize(() => {
    db.run(
      `UPDATE tickets SET price = ? WHERE ticketId = ?`,
      [price, id],
      (err) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
        res.status(200).json({
          message: `Update Successful for ticket with ID ${id}`,
        });
      }
    );
  });
});

router.delete("/:id", function (req, res, next) {
  const { id } = req.params;

  db.serialize(() => {
    db.run(`DELETE from tickets WHERE ticketId = ?`, [id], (err) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json({
        message: `Delete Successful for ticket with ID ${id}`,
      });
    });
  });
});

/*
Assignment 4
Ensure the nodejs app process restart itself when it crash

Solution: 
- For development env, nodemon is a suitable utility for monitoring changes in codes and automatically 
restarting the serve to reflect the changes 
- For staging and production env, process manager such as PM2 or Forever can keep application up and running on any instances. 
    - Easy to setup
    - Automated restart
    - Error logging
- Else, we can explore init systems such as systemd and Upstart to handle cases where server restarts

*/

//Custom GET API that will crash the app
router.get("/crashApp", function (req, res, next) {
  let totalSum = [];
  while (true) {
    let temp = { test: 123, data: [1, 2, 4, 56, 23, 23] };
    totalSum.push(temp);
  }
  res.json({ message: "This will not be return as app will crash" });
});

module.exports = router;
