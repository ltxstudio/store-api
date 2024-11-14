const express = require('express');
const { updateProduct, deleteProduct, getAllOrders } = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const router = express.Router();

router.put('/product/:productId', authenticate, isAdmin, updateProduct);
router.delete('/product/:productId', authenticate, isAdmin, deleteProduct);
router.get('/orders', authenticate, isAdmin, getAllOrders);

module.exports = router;
