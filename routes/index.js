var router = require('express').Router();
const path = require('path');

router.get('/',(req,res)=>{
    res.sendFile('index.html', { root: path.join(__dirname, '../client') });
})
module.exports = router