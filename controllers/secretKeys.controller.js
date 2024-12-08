import SecretKey from "../models/secretKeys.model.js";
import PublicPage from "../models/publicPage.model.js";
import crypto from 'crypto';


// Get all secret keys
export const getSecretKeys = async (req, res) => {
  try {
    const keys = await SecretKey.find();
    res.status(200).json({ success: true, data: keys });
  } catch (error) {
    console.error("Error fetching secret keys:", error.message);
    res.status(500).json({ success: false, message: "Error fetching secret keys." });
  }
};




// Create a new secret key
export const createSecretKey = async (req, res) => {
  const { projectName, plan, expiryDate } = req.body;

  try {
    // Generate a unique projectId by hashing the projectName
    const projectId = crypto.createHash('sha256').update(projectName).digest('hex');

    // Generate a random secret key
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let secretKey = '';
    for (let i = 0; i < 16; i++) {
      secretKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Create and save the new secret key
    const newKey = new SecretKey({
      secretKey,
      projectName,
      projectId,
      plan,
      expiryDate,
    });
    await newKey.save();

    // Create a new PublicPage with default values and the generated projectId
    const newPublicPage = new PublicPage({
      projectId,
     
    });
    await newPublicPage.save();

    res.status(201).json({ success: true, data: newKey });
  } catch (error) {
    console.error("Error creating secret key:", error.message);
    res.status(500).json({ success: false, message: "Error creating secret key." });
  }
};

// Delete a secret key
export const deleteSecretKey = async (req, res) => {
  const { id } = req.params;

  try {
    const key = await SecretKey.findByIdAndDelete(id);
    if (!key) {
      return res.status(404).json({ success: false, message: "Secret key not found." });
    }
    res.status(200).json({ success: true, message: "Secret key deleted successfully." });
  } catch (error) {
    console.error("Error deleting secret key:", error.message);
    res.status(500).json({ success: false, message: "Error deleting secret key." });
  }
};

// Validate a secret key
export const validateKey = async (req, res) => {
  const { secretKey } = req.body;

  try {
    const key = await SecretKey.findOne({ secretKey });
    if (!key) {
      return res.status(404).json({ success: false, message: "Invalid secret key." });
    }

    // Check expiration
    const now = new Date();
    if (new Date(key.expiryDate) < now) {
      return res.status(400).json({ success: false, message: "Secret key has expired." });
    }

    res.status(200).json({ success: true, message: "Secret key is valid.", data: key });
  } catch (error) {
    console.error("Error validating secret key:", error.message);
    res.status(500).json({ success: false, message: "Error validating secret key." });
  }
};
