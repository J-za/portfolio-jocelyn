const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/svg+xml") {
    cb(null, true);
  } else {
    cb(new Error("Only SVG files are allowed"), false);
  }
};

const uploadLogo = multer({
  storage: multer.memoryStorage(),
  fileFilter,
}).single("logo");

module.exports = uploadLogo;
