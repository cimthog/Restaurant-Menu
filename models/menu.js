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

module.exports.displayMenus = function(req,res,next){
    MenuModel.find()
    .then(data =>{
        res.json({
            found: data.length,
            user:data})
    })
    .catch(err =>{
        res.json({
            message: "Failed",
            Error: err.message
        })
    })
}

module.exports.addNewItem = (redis, menuItem, callback) => {
    
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

module.exports.findAndCacheMenuItem = (redis,key, query, callback) => {
    /*Where redis is a reference to redis */
    redis.get(key, (err, response) => {
        if(err){
            console.log('An error occured when retrieving value from redis');
            callback(null)
        }else if(response) {
            callback(JSON.parse(response))
        }else{
            MenuModel.findOne({
                query,
            }, (err, data) => {
                if(err) {
                    console.log('Not found in the db');
                    callback(null)
                }else{
                    redis.set(key, JSON.stringify(data), () => {
                        callback(data)
                    })
                }
            })
        }
    })
}