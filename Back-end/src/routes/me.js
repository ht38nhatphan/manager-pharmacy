var express = require('express');

var router = express.Router();

const meController = require('../app/controllers/MeController');

 // newsController.index;

 router.get('/stored/thuocs', meController.storedThuocs)
 router.get('/trash/thuocs', meController.trashThuocs)



module.exports = router;