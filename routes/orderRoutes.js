const express = require('express');
const { checkout } = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/checkout', authenticate, checkout);

module.exports = router;
