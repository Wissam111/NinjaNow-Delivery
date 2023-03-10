const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const SocketRouter = (io) => {
  const router = express.Router();
  const {
    createOrder,
    updateStatus,
  } = require("../controllers/orderSocketIoController");

  router.use(requireAuth);

  router.post("/", (req, res) => createOrder(req, res, io));
  router.patch("/update-status", (req, res) => updateStatus(req, res, io));

  return router;
};

module.exports = SocketRouter;
