const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.memoryStorage();

const uploadLogo = multer({ storage }).single("logo");

const processLogo = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const filename = `logo_${Date.now()}.png`;
    const filepath = path.join("images", filename);

    await sharp(req.file.buffer)
      .resize(128, 128)
      .png({ quality: 80 })
      .toFile(filepath);

    req.file.filename = filename;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error processing logo", details: error.message });
  }
};

module.exports = [uploadLogo, processLogo];
