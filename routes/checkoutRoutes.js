const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const checkoutController = require('../controllers/checkoutController');

router.get('/checkout', authMiddleware, checkoutController.getCheckout);
router.post('/checkout', authMiddleware, checkoutController.postCheckout);

module.exports = router;
