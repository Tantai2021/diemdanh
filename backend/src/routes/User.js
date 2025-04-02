const UserController = require("../controllers/User");
const express = require("express");
const router = express.Router();

router.post('/login', UserController.login);

module.exports = router;