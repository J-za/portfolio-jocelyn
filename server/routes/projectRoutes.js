const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController.js");
const imageUpload = require("../middleware/imageUpload.js");
const auth = require("../middleware/auth.js");

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getOneProject);
router.post("/", auth, imageUpload, projectController.createProject);
router.put(
  "/:id",
  (req, res, next) => {
    req.isUpdate = true;
    next();
  },
  auth,
  imageUpload,
  projectController.updateProject
);
router.delete("/:id", auth, projectController.deleteProject);

module.exports = router;
