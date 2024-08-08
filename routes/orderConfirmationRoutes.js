const express = require('express');
const router = express.Router();
const orderConfirmationController = require('../controllers/orderConfirmationController');

router.get('/order-confirmation', orderConfirmationController.getOrderConfirmation);

module.exports = router;
