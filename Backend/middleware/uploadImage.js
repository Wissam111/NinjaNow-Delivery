const multer = require("multer");
const imageModel = require("../models/imageModel");
const fs = require("fs");
//storage
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "imgs");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({
  storage: Storage,
}).single("newImg");

const upload = (req, res) => {
  console.log("uploadssssssss");
  uploadImage(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const img = imageModel({
        name: req.body.name,
        img: {
          data: fs.readFileSync("imgs/" + req.file.filename),
          contentType: "image/png",
        },
      });

      img
        .save()
        .then(() =>
          res.status(200).json({ messg: "uploaded image successfully", img })
        )
        .catch((err) => console.log(err));
    }
  });
};

module.exports = upload;
