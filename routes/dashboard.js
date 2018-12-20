const express = require('express');
      router = express.Router();
      auth = require('../auth/auth');
      Menu = require('../models/menu');
const formidable = require('formidable');
const path = require('path');


router.route('/')
      .get(auth.checkToken,Menu.displayMenus) //just to check if token is working

router.post('/', (req, res, next) => {
    const uploadPath = path.resolve(__dirname, '../public/images');

    const form = new formidable.IncomingForm();
    form.uploadDir = uploadPath;
    form.keepExtensions = true;
    form.multiples = false;

    form.parse(req, (err, fields, files) =>{
        let basename = path.basename(files.img.path);
        let imgPath = `/images/${basename}`;

        let menuItem = new Menu({
            name: fields.name,
            description: fields.description,
            category: fields.category,
            price: fields.price,
            img: imgPath,
        });
        menuItem.save((err, result) => {
            if(err){
                console.log('Oh no! Error while saving', err);
                return next(err);
            }
            console.log(result);
            res.status(200).json("Menu item saved")
        })

    })
})


module.exports = router;