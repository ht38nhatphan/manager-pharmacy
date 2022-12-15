var express = require('express');

var router = express.Router();
const middlwareController = require('../app/controllers/MiddlewareController');
const cartController = require('../app/controllers/CartController');



  // CartsController.create;

router.get('/getAll', cartController.getAllCart)
router.post('/store',  middlwareController.verifyToken, cartController.createCart)
router.put('/:id', middlwareController.verifyToken, cartController.updateCart)
router.delete('/:id/force',middlwareController.verifyToken, cartController.forceDestroyCart)
router.get('/find/:userId',middlwareController.verifyToken, cartController.getCartByUserId)

module.exports = router;