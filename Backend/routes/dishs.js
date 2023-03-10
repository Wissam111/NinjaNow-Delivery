const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getDishes,
  createDish,
  deleteDish,
  getRestaurantDishes,
  updateDish,
} = require("../controllers/dishController");

const router = express.Router();

router.use(requireAuth);
router.get("/", getDishes);
router.get("/restaurant/:id", getRestaurantDishes);
router.post("/", createDish);
router.delete("/:id", deleteDish);
router.patch("/:id", updateDish);

module.exports = router;
