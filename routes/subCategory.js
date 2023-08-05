const express = require('express');
const router = express.Router({mergeParams:true});

const { auth, canAccess } = require('../middlewares/auth')

const {
  getSubCategorys,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setFilterObj
} = require('../controllers/SubCategory');



router.get('/', setFilterObj, getSubCategorys);
router.get('/:id',getSubCategory);



router.use(auth);
router.use(canAccess(["admin","saller"]));

router.post('/', createSubCategory);
router
  .route('/:id')
  .put(updateSubCategory)
  .delete(deleteSubCategory);



module.exports = router;
  