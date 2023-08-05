const CategoryModel = require('../models/Category')
const factory = require('../utils/crudBuilder');


exports.getCategorys = factory.getAll(CategoryModel);

exports.getCategory = factory.getOne(CategoryModel);

exports.createCategory = factory.createOne(CategoryModel);

exports.deleteCategory = factory.deleteOne(CategoryModel);

exports.updateCategory = factory.updateOne(CategoryModel);