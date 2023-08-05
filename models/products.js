const moongose = require('mongoose')

const productsSchema = moongose.Schema({

    name: {
        type: String,
        required: [true, 'product name is required '],
        maxLength: [60, 'Product name cannot exceed 100 characters'],
        minLength: 1
    },
    price: {
        type: Number,
        required: [true, 'products must have a price'],
        maxLength: 1000000,
        minLength: 1

    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    brand: {
        type: String,
        required: [true, 'Please select category for this product'],
    },
    instock: {
        type: Number,
        required: [true, 'Please enter product stock'],
    },
    categoryID: {
        type: moongose.SchemaTypes.ObjectId,
        ref: 'categories',
        required:true
    },
    subCategoryID: {
        type: moongose.SchemaTypes.ObjectId,
        ref: 'subCategory',
        required:true
    },
    saller: {
        type: moongose.SchemaTypes.ObjectId,
        ref: 'user',
        required:true
    }



}, { timestamps: true })
const productsModel = moongose.model('product', productsSchema)
module.exports = productsModel