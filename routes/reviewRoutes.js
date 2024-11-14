const express = require('express');
const { addReview, getReviews } = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, addReview);
router.get('/:productId', getReviews);

module.exports = router;
