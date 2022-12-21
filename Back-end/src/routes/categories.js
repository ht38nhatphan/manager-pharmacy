var express = require('express');
var router = express.Router();

const categoryController = require('../app/controllers/CategoryController');


// odersController.create;
router.post('/addCategory', categoryController.createCategory)
router.get('/getAllCategory', categoryController.getAllCategory)
module.exports = router;