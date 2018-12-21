const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const AdminModel = mongoose.model("Admin", adminSchema);

const createAdmin = (newAdmin, callback) => {
  bcrypt.hash(newAdmin.password, null, null, (err, hash) => {
    if (err) {
      callback(err, null);
    }
    newAdmin.password = hash;
    newAdmin.save(callback);
  });
};

const comparePassword = (userPassword, hash, callback) => {
  bcrypt.compare(userPassword, hash, (err, isMatch) => {
    if (err) {
      callback(err);
    }
    callback(null, isMatch);
  });
};

const checkIfAdminExists = (adminName, callback) => {
  AdminModel.find({ name: adminName }, callback);
};

module.exports = {
  AdminModel,
  checkIfAdminExists,
  comparePassword,
  createAdmin
};
