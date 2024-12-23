import multer from "multer";
import path from "path";
import fs from "fs";

// Dynamic storage configuration based on query parameter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderType = req.query.type || "public"; // Default to "public" folder if no type is provided
    const folderPath = `uploads/${folderType}/`;

    // Ensure the directory exists
    fs.mkdirSync(folderPath, { recursive: true });

    cb(null, folderPath);
  },
 filename: (req, file, cb) => {
  // Replace spaces with underscores or URL-encode the filename
  const encodedFilename = file.originalname.replace(/\s+/g, '_'); // Replaces spaces with underscores
  // Alternatively, you could use: const encodedFilename = encodeURIComponent(file.originalname);
  cb(null, `${Date.now()}-${encodedFilename}`);
}
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

// Dynamic max file size
export const uploadImage = (req, res, next) => {
  const maxFileSize = req.query.maxSize *1024 * 1024|| 5 * 1024 * 1024; // Default to 5MB if not provided

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize }, // Use dynamic file size
  }).single("image");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: `File size exceeds the limit of ${maxFileSize / (1024 * 1024)}MB.`,
        });
      }
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};


