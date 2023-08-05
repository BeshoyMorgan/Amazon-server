const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: [true, 'name required'],
      },
      email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
      },
      phone: String,
      image: String,
      verifyEmailCode:{
        type: String,
      },
      password: {
        type: String,
        required: [true, 'password required'],
        minlength: [8, 'Too short password'],
      },
      passwordResetCode: String,
      passwordResetExpires: Date,
      passwordResetVerified: Boolean,
      role: {
        type: String,
        enum: ['user', 'seller', 'admin'],
       default: 'user',
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      wishlist: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
      ],
     
    },
    { timestamps: true }
  );


userSchema.pre('save', function (next) {
  if(this.isModified('password')){
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword
  }
  next()
  
})

  

  const User = mongoose.model('User', userSchema);
  
  module.exports = User;