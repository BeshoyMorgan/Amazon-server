const express = require('express');
const router = express.Router();

const subCategoryRoute = require('./subCategory');

const { auth, canAccess } = require('../middlewares/auth')

const {
  getCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/Category');



router.get('/', getCategorys);
router.get('/:id',getCategory);
router.use('/:categoryId/subcategories', subCategoryRoute);


router.use(auth);
router.use(canAccess(["admin","saller"]));

router.post('/', createCategory);
router
  .route('/:id')
  .put(updateCategory)
  .delete(deleteCategory);


module.exports = router;
  