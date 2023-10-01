const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
