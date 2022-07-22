const router = require("express").Router();
const {
  allCategory,
  addCategory,
  deleteCategory,
  updateCategory,
  allSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  allSubcategoriesOfTheCategory,
} = require("../controllers/category");

router.route("/").get(allCategory);
router.route("/").post(addCategory);
router.route("/:id").put(updateCategory);
router.route("/:id").delete(deleteCategory);

router.route("/sub").get(allSubCategory);
router.route("/subcat/:id").get(allSubcategoriesOfTheCategory);
router.route("/sub").post(addSubCategory);
router.route("/sub/:id").put(updateSubCategory);
router.route("/sub/:id").delete(deleteSubCategory);

module.exports = router;
