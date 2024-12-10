export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Use the custom BACKEND_HOST if available, otherwise default to local server
    const folderType = req.query.type || "public";
    const fileUrl = `${process.env.BACKEND_HOST || `${req.protocol}://${req.get("host")}`}/uploads/${folderType}/${req.file.filename}`;

    res.status(200).json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};