const fs = require("fs/promises");
const path = require("path");

const getProducts = async (req, res, next) => {
  try {
    const filePath = path.join(__dirname, "../data/products.json");
    const file = await fs.readFile(filePath, "utf-8");
    const { products } = JSON.parse(file);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const filePath = path.join(__dirname, "../data/products.json");
    const file = await fs.readFile(filePath, "utf-8");
    const { products } = JSON.parse(file); // ✅ parse first
    const product = products.find((p) => p.id === parseInt(req.params.id, 10)); // ✅ then use it

    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts, getProduct };
