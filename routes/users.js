const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.index);
router.get("/create", usersController.create);
router.get("/:id/edit", usersController.edit);

router.post("/store", usersController.store);

router.put("/:id/update", usersController.update);
router.delete("/:id", usersController.destroy);

module.exports = router;