const Skill = require("../models/Skill");
const { saveImage } = require("../utils/imageStorage");
const { deleteImage } = require("../utils/imageStorage");
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
    if (req.body._id) delete req.body._id;

    if (!req.file) {
      return res.status(400).json({ error: "SVG file required" });
    }

    // Générer un nom unique pour l'image
    originalName = path.parse(req.file.originalname).name;
    extension = path.extname(req.file.originalname);

    let filename;
    if (process.env.IMAGE_STORAGE === "local") {
      // En dev → garder l’extension
      filename = `logo_${Date.now()}_${originalName}${extension}`;
    } else {
      // En prod → pas d’extension
      filename = `logo_${Date.now()}_${originalName}`;
    }

    // Sauvegarde via le helper (local ou cloudinary)
    const image = await saveImage(
      req.file.buffer,
      filename,
      "skills",
      `${req.protocol}://${req.get("host")}`
    );

    const skill = new Skill({
      ...req.body,
      logoUrl: image.url,
      logoPublicId: image.publicId,
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
      // Supprimer l'ancienne image
      if (process.env.IMAGE_STORAGE === "local") {
        if (skill.logoUrl) {
          const oldFilename = skill.logoUrl.split("/images/")[1];
          const oldPath = path.join(__dirname, "..", "images", oldFilename);
          try {
            await fs.promises.unlink(oldPath);
          } catch (_) {
            // on ignore si le fichier n'existe plus
          }
        }
      } else {
        if (skill.logoPublicId) {
          try {
            await deleteImage(skill.logoPublicId);
          } catch (_) {
            // on ignore si déjà supprimé
          }
        }
      }

      // Générer un nom unique pour l'image
      originalName = path.parse(req.file.originalname).name;
      extension = path.extname(req.file.originalname);

      let filename;
      if (process.env.IMAGE_STORAGE === "local") {
        // En dev → garder l’extension
        filename = `logo_${Date.now()}_${originalName}${extension}`;
      } else {
        // En prod → pas d’extension
        filename = `logo_${Date.now()}_${originalName}`;
      }

      // Sauvegarder la nouvelle image
      const image = await saveImage(
        req.file.buffer,
        filename,
        "skills",
        `${req.protocol}://${req.get("host")}`
      );

      skill.logoUrl = image.url;
      skill.logoPublicId = image.publicId;
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

    // Supprimer l'image associée
    if (process.env.IMAGE_STORAGE === "local") {
      if (skill.logoUrl) {
        const filename = skill.logoUrl.split("/images/")[1];
        const filepath = path.join(__dirname, "..", "images", filename);
        try {
          await fs.promises.unlink(filepath);
        } catch (_) {
          // on ignore si le fichier n'existe plus
        }
      }
    } else {
      if (skill.logoPublicId) {
        try {
          await deleteImage(skill.logoPublicId);
        } catch (_) {
          // on ignore si déjà supprimé
        }
      }
    }

    await skill.deleteOne();
    return res.status(200).json({ message: "Skill deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error deleting skill", details: error.message });
  }
};
