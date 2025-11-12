const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController.js");
const imageUpload = require("../middleware/imageUpload.js");

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getOneProject);
router.post("/", imageUpload, projectController.createProject);
router.put("/:id", imageUpload, projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
