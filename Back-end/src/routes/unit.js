var express = require('express');
var router = express.Router();

const unitController = require('../app/controllers/UnitController');


// odersController.create;
router.post('/addUnit', unitController.createUnit)
router.get('/getAllUnit', unitController.getAllUnit)
module.exports = router;