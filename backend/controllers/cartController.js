const User = require("../models/User");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  await req.user.populate("cart.product");
  res.json(req.user.cart);
};

const addToCart = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { quantity } = req.body;

    console.log("User:", req.user._id);
    console.log("Product ID:", productId);
    console.log("Quantity:", quantity);

    // ✅ Ensure the product exists in DB using `id` field
    const product = await Product.findOne({ id: parseInt(productId) }); // assuming dummy products have `id` field
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Convert dummy `id` to Mongo `_id`
    const mongoProductId = product._id.toString();

    const cartItem = req.user.cart.find(
      (c) => c.product.toString() === mongoProductId
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      req.user.cart.push({ product: mongoProductId, quantity });
    }

    await req.user.save();
    await req.user.populate("cart.product");

    res.json(req.user.cart);
  } catch (err) {
    console.error("Add to cart failed:", err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const removeItem = async (req, res) => {
  const { id } = req.params;

  try {
    req.user.cart = req.user.cart.filter((c) => c.product.toString() !== id);

    await req.user.save();
    await req.user.populate("cart.product");

    res.json(req.user.cart);
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
};

const clearCart = async (req, res) => {
  req.user.cart = [];
  await req.user.save();
  res.json(req.user.cart);
};

const increaseQuantity = async (req, res) => {
  const { id } = req.params;
  const item = req.user.cart.find((c) => c.product.toString() === id);
  if (item) {
    item.quantity += 1;
    await req.user.save();
    await req.user.populate("cart.product");
    return res.json(req.user.cart);
  }
  res.status(404).json({ msg: "Item not found in cart" });
};

const decreaseQuantity = async (req, res) => {
  const { id } = req.params;
  try {
    const item = req.user.cart.find((c) => c.product.toString() === id);
    if (!item) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      req.user.cart = req.user.cart.filter((c) => c.product.toString() !== id);
    }
    await req.user.save();
    await req.user.populate("cart.product");
    res.json(req.user.cart);
  } catch (err) {
    console.error("Decrease quantity error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
};
