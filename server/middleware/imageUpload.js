const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const { saveImage } = require("../utils/imageStorage");

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
    const publicIds = [];

    if (
      !req.isUpdate &&
      (!req.files?.carousel || req.files.carousel.length === 0)
    ) {
      return res
        .status(400)
        .json({ error: "At least one image is required in request payload" });
    }

    try {
      if (req.files?.carousel && req.files.carousel.length > 0) {
        const timestamp = Date.now(); //Fixé une seule fois

        for (const [index, file] of req.files.carousel.entries()) {
          const originalName = file.originalname
            .split(" ")
            .join("_")
            .split(".")[0];
          const filename =
            process.env.IMAGE_STORAGE === "local"
              ? `carousel_${originalName}_${timestamp}_${index}.webp`
              : `carousel_${originalName}_${timestamp}_${index}`;

          if (process.env.IMAGE_STORAGE === "local") {
            // DEV : Sharp + ./images
            const filepath = path.join("images", filename);

            await sharp(file.buffer)
              .resize(800, 600)
              .webp({ quality: 80 })
              .toFile(filepath);

            const imageUrl = `${req.protocol}://${req.get(
              "host"
            )}/images/${filename}`;
            imageUrls.push(imageUrl);
          } else {
            // PROD : Cloudinary
            const img = await saveImage(
              file.buffer,
              filename,
              "projects",
              `${req.protocol}://${req.get("host")}`
            );
            imageUrls.push(img.url);
            publicIds.push(img.publicId);
          }
        }
      }

      req.carouselImageUrls = imageUrls;
      req.carouselPublicIds = publicIds;
      req.imageCoverUrl = imageUrls[0];

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};
