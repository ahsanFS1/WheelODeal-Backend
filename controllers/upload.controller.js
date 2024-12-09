export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Extract folder type from query and include in the URL
    const folderType = req.query.type || "public";
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${folderType}/${req.file.filename}`;
    // const fileUrl = `${process.env.BACKEND_HOST || req.protocol + "://" + req.get("host")}/uploads/${req.query.type || "mlp"}/${req.file.filename}`;
    // console.log(fileUrl)
    
    // Save fileUrl in the appropriate table

    // if (req.query.type === "mlp") {
    // Save fileUrl in mlp
    // }

    res.status(200).json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
