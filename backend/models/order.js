const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  order_time: { type: Date, required: true },
  total: { type: Number, required: false },
  status: {
    type: String,
    required: true,
    enum: ["draft", "cancelled", "completed"],
    default: "draft",
  },
});

const Order = mongoose.model("Order", orderSchema);

const orderItemsSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  price: { type: Number, required: true },
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const OrderItems = mongoose.model("OrderItems", orderItemsSchema);

module.exports = { Order, OrderItems };
