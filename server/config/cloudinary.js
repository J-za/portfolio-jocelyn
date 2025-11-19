const cloudinary = require("cloudinary").v2;

// Configuration via la variable d'environnement CLOUDINARY_URL
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

module.exports = cloudinary;
