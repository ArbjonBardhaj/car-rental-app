const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();


router.post("/register", userController.addUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/check", userController.loginStatus);
router.delete("/:id", userController.deleteUser);

module.exports = router;