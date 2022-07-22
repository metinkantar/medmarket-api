const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middleware/auth");
const { getAllProduct, getOneProduct, addProduct, deleteProduct, getLimitProduct } = require("../controllers/product");

router.route("/").get(getAllProduct);
router.route("/:limit").get(getLimitProduct);
router.route("/").post(addProduct);
router.route("/product/:id").get(getOneProduct);
router.route("/:id").delete(deleteProduct);

module.exports = router;

