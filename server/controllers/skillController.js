const Skill = require("../models/Skill");
const fs = require("fs");
const path = require("path");

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("category");
    return res.status(200).json(skills);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching skills", details: error.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    if (req.body._id) {
      delete req.body._id;
    }

    let logoUrl = null;
    let svgContent = null;

    //Permet de gérer une image ou un SVG
    if (req.file) {
      logoUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    if (req.body.svgContent) {
      svgContent = req.body.svgContent;
    }

    if (!logoUrl && !svgContent) {
      return res
        .status(400)
        .json({ error: "Logo image or SVG content is required" });
    }

    const skill = new Skill({
      ...req.body,
      logoUrl,
      svgContent,
      owner: req.user.id,
    });
    await skill.save();
    return res.status(201).json({ message: "Skill created", skill });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating skill", details: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });

    if (req.file) {
      if (skill.logoUrl) {
        const oldFilename = skill.logoUrl.split("/images/")[1];
        const oldPath = path.join(__dirname, "..", "images", oldFilename);
        try {
          await fs.promises.unlink(oldPath);
        } catch (_) {}
      }

      skill.logoUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
      skill.svgContent = null; // on remplace le SVG si on upload une image
    }

    if (req.body.svgContent) {
      // Si on envoie un nouveau SVG, on supprime le logo
      if (skill.logoUrl) {
        const oldFilename = skill.logoUrl.split("/images/")[1];
        const oldPath = path.join(__dirname, "..", "images", oldFilename);
        try {
          await fs.promises.unlink(oldPath);
        } catch (_) {}
      }
      skill.logoUrl = null;
      skill.svgContent = req.body.svgContent;
    }

    Object.assign(skill, req.body);
    await skill.save();
    return res.status(200).json({ message: "Skill updated", skill });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error updating skill", details: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });

    if (skill.logoUrl) {
      const filename = skill.logoUrl.split("/images/")[1];
      const filepath = path.join(__dirname, "..", "images", filename);
      try {
        await fs.promises.unlink(filepath);
      } catch (_) {}
    }

    await skill.deleteOne();
    return res.status(200).json({ message: "Skill deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error deleting skill", details: error.message });
  }
};
