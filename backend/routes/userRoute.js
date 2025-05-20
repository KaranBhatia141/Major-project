const express = require("express");
const { deleteUser, getUser } = require("../controller/user.controller.js");
const verifyToken = require("../middleware/jwt.js");

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);     //, verifyToken
router.get("/:id", getUser);

module.exports = router;