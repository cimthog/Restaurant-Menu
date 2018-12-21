const assert = require("assert");
const expect = require("chai").expect;
const newDish = require("../models/menu").MenuModels; // models yet

// Describe our tests
describe("Finding records", function() {
  var char;
  // Add a character to the db before each tests
  beforeEach(done => {
    const dish = new newDish({
      name: "shrimp",
      description: "fresh and well seasoned shrimp",
      category: "sea-food",
      price: 10
    });

    const dishTwo = new newDish({
      name: "Lobster",
      description: "fresh and well seasoned Lobster",
      category: "sea-food",
      price: 10
    });

    dish
      .save()
      .then(function() {
        done();
      })
      .catch(done);
  });

  // Create tests
  it("Finds a record VIA category and name", done => {
    newDish
      .findOne({ name: "shrimp", category: "sea-food" })
      .then(function(result) {
        assert(result.name === "shrimp");
        done();
      })
      .catch(done);
  });

  it("Finds records by category", done => {
    newDish
      .findOne({ category: "sea-food" })
      .then(function(result) {
        expect(resposne).to.be.a("array");
        done();
      })
      .catch(done);
  });
});
