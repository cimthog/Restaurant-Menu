const express = require('express');
const Menu = require('../models/menu');
const router = express.Router();

// @route   GET /search/?pice=1000
// @desc    find matching food items || find by price && find by name
// @access   public
router.get('/', (req, res, next) => {
   const {name, price} = req.query

   if (name) {
   Menu.find({ name })
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostsFound: "No post found" }));
   } else if (price) {
    Menu.find({ price })
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostsFound: "No post found" }));
   }
})


module.exports = router;