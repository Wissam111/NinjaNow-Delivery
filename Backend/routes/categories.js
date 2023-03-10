const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.use(requireAuth);
//get all categories
router.get("/", getCategories);
// get category by id
// router.get("/:id");
//create new categroy
router.post("/", createCategory);
//delete category by id
router.delete("/:id", deleteCategory);

module.exports = router;
