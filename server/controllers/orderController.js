const Order = require("../models/orderModel");

const addUserOrder = async (req, res) => {
  try {
    const userId = req.id;
    const { cart } = req.body;
    const addedOrder = [];
    for (let i = 0; i < cart.length; i++) {
      const { quantity, _id } = cart[i];
      productId = _id;
      const order = { userId, productId, quantity };
      addedOrder.push(await Order.create(order));
    }
    res.status(201).json({
      message: "Order created successfully",
      order: addedOrder,
    });
  } catch (error) {
    console.error("Error creating a new Order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const userId = req.id;
    const orders = await Order.find({ userId });
    if (!orders) {
      res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    const cancelled = { ...order, status: "Cancelled" };
    order.set(cancelled);
    await order.save();
    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body.status;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    const newstatus = { ...order, status };
    order.set(newstatus);
    await order.save();
    res.status(200).json({
      message: `Order status changed successfully`,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Order deleted successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addUserOrder,
  getUserOrders,
  cancelOrder,
  updateOrder,
  deleteOrder,
};
