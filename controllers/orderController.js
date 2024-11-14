const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { initiatePayment } = require('../utils/payment');

exports.checkout = async (req, res) => {
  try {
    const { userId, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

    const paymentResponse = await initiatePayment(paymentMethod, totalAmount);

    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
      paymentStatus: paymentResponse.status,
    });

    await order.save();
    await Cart.findByIdAndDelete(cart._id); // Clear cart after checkout

    res.json({ order, paymentLink: paymentResponse.payment_link });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
