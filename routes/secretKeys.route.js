import express from "express";
import {getSpecific, getSecretKeys, createSecretKey, deleteSecretKey, validateKey, validateProject } from "../controllers/secretKeys.controller.js";
import { extendExpiryDate } from "../controllers/secretKeys.controller.js";
import SecretKeyModel from "../models/secretKeys.model.js"
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

router.put('/keys/:id', async (req, res) => {
    try {
        console.log("extend");
      const { expiryDate } = req.body;
      const { id } = req.params;
  
      // Update the expiryDate in the database
      const updatedKey = await SecretKeyModel.findByIdAndUpdate(id, { expiryDate }, { new: true });
  
      if (!updatedKey) {
        return res.status(404).json({ success: false, message: 'Key not found' });
      }
  
      return res.json({ success: true, data: updatedKey });
    } catch (error) {
      console.error('Error updating expiry date:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  export default router;