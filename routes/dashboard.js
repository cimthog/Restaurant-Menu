const express = require('express');
      router = express.Router();
      auth = require('../auth/auth');
      Menu = require('../models/menu');


//router.route('/')
  //    .get(auth.checkToken,Menu.displayMenus) //just to check if token is working



router.post('/', (req, res, next) => {
    console.log(req.body)
    menuItem = new Menu( {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        img: req.body.img //not done!
    })
    Menu.addNewItem(menuItem, function(err, result) {
        if (err) {
            return next(err);
        };
        console.log(result);
       res.status(200).json("Menu item saved")

    })
})


module.exports = router;