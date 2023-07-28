const express = require('express');
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { isLoginAdmin } = require('../middleware/authMiddleware')

router.use(isLoginAdmin)

router.get("/", dashboardController.index);

module.exports = router;