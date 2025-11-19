const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");

// Sauvegarde image (local ou cloudinary)
async function saveImage(buffer, filename, folder = "uploads", baseUrl = "") {
  if (process.env.IMAGE_STORAGE === "local") {
    // En dev : écrire le fichier dans ./images
    const dir = process.env.IMAGE_PATH || "./images";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, buffer);

    return {
      url: `${baseUrl}/images/${filename}`, // URL locale
      publicId: null, // pas utilisé en dev
    };
  } else {
    // En prod : upload sur Cloudinary
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, public_id: filename },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url, // URL Cloudinary
            publicId: result.public_id, // utile pour delete/update
          });
        }
      );
      stream.end(buffer);
    });
  }
}

// Suppression image (cloudinary uniquement)
async function deleteImage(publicId) {
  if (!publicId) return; // rien à faire en dev
  await cloudinary.uploader.destroy(publicId);
}

module.exports = { saveImage, deleteImage };
