const express = require("express");

const {
  getUsers,
  getUser,
  deleteUser,
  signupUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

//get all users
router.get("/", getUsers);
//get user by id
router.get("/:id", getUser);
//delete user by id
router.delete("/:id", deleteUser);
//create new user
router.post("/signup", signupUser);
//login user
router.post("/login", loginUser);

module.exports = router;
