var mongoose = require('mongoose');

var SunCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category',
        required: true
    }
}, { timestamps: true })

const CategoryModel = mongoose.model('SubCategory', SunCategorySchema)
module.exports = CategoryModel