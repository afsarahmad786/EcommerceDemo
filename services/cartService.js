// services/cartService.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = async (userId, productId, quantity) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, productIds: [], quantities: [] });
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const productIndex = cart.productIds.findIndex(id => id.toString() === productId);

  if (productIndex > -1) {
    cart.quantities[productIndex] += quantity;
  } else {
    cart.productIds.push(productId);
    cart.quantities.push(quantity);
  }

  cart.totalPrice = 0;
  for (let i = 0; i < cart.productIds.length; i++) {
    const product = await Product.findById(cart.productIds[i]);
    cart.totalPrice += product.price * cart.quantities[i];
  }

  return await cart.save();
};

const getCart = async (userId) => {
  return await Cart.findOne({ user: userId }).populate('productIds');
};

const updateQuantity = async (userId, productId, quantity) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error('Cart not found');
  }

  const productIndex = cart.productIds.findIndex(id => id.toString() === productId);

  if (productIndex > -1) {
    cart.quantities[productIndex] = quantity;

    cart.totalPrice = 0;
    for (let i = 0; i < cart.productIds.length; i++) {
      const product = await Product.findById(cart.productIds[i]);
      cart.totalPrice += product.price * cart.quantities[i];
    }

    return await cart.save();
  } else {
    throw new Error('Product not in cart');
  }
};

const removeFromCart = async (userId, productId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error('Cart not found');
  }

  const productIndex = cart.productIds.findIndex(id => id.toString() === productId);

  if (productIndex > -1) {
    cart.quantities.splice(productIndex, 1);
    cart.productIds.splice(productIndex, 1);

    cart.totalPrice = 0;
    for (let i = 0; i < cart.productIds.length; i++) {
      const product = await Product.findById(cart.productIds[i]);
      cart.totalPrice += product.price * cart.quantities[i];
    }

    return await cart.save();
  } else {
    throw new Error('Product not in cart');
  }
};

const clearCart = async (userId) => {
  return await Cart.findOneAndDelete({ user: userId });
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
