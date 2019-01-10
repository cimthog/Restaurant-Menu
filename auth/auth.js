const   jwt = require('jsonwebtoken')
        expressjwt = require('express-jwt')
        verifyToken = expressjwt({secret:"u-lah-lah"})
        Admin = require('../models/admin');

exports.checkAdmin = function(req, res,next){
    Admin.checkIfAdminExists(req.body.name, (err, user) => {
        if(err) {
           
            return  res.status(500).json({
                failed: 'An error occured'
             });
        }
        if(!user) {
            console.log(err)
            return res.status(401).json({
                failed: 'No user found'
             });
        }
        
        Admin.comparePassword(req.body.password, user[0].password, function(err, isMatch) {
            if (err) {
                return res.status(401).json({
                    failed: 'Invalid Password'
                 });
                //throw err;
            }
            if(isMatch) {
                next();
            } else {
                return res.status(500).json({
                    failed: 'Incorrect Name or password'
                 });
            }
        })
        
    }); 
}
function userToken (name){
     return jwt.sign(
         {name:name},
         "u-lah-lah",
         {expiresIn: '5h'}       
     )
}

exports.login = function(req,res){
    var token = userToken(req.body.name)
    console.log(token)
    res.status(200).json({token:token})
}

exports.checkToken = function(req,res,next){
    verifyToken(req,res,function(err, response){
        if (err || !req.user.name) return res.sendStatus(401);
        next();
    })
  
}