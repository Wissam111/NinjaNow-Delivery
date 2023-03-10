const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getRestaurants,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
  loginRestaurant,
} = require("../controllers/restaurantController");
//get all restaurants

router.post("/", createRestaurant);
router.post("/login", loginRestaurant);

router.use(requireAuth);

router.get("/", getRestaurants);
router.delete("/:id", deleteRestaurant);
router.patch("/:id", updateRestaurant);

module.exports = router;
