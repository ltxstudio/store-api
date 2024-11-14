const express = require('express');
const { addToCart } = require('../controllers/cartController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', authenticate, addToCart);

module.exports = router;
