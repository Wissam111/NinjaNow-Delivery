const express = require("express");
const upload = require("../middleware/uploadImage");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const { getImgs, getImage } = require("../controllers/imageController");

router.post("/", (req, res) => upload(req, res));
router.use(requireAuth);
router.get("/", getImgs);
router.get("/:id", getImage);

module.exports = router;
