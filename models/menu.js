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

module.exports.findAndCacheOneMenuItem = (redis, name, callback) => {
    /*Where redis is a reference to redis, name is the name of the food */
    redis.get(name, (err, response) => {
        if(err){
            console.log('An error occured when retrieving value from redis');
            callback(null)
        }else if(response) {
            callback(JSON.parse(response))
        }else{
            MenuModel.findOne({
                name,
            }, (err, data) => {
                if(err) {
                    console.log('Not found in the db');
                    callback(null)
                }else{
                    redis.set(name, JSON.stringify(data), () => {
                        callback(data)
                    })
                }
            })
        }
    })
}

module.exports.findAndCacheMultiple = (redis, query, callback) => {
    redis.lrange(category, 0, -1, (err, response) => {
        if(err){
            console.log('An error occured when retrieving value from redis');
            callback(null);
        }else if(response){
            callback(JSON.parse(response));
        }else{
            MenuModel.find({
                category,
            }, (err, data) => {
                if(err){
                    console.log('Error retrieving category from DB');
                    callback(null);
                }else{
                    let multi = redis.multi();
                    for(let i = 0; i < data.length; i++){
                        multi.rpush('Available Items', data[i]);   
                    }
                    multi.exec((err, result) => {
                        callback(result)
                    })
                }
            })
        }
    })
}