const Review = require('../models/review');
const factory = require('../utils/crudBuilder');




exports.getReviews = factory.getAll(Review,{ path: 'user', select: 'name image' });

exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review,{ path: 'user', select: 'name image' });

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.setFilterObj = (req, res, next) => {
    if (req.params.productId){
        let filterObject = { product: req.params.productId };
        req.filterObj = filterObject;
    }
    next();
  };