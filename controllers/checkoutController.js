const cartService = require('../services/cartService');
const Order = require('../models/Order');
const Address = require('../models/Address');
const emailService = require('../services/emailService');

exports.getCheckout = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.render('checkout', { cart });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.postCheckout = async (req, res) => {
  try {
    const { street, city, state, zipCode, country } = req.body;

    const address = new Address({
      user: req.user.id,
      street,
      city,
      state,
      zipCode,
      country
    });
    await address.save();

    // Get the cart
    const cart = await cartService.getCart(req.user.id);
    if (!cart || cart.productIds.length === 0) {
      return res.redirect('/cart'); // Redirect if the cart is empty
    }

    // Create a new order
    const order = new Order({
      user: req.user.id,
      products: cart.productIds.map((productId, index) => ({
        product: productId,
        quantity: cart.quantities[index]
      })),
      totalPrice: cart.totalPrice,
      address: address._id, // Reference to the address created earlier
      status: 'Completed'
    });
    await order.save();

    // Clear the user's cart
    await cartService.clearCart(req.user.id);

    // Send email confirmation
    await emailService.sendOrderConfirmation(req.user.email, {
      user: req.user,
      items: order.products,
      totalPrice: order.totalPrice,
      shippingAddress: `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`
    });

    res.redirect('/order-confirmation');
  } catch (error) {
    console.error(error); 
    res.status(500).send('Server Error');
  }
};
