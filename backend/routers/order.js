const express = require("express");
const { Order, OrderItems } = require("../models/order");
const Product = require("../models/product");
const { getUserIdFromToken, generatepdf } = require("./utils");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user_id = getUserIdFromToken(token);
    const items = req.body;
    const currentUTCDateTime = new Date();
    const productIds = Object.keys(items);
    const products = await Product.find({
      _id: { $in: productIds },
      user_id: user_id,
    });
    const productMap = products.reduce((map, product) => {
      map[product._id.toString()] = product;
      return map;
    }, {});

    const order = new Order({
      user_id: user_id,
      order_time: currentUTCDateTime,
      status: "draft",
    });
    await order.save();

    for (const productId in items) {
      const quantity = items[productId];
      const orderItem = new OrderItems({
        order_id: order._id,
        product_id: productId,
        quantity: quantity,
        price: productMap[productId]["price"],
        product_name: productMap[productId]["name"],
      });
      await orderItem.save();
    }
    res.json({
      message: "Draft order created successfully",
      order_id: order._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const token = req.headers.authorization;
    const user_id = getUserIdFromToken(token);
    const order = await OrderItems.find({ order_id: order_id });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const updatedItems = req.body;

    const order = await OrderItems.findById(order_id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    for (const productId in updatedItems) {
      const quantity = updatedItems[productId];

      const orderItem = await OrderItems.findOne({
        order_id,
        product_id: productId,
      });

      if (orderItem) {
        await OrderItems.findOneAndUpdate(
          { order_id, product_id: productId },
          { quantity: quantity }
        );
      } else {
        const newOrderItem = new OrderItems({
          order_id,
          product_id: productId,
          quantity,
        });
        await newOrderItem.save();
      }
    }

    res.json({ message: "Items updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.patch("/submit/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const order = await Order.findById(order_id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findOneAndUpdate({ order_id }, { status: "completed" });
    const file_url = await generatepdf(order_id);
    res.json({ file_url: file_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
