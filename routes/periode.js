const express = require('express');
const router = express.Router();
const periodeController = require("../controllers/periodeController");

router.get("/", periodeController.index);
router.get("/create", periodeController.create);
router.get("/:id/edit", periodeController.edit);

router.post("/store", periodeController.store);

router.put("/:id/update", periodeController.update);
router.delete("/:id", periodeController.destroy);

module.exports = router;