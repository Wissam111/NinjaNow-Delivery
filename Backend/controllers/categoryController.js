const Category = require("../models/categoryModel");
const mongoose = require("mongoose");
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    res
      .status(200)
      .json({ messg: "categories fetched successfully", categories });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  const { categoryName, image } = req.body;
  const exists = await Category.findOne({ categoryName });

  if (exists) {
    // throw Error("Category already exists");
    res.status(400).json({ messg: "Category already exists" });
    return;
  }

  try {
    const category = await Category.create({ categoryName, image });
    res.status(200).json({ messg: "Category created successfully", category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ messg: "No such category!" });
  }
  try {
    const category = await Category.findOneAndDelete({ _id: id });
    if (!category) {
      return res.status(404).json({ messg: "No such dish!" });
    }
    res.status(200).json({ messg: "category deleted successfully", category });
  } catch (error) {}
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
