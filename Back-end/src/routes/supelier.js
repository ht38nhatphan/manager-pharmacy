var express = require('express');
var router = express.Router();

const supelierController = require('../app/controllers/SupelierController');


// odersController.create;
router.post('/addSupelier', supelierController.createSupelier)
router.get('/getAllSupelier', supelierController.getAllSupelier)
module.exports = router;