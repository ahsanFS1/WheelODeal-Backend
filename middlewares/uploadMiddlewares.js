import multer from "multer";
import path from "path";
import fs from "fs";

// Dynamic storage configuration based on query parameter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderType = req.query.type || "public"; // Default to "mlp" folder if no type is provided
    const folderPath = `uploads/${folderType}/`;

    // Ensure the directory exists
    fs.mkdirSync(folderPath, { recursive: true });

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max size: 5MB
}).single("image");
