// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/cart/update', authMiddleware, cartController.updateQuantity);
router.post('/cart', authMiddleware, roleMiddleware('user'), cartController.addToCart);
router.get('/cart', authMiddleware, cartController.getCart);
router.post('/cart/remove', authMiddleware, cartController.removeFromCart);
router.post('/cart/clear', authMiddleware, cartController.clearCart);
module.exports = router;
