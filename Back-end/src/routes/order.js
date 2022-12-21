var express = require('express');

var router = express.Router();
const middlwareController = require('../app/controllers/MiddlewareController');
const orderController = require('../app/controllers/OrderController');


// odersController.create;
router.get('/getAllOrder', orderController.getAllOrder)
// router.get('/income', oderController.getMonthlyIncome)
router.post('/addorder', orderController.createOrder)
router.put('/:id', orderController.updateOrder)
router.delete('/:id/force', orderController.forceDestroyOrder)
router.get('/find/:userId', orderController.getOrderByUserId)

module.exports = router;