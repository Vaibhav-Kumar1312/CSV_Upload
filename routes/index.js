const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController.js");
const fileController = require("../controllers/fileController.js");

router.get("/", homeController.homePage);
router.post("/upload-csv", fileController.uploadFile);
router.get("/view/:id", fileController.viewFile);
router.get("/delete/:id", fileController.deleteFile);

module.exports = router;
