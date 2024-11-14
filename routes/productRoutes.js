const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.post('/', authenticate, createProduct);

module.exports = router;
