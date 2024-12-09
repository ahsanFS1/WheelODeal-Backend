import express from "express";
import { uploadImage } from "../middlewares/uploadMiddlewares.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/upload-image", uploadImage, uploadFile);

export default router;
