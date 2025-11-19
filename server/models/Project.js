const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: [{ type: String }],
    imageCover: { type: String, required: true },
    imageCoverPublicId: { type: String },
    carouselImages: [{ type: String }],
    carouselPublicIds: [{ type: String }],
    techLogos: [{ type: String }],
    tags: [{ type: String }],
    githubLink: { type: String },
    demoLink: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
