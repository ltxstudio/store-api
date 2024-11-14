const Review = require('../models/Review');
const Product = require('../models/Product');

exports.addReview = async (req, res, next) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    const newReview = new Review({ productId, userId, rating, comment });
    await newReview.save();

    const product = await Product.findById(productId);
    product.reviews.push(newReview._id);

    const totalReviews = product.reviews.length;
    const averageRating =
      (product.averageRating * (totalReviews - 1) + rating) / totalReviews;

    product.averageRating = averageRating;
    product.totalReviews = totalReviews;

    await product.save();

    res.json({ success: true, review: newReview });
  } catch (err) {
    next(err);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};
