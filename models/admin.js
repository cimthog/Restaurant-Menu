const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String, 
        required: true,
    }
});

let AdminModel = mongoose.model('Admin', adminSchema);
module.exports = AdminModel;

module.exports.createAdmin = (newAdmin, callback) => {
    bcrypt.hash(newAdmin.password, null, null, (err, hash) => {
        if (err) {
            callback(err, null);
        };
        newAdmin.password = hash;
        newAdmin.save(callback);
    })
}

module.exports.comparePassword = (userPassword, hash, callback) => {
    bcrypt.compare(userPassword, hash, (err, isMatch) => {
        if (err){
            callback(err);
        }
        callback(null, isMatch)
    })
}

module.exports.checkIfAdminExists = (adminName, callback) => {
    AdminModel.find({name: adminName}, callback);
}