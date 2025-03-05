const Review = require("../models/review.model.js");
const productService = require("../services/product.service.js");

async function createReview(reqData, user) {
  const product = await productService.findProductById(reqData.productId);

  if (!product) {
    throw new Error(`Product not found with id ${reqData.productId}`);
  }
  
  const review = new Review({
    user: user._id,
    product: product._id,
    review: reqData.review,
    rating: reqData.rating || 5,
    createdAt: new Date(),
  });
  
  return await review.save();
}

async function getAllReview(productId) {
  try {
    const product = await productService.findProductById(productId);

    if (!product) {
      throw new Error(`Product not found with id ${productId}`);
    }
    
    const reviews = await Review.find({ product: productId })
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 });

    // Calculate average rating
    const ratings = reviews.map(review => review.rating || 5);
    const averageRating = ratings.length > 0 
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
      : 0;

    return {
      reviews,
      ratings,
      averageRating,
      totalReviews: reviews.length
    };
  } catch (error) {
    throw new Error(`Failed to get reviews: ${error.message}`);
  }
}

module.exports = {
  createReview,
  getAllReview,
};
