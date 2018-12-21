const request = require("supertest");
const expect = require("chai").expect;
const app = require("../app");

const dish = {
  name: "shrimp",
  description: "fresh and well seasoned shrimp",
  category: "sea-food",
  price: 10
};

describe("RESTAURANT MENU API TEST", () => {
  it("Show Records by Category", done => {
    request(app)
      .get("/api/v1/menu/African")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a("array");
        done();
      })
      .catch(done);
  });

  it("Creates a record", done => {
    request(app)
      .post("/dashboard")
      .send(dish)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).to.be.a("object");
        done();
      })
      .catch(done);
  });
});
