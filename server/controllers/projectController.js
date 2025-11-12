const Project = require("../models/Project");

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
      imageCover: req.imageCoverUrl,
      carouselImages: images,
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
