const assert = require("assert");
const newDish = require("../models/menu").MenuModels; // models yet

// Describe our tests
describe("Saving records", function() {
  // Create tests
  it("Saves a record to the database", function(done) {
    const dish = new newDish({
      name: "shrimp",
      description: "fresh and well seasoned shrimp",
      category: "sea-food",
      price: 10
    });

    dish.save().then(function() {
      assert(!dish.isNew);
      done();
    });
  });
});
