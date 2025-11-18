const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const fileFilter = (req, file, cb) => {
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
}).fields([{ name: "carousel", maxCount: 5 }]);

module.exports = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Erreur multer:", err.message);
      return res.status(400).json({ message: err.message });
    }

    const imageUrls = [];

    if (
      !req.isUpdate &&
      (!req.files?.carousel || req.files.carousel.length === 0)
    ) {
      console.warn("Aucune image reçue dans 'carousel'");
      return res
        .status(400)
        .json({ error: "At least one image is required in request payload" });
    }

    try {
      if (req.files?.carousel && req.files.carousel.length > 0) {
        for (const [index, file] of req.files.carousel.entries()) {
          const originalName = file.originalname
            .split(" ")
            .join("_")
            .split(".")[0];
          const filename = `carousel_${originalName}_${Date.now()}_${index}.webp`;
          const filepath = path.join("images", filename);

          await sharp(file.buffer)
            .resize(1920, 1080)
            .webp({ quality: 80 })
            .toFile(filepath);

          const imageUrl = `${req.protocol}://${req.get(
            "host"
          )}/images/${filename}`;
          imageUrls.push(imageUrl);
        }
      }

      req.carouselImageUrls = imageUrls;
      req.imageCoverUrl = imageUrls[0];

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};
