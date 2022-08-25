var express = require('express'),
    router = express.Router(),
    auth = require('../auth/auth');


router.route('/')
      .post(auth.checkAdmin,auth.login)

 module.exports = router;