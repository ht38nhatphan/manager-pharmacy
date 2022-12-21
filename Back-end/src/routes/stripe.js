var express = require('express');

var router = express.Router();
const middlwareController = require('../app/controllers/MiddlewareController');
const stripeController = require('../app/controllers/Stripe');


// odersController.create;
router.post('/payment', stripeController.payment)

module.exports = router;