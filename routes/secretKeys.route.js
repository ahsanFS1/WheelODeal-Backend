import express from "express";
import {getSpecific, getSecretKeys, createSecretKey, deleteSecretKey, validateKey, validateProject } from "../controllers/secretKeys.controller.js";

const router = express.Router();

// Get all keys
router.get("/keys", getSecretKeys);

router.get("/SPkeys/:projectId", getSpecific);
// Create a new key
router.post("/keys", createSecretKey);

// Delete a key
router.delete("/keys/:id", deleteSecretKey);

// Validate a key
router.post("/keys/validate", validateKey);

router.post("/keys/validate-project", validateProject);
export default router;
