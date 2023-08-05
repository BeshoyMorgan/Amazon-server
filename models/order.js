const mongoose = require("mongoose")
const orderSchema = mongoose.Schema(
        {
            shippingInfo: {
                address: {
                    type: String,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                },
                phoneNo: {
                    type: String,
                    required: true
                },
                postalCode: {
                    type: String,
                    required: true
                },
                country: {
                    type: String,
                    required: true
                }
            },
            name: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            orderItems: [
                {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: 'Product'
                }
            ],
            isPaid: {
                type:Boolean,
                required:true,
                default: false
            },
            itemsPrice: {
                type: Number,
                required: true,
            },
            taxPrice: {
                type: Number,
                required: true,
            },
            shippingPrice: {
                type: Number,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            },
            orderStatus: {
                type: String,
                required: true,
                default:"pending"
            },
            deliveredAt: {
                type: String
            }
        },
        { timestamps: true }
)

const orderModel=mongoose.model("order",orderSchema)

module.exports=orderModel