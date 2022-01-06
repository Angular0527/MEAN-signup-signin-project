var express = require('express')
var router = express.Router();
var {insertdata,getdata,cheackdata,updatedata,deletedata} = require('../controller/registerController')

router.post('/insert',insertdata);
router.get('/get',getdata);
router.post('/cheack',cheackdata);
router.post('/update',updatedata);
router.post('/delete',deletedata);

module.exports = router; 