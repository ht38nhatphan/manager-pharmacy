var express = require('express');

var router = express.Router();
const middlwareController = require('../app/controllers/MiddlewareController');
const orderController = require('../app/controllers/OrderController');


// odersController.create;
router.get('/getAllOrder', orderController.getAllOrder)
// router.get('/income', oderController.getMonthlyIncome)
router.post('/addorder', middlwareController.verifyTokenJustAdminAuth, orderController.createOrder)
router.put('/:id', middlwareController.verifyToken, orderController.updateOrder)
router.delete('/:id/force', middlwareController.verifyToken, orderController.forceDestroyOrder)
router.get('/find/:userId', middlwareController.verifyToken, orderController.getOrderByUserId)

module.exports = router;