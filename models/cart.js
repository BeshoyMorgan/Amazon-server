const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        cartItems: [
          {
            product: {
              type: mongoose.Schema.ObjectId,
              ref: 'Product',
            },
            quantity: {
              type: Number,
              default: 1,
            },
            color: String,
            price: Number,
          },
        ]     
    },
    { timestamps: true }
  );



  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart;