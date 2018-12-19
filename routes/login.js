var express = require('express'),
    router = express.Router(),
    admin = require('../models/admin')
    auth = require('../auth/auth')


router.route('/')
      .post(auth.checkAdmin,auth.login)

 module.exports = router;