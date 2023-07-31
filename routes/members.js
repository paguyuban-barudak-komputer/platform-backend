const express = require('express');
const router = express.Router();
const membersController = require("../controllers/membersController");
const multer = require('multer')
const os = require('os')

router.get("/", membersController.index);
router.get("/create", membersController.create);
router.get("/:id/edit", membersController.edit);

router.post("/store", multer({ dest: os.tmpdir() }).single('photo'), membersController.store);

router.put("/:id/update", multer({ dest: os.tmpdir() }).single('photo'), membersController.update);
router.delete("/:id", membersController.destroy);

// API
router.get("/index", membersController.indexAPI);
router.get("/active", membersController.activeMemberAPI);

module.exports = router;