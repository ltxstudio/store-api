const express = require('express');
const { checkout, getOrderHistory } = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/checkout', authenticate, checkout);
router.get('/history', authenticate, getOrderHistory);

module.exports = router;
