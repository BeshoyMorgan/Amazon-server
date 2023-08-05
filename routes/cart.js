const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth')

const {
  addProductToCart,
  getUserCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
} = require('../controllers/cart');




router.use(auth);
router
  .route('/')
  .post(addProductToCart)
  .get(getUserCart)
  .delete(clearCart);

  router
  .route('/:itemId')
  .put(updateCartItemQuantity)
  .delete(removeCartItem);


module.exports = router;
  