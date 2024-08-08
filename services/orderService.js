const Order = require('../models/Order');

const createOrder = async (userId, cart, address) => {
  const order = new Order({
    user: userId,
    products: cart.productIds.map((productId, index) => ({
      product: productId,
      quantity: cart.quantities[index],
    })),
    totalPrice: cart.totalPrice,
    address: address,
    status: 'Pending',
  });

  return await order.save();
};

module.exports = {
  createOrder,
};
