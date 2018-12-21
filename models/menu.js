const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String
  }
});

const MenuModel = mongoose.model("Menu Items", menuSchema);

const displayMenus = function(req, res, next) {
  MenuModel.find()
    .then(data => {
      res.json({
        found: data.length,
        user: data
      });
    })
    .catch(err => {
      res.json({
        message: "Failed",
        Error: err.message
      });
    });
};

const addNewItem = (menuItem, callback) => {
  menuItem.save(callback);
};

const editMenuItem = (menuItem, callback) => {
  MenuModel.findOneAndUpdate(
    {
      name: menuItem.name
    },
    menuItem,
    {
      new: true
    },
    callback
  );
};

const deleteMenuItem = (name, callback) => {
  MenuModel.deleteOne(
    {
      name
    },
    callback
  );
};

const findOneMenuItem = (redis, name, callback) => {
  /*Where redis is a reference to redis, name is the name of the food */
  redis.get(name, (err, response) => {
    if (err) {
      callback(null);
    } else if (response) {
      callback(JSON.parse(response));
    } else {
      MenuModel.findOne(
        {
          name
        },
        (err, data) => {
          if (err) {
            console.log("Not found in the db");
            callback(null);
          } else {
            redis.set(`Menu item: ${name}`, JSON.stringify(data), () => {
              callback(data);
            });
          }
        }
      );
    }
  });
};

module.exports = {
  MenuModels,
  displayMenus,
  findOneMenuItem,
  editMenuItem,
  deleteMenuItem,
  addNewItem
};
