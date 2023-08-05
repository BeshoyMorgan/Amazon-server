const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth')

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/order');




router.use(auth);
router.post('/', createOrder);

router
  .route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);


router.get('/', getOrders);


module.exports = router;
  