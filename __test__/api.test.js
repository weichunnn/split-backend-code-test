const request = require("supertest");
const app = require("../app");

describe("One Settlment Per Week API TEST #1 ", () => {
  it("Testcase 1: expect response paymentDate to be 10-02-2020", async () => {
    const res = await request(app)
      .post("/tickets/oneSettlementPerWeek")
      .send({ start: "03-02-2020", end: "05-02-2020" });
    expect(res.body.paymentDate).toEqual("10-02-2020");
  });
});

describe("One Settlment Per Week API TEST #2 ", () => {
  it("Testcase 2: expect response paymentDate to be 17-02-2020", async () => {
    const res = await request(app)
      .post("/tickets/oneSettlementPerWeek")
      .send({ start: "03-02-2020", end: "10-02-2020" });
    expect(res.body.paymentDate).toEqual("17-02-2020");
  });
});

describe("One Settlment Per Week API TEST #3 ", () => {
  it("Testcase 3: expect response paymentDate to be 10-02-2020", async () => {
    const res = await request(app)
      .post("/tickets/oneSettlementPerWeek")
      .send({ start: "03-02-2020", end: "06-02-2020" });
    expect(res.body.paymentDate).toEqual("10-02-2020");
  });
});

describe("One Settlment Per Week API TEST #4 ", () => {
  it("Testcase 4: expect response paymentDate to be 02-03-2020", async () => {
    const res = await request(app)
      .post("/tickets/oneSettlementPerWeek")
      .send({ start: "01-02-2020", end: "24-02-2020" });
    expect(res.body.paymentDate).toEqual("02-03-2020");
  });
});

describe("Two Settlment Per Week API TEST #1 ", () => {
  it("Testcase 5: expect response paymentDate to be 06-02-2020", async () => {
    const res = await request(app)
      .post("/tickets/twoSettlementPerWeek")
      .send({ start: "03-02-2020", end: "05-02-2020" });
    expect(res.body.paymentDate).toEqual("06-02-2020");
  });
});

describe("Two Settlment Per Week API TEST #2 ", () => {
  it("Testcase 6: expect response paymentDate to be 10-02-2020", async () => {
    const res = await request(app)
      .post("/tickets/twoSettlementPerWeek")
      .send({ start: "03-02-2020", end: "07-02-2020" });
    expect(res.body.paymentDate).toEqual("10-02-2020");
  });
});

describe("Two Settlment Per Week API TEST #3 ", () => {
  it("Testcase 7: expect response paymentDate to be 13-02-2020", async () => {
    const res = await request(app)
      .post("/tickets/twoSettlementPerWeek")
      .send({ start: "03-02-2020", end: "10-02-2020" });
    expect(res.body.paymentDate).toEqual("13-02-2020");
  });
});

describe("Two Settlment Per Week API TEST #4 ", () => {
  it("Testcase 8: expect response paymentDate to be 20-02-2020", async () => {
    const res = await request(app)
      .post("/tickets/twoSettlementPerWeek")
      .send({ start: "03-02-2020", end: "19-02-2020" });
    expect(res.body.paymentDate).toEqual("20-02-2020");
  });
});

describe("Calculate Settlment Amount TEST #1 ", () => {
  it("Testcase 9: Expect totalSum to be 521.24", async () => {
    const res = await request(app)
      .post("/tickets/calculateSettlementAmount")
      .send([
        {
          ticketId: "TE231FD3-23",
          price: 100,
          MDR: 2,
        },
        {
          ticketId: "TE2GES23-23",
          price: 200,
          MDR: 4,
        },
        {
          ticketId: "T03GD1023-23",
          price: 246,
          MDR: 6,
        },
      ]);
    expect(res.body.totalSum).toEqual(521.24);
  });
});

describe("Calculate Settlment Amount TEST #1 ", () => {
  it("Testcase 10: Expect totalSum to be 933.76", async () => {
    const res = await request(app)
      .post("/tickets/calculateSettlementAmount")
      .send([
        {
          ticketId: "TE231023-23",
          price: 100,
          MDR: 2.33,
        },
        {
          ticketId: "KE23D0S3-J3",
          price: 231,
          MDR: 5.34,
        },
        {
          ticketId: "LDL40S3-U3",
          price: 659,
          MDR: 6.31,
        },
      ]);
    expect(res.body.totalSum).toEqual(933.76);
  });
});

// CRUD API Tests
describe("Tickets CRUD API - Create Test", () => {
  it("Testcase 11: Expect Success Status", async () => {
    const res = await request(app).post("/tickets").send({
      ticketId: "TE231023-23",
      currency: "SGD",
      price: 100,
      MDR: 2.33,
      travelAgentName: "SPLIT-TEST-AGENT01",
    });
    expect(res.status).toEqual(200);
  });
});

describe("Tickets CRUD API - Read Test", () => {
  it("Testcase 12: Expect Success Status", async () => {
    const res = await request(app).get("/tickets");
    expect(res.status).toEqual(200);
    expect(res.body.tickets).toEqual([
      {
        ticketId: "TE231023-23",
        currency: "SGD",
        price: 100,
        MDR: 2.33,
        travelAgentName: "SPLIT-TEST-AGENT01",
      },
    ]);
  });
});

describe("Tickets CRUD API - Update Test", () => {
  it("Testcase 13: Expect Success Status", async () => {
    const res = await request(app).put("/tickets/TE231023-23").send({
      price: 500,
    });
    expect(res.status).toEqual(200);
  });
});

describe("Tickets CRUD API - Delete Test", () => {
  it("Testcase 14: Expect Success Status", async () => {
    const res = await request(app).delete("/tickets/TE231023-23");
    expect(res.status).toEqual(200);
  });
});
