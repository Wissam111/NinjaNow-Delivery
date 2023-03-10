const imageModel = require("../models/imageModel");
const mongoose = require("mongoose");

const getImgs = async (req, res) => {
  try {
    const imgs = await imageModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ messg: "fetched imgs successfully", imgs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getImage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ messg: "No such image!" });
  }
  try {
    const img = await imageModel.findById({ _id: id });
    // const imageBase64 = toBase64(img.img);
    if (!img) {
      return res.status(404).json({ messg: "No such image!" });
    }
    // const is = img.img.data.type;
    res.status(200).json({ messg: "fetched image successfully", img });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getImgs, getImage };
