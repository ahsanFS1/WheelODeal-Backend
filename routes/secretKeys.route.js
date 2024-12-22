import express from "express";
import {getSpecific, getSecretKeys, createSecretKey, deleteSecretKey, validateKey, validateProject } from "../controllers/secretKeys.controller.js";
import { extendExpiryDate } from "../controllers/secretKeys.controller.js";
import SecretKeyModel from "../models/secretKeys.model.js";
import PublicPage from "../models/publicPage.model.js";
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
  
  

  router.put('/keys/plan/:id', async (req, res) => {
    try {
      const { plan, projectId } = req.body; // Get plan and projectId from the request body
      const { id } = req.params; // The id of the secret key from the URL parameter
  
      // Plan to total pages mapping
      const planToTotalPages = {
        basic: 1,
        better: 3,
        best: 6
      };
  
      // Find the secret key by ID
      const secretKey = await SecretKeyModel.findById(id);
  
      if (!secretKey) {
        return res.status(404).json({ success: false, message: 'Key not found' });
      }
  
      // Determine the new total pages based on the new plan
      const newTotalPages = planToTotalPages[plan];
  
      // Fetch all public pages related to the projectId
      const publicPages = await PublicPage.find({ projectId: projectId });
  
      // Calculate the total number of public pages
      const totalPagesInProject = publicPages.length;
  
      // Handle downgrading: Delete excess pages if the new total pages are less than existing public pages
      if (newTotalPages < totalPagesInProject) {
        const excessPages = totalPagesInProject - newTotalPages;
  
        // Get the excess public pages and delete them (keep the first ones and delete the rest)
        const pagesToDelete = publicPages.slice(newTotalPages); // Delete the pages beyond the allowed total pages
        await PublicPage.deleteMany({ _id: { $in: pagesToDelete.map(page => page._id) } });
      }
  
      // Handle upgrading: Increase totalPages, no need to delete public pages
      // Note: If totalPages is increased, remainingPages should be recalculated if needed
      const newRemainingPages = Math.max(newTotalPages - totalPagesInProject, 0);
  
      // Update the SecretKey model
      secretKey.totalPages = newTotalPages;
      secretKey.remainingPages = newRemainingPages; // Recalculate remaining pages
      secretKey.plan = plan;
  
      // Save the updated key
      const updatedKey = await secretKey.save();
  
      // Send the updated key in the response
      return res.json({ success: true, data: updatedKey });
    } catch (error) {
      console.error('Error updating plan:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  
  export default router;