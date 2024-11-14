const express = require('express');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', authenticate, addToWishlist);
router.post('/remove', authenticate, removeFromWishlist);
router.get('/:userId', authenticate, getWishlist);

module.exports = router;
