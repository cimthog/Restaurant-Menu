const express = require('express');
const router = express.Router();

const Admin = require('../models/admin')

router.post('/', (req, res, next) => {
    Admin.checkIfAdminExists({name: req.body.name}, function(err, user) {
        if(user) {
            res.send('error', 'The username is already taken.');
           
        } else {
            admin = new Admin ({
                name: req.body.name,
                password: req.body.password,
            })
            Admin.createAdmin(admin, function(err, result) {
                if (err) {
                    return next(err)
                };
                console.log(result);
                res.status(200).json('You are registered!');
               
            })
        }
    })
})

module.exports = router;