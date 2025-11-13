const express = require("express");
const skillController = require("../controllers/skillController");
const router = express.Router();
const auth = require("../middleware/auth");
const logoUpload = require("../middleware/logoUpload");

router.get("/", skillController.getAllSkills);
router.post("/", auth, logoUpload, skillController.createSkill);
router.put("/:id", auth, logoUpload, skillController.updateSkill);
router.delete("/:id", auth, skillController.deleteSkill);

module.exports = router;
