const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'product',
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
     
    },
    { timestamps: true }
  );



  const Review = mongoose.model('Review', reviewSchema);
  
  module.exports = Review;