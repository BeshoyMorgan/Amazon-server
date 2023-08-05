const express = require('express');
const router = express.Router({mergeParams:true});

const { auth } = require('../middlewares/auth')

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setFilterObj
} = require('../controllers/review');



router.get('/', setFilterObj, getReviews);


router.use(auth);
router.post('/', createReview);

router
  .route('/:id')
  .get(getReview)
  .put(updateReview)
  .delete(deleteReview);


module.exports = router;
  