const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  getCart,
  addToCart,
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity
} = require("../controllers/cartController");
const router = express.Router();

router.use(protect);
router.get("/", getCart);
router.post("/:id", addToCart);
router.delete("/:id", removeItem);
router.delete("/", clearCart);
router.put("/increase/:id", increaseQuantity);
router.put("/decrease/:id", decreaseQuantity);

module.exports = router;
