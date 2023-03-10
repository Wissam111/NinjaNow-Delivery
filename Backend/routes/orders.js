const express = require("express");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

const {
  getOrders,
  getOrdersByDate,
  createOrder,
  updateOrder,
  updateStatus,
} = require("../controllers/orderController");
router.use(requireAuth);

router.get("/", getOrders);
router.post("/date", getOrdersByDate);

router.post("/", createOrder);
// router.patch("/:id", updateOrder);
router.patch("/update-status", updateStatus);

module.exports = router;
