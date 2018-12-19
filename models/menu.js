const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String
    }
})

let MenuModel = mongoose.model('Menu Items', menuSchema);

module.exports = MenuModel;

module.exports.addNewItem = (menuItem, callback) => {
    menuItem.save(callback);
}

module.exports.editMenuItem = (menuItem, callback) => {
    MenuModel.findOneAndUpdate({
        name: menuItem.name
    }, 
    menuItem,
    {
        new: true,
    }, callback)
}

module.exports.deleteMenuItem = (name, callback) => {
    MenuModel.deleteOne({
        name,
    }, callback)
}