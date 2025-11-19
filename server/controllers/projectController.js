const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");
const { deleteImage } = require("../utils/imageStorage");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error while retrieving projects" });
  }
};

exports.getOneProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    if (!project)
      return res.status(404).json({ error: "Project not found in database" });
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error while retrieving projects" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const images = req.carouselImageUrls || [];
    const publicIds = req.carouselPublicIds || [];

    if (images.length === 0 || !req.imageCoverUrl) {
      return res
        .status(400)
        .json({ error: "Main image is required in request payload" });
    }

    if (req.body._id) {
      delete req.body._id;
    }

    const project = new Project({
      ...req.body,
      owner: req.user.id,
      imageCover: req.imageCoverUrl,
      imageCoverPublicId: publicIds[0] || null,
      carouselImages: images,
      carouselPublicIds: publicIds,
    });

    await project.save();

    return res
      .status(201)
      .json({ message: "Project successfully created", project });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error while creating project",
      details: error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const images = req.carouselImageUrls || [];
    const publicIds = req.carouselPublicIds || [];
    const imageCover = req.imageCoverUrl || null;
    const imageCoverPublicId = publicIds[0] || null;

    if (req.body._id) {
      delete req.body._id;
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // --- Suppression des anciennes images ---
    if (images.length > 0 && project.carouselImages?.length > 0) {
      if (process.env.IMAGE_STORAGE === "local") {
        const deleteImageFile = async (url) => {
          const filename = url.split("/images/")[1];
          const filepath = path.join(__dirname, "..", "images", filename);
          try {
            await fs.promises.unlink(filepath);
          } catch (_) {
            // Fichier introuvable ou déjà supprimé → on ignore
          }
        };
        await Promise.all(project.carouselImages.map(deleteImageFile));
        if (project.imageCover) {
          await deleteImageFile(project.imageCover);
        }
      } else {
        // PROD : Cloudinary
        if (project.carouselPublicIds?.length > 0) {
          await Promise.all(
            project.carouselPublicIds.map(async (pid) => {
              try {
                await deleteImage(pid);
              } catch (_) {}
            })
          );
        }
        if (project.imageCoverPublicId) {
          try {
            await deleteImage(project.imageCoverPublicId);
          } catch (_) {}
        }
      }
    }

    // Mise à jour des images dans le corps
    if (images.length > 0) {
      req.body.carouselImages = images;
      req.body.carouselPublicIds = publicIds;
      req.body.imageCover = imageCover;
      req.body.imageCoverPublicId = imageCoverPublicId;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json({ message: "Project updated", project: updatedProject });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error updating project", details: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (process.env.IMAGE_STORAGE === "local") {
      // DEV: suppression des fichiers dans ./images
      const deleteImageFile = async (url) => {
        const filename = url.split("/images/")[1];
        const filepath = path.join(__dirname, "..", "images", filename);
        try {
          await fs.promises.unlink(filepath);
        } catch (_) {
          // Fichier déjà supprimé ou introuvable → on ignore
        }
      };

      if (project.imageCover) await deleteImageFile(project.imageCover);
      if (project.carouselImages?.length > 0) {
        await Promise.all(project.carouselImages.map(deleteImageFile));
      }
    } else {
      // PROD: suppression sur Cloudinary via publicIds
      if (project.imageCoverPublicId) {
        try {
          await deleteImage(project.imageCoverPublicId);
        } catch (_) {}
      }
      if (project.carouselPublicIds?.length > 0) {
        await Promise.all(
          project.carouselPublicIds.map(async (pid) => {
            try {
              await deleteImage(pid);
            } catch (_) {}
          })
        );
      }
    }

    await Project.deleteOne({ _id: req.params.id });

    return res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    return res.status(500).json({
      error: "Error deleting project",
      details: error.message,
    });
  }
};
