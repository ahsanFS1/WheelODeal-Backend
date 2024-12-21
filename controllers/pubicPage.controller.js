import PublicPage from '../models/publicPage.model.js';
import SecretKey from '../models/secretKeys.model.js';
import { v4 as uuidv4 } from 'uuid'; // Ensure uuidv4 is imported

// Get all public pages for a specific projectId
export const getPP = async (req, res) => {
  const { projectId } = req.params;

  try {
    const pages = await PublicPage.find({ projectId }); // Fetch all public pages for the projectId
    if (!pages.length) {
      return res.status(404).json({ success: false, message: "No public pages found for this project." });
    }

    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching public pages:", error.message);
    res.status(500).json({ success: false, message: "Error fetching public pages." });
  }
};

// Create a new public page for a projectId
export const createPP = async (req, res) => {
  const { projectId,publicPageName } = req.body;

  try {
    const key = await SecretKey.findOne({ projectId });
    if (!key || key.remainingPages <= 0) {
      return res.status(400).json({ success: false, message: "No public pages available for creation." });
    }

    const newPublicPage = new PublicPage({
      publicPageId: uuidv4(), // Generate a unique public page ID
      projectId,
      publicPageName
    });

    await newPublicPage.save();

    key.remainingPages -= 1; // Decrement remaining pages
    await key.save();

    res.status(201).json({ success: true, data: newPublicPage });
  } catch (error) {
    console.error("Error creating public page:", error.message);
    res.status(500).json({ success: false, message: "Error creating public page." });
  }
};

// Update public page configuration by publicPageId
export const updatePP = async (req, res) => {
  const { publicPageId } = req.params;
  const updatedData = req.body;

  try {
    console.log(`Updating PublicPage for publicPageId: ${publicPageId}`);
    const publicPageData = await PublicPage.findOneAndUpdate(
      { publicPageId },
      { $set: updatedData },
      { new: true, upsert: true } // Return the updated document; create if it doesn't exist
    );

    res.status(200).json({ success: true, data: publicPageData });
    console.log(`Updated PublicPage for publicPageId: ${publicPageId}`);
  } catch (error) {
    console.error(`Error updating the PublicPage for publicPageId: ${publicPageId}`, error.message);
    res.status(500).json({ success: false, message: 'Error updating the PublicPage data.' });
  }
};

// Delete a public page by its ID
export const deletePP = async (req, res) => {
  const { publicPageId } = req.params; // Extract publicPageId from request params
  
  console.log("Deleting page with publicPageId:", publicPageId);

  try {
    // Find the public page using publicPageId
    const publicPageData = await PublicPage.findOne({ publicPageId: publicPageId});

    if (!publicPageData) {
      return res.status(404).json({ success: false, message: "Public page not found." });
    }
    const key = await SecretKey.findOne({ projectId: publicPageData.projectId });
    // Use the _id of the document to delete it
    const publicPage = await PublicPage.findByIdAndDelete(publicPageData._id);
    

    if (!publicPage) {
      return res.status(404).json({ success: false, message: "Error deleting public page." });
    }
    key.remainingPages+=1;
    await key.save();
    res.status(200).json({ success: true, message: "Public page deleted successfully." });
  } catch (error) {
    console.error("Error deleting public page:", error.message);
    res.status(500).json({ success: false, message: "Error deleting public page." });
  }
};


// Get a single public page by its publicPageId
export const getSinglePublicPage = async (req, res) => {
  const { publicPageId } = req.params;

  try {
    const page = await PublicPage.findOne({ publicPageId });
    if (!page) {
      return res.status(404).json({ success: false, message: "Public page not found." });
    }

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching public page:", error.message);
    res.status(500).json({ success: false, message: "Error fetching public page." });
  }
};

