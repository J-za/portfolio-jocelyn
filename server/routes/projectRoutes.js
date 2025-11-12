const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController.js");
const imageUpload = require("../middleware/imageUpload.js");

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getOneProject);
router.post("/", imageUpload, projectController.createProject);

module.exports = router;
