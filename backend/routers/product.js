const express = require("express");
const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const { getUserIdFromToken } = require("./utils");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { name, description, price, image, quantity } = req.body;
    const product = new Product({
      name: name,
      description: description,
      price: price,
      image: image,
      quantity: quantity,
      user_id: getUserIdFromToken(token),
    });
    await product.save();
    res.json({
      message: "Product created successfully!",
      product_id: product._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user_id = getUserIdFromToken(token);
    const products = await Product.find({ user_id: user_id, status: "active" })
      .lean()
      .select("-__v -user_id");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const user_id = getUserIdFromToken(token);

  try {
    const deletedProduct = await Product.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { status: "inactive" },
      { new: true }
    );
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const token = req.headers.authorization;
  const user_id = getUserIdFromToken(token);
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id, user_id: user_id }).select(
      "-__v -user_id"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
