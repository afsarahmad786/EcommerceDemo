const cartService = require('../services/cartService');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    await cartService.addToCart(req.user.id, productId, parseInt(quantity, 10));
    res.redirect('/cart');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    await cartService.updateQuantity(req.user.id, productId, parseInt(quantity, 10));
    res.redirect('/cart');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    await cartService.removeFromCart(req.user.id, productId);
    res.redirect('/cart');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.clearCart = async (req, res) => {
  try {
    await cartService.clearCart(req.user.id);
    res.redirect('/cart');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
