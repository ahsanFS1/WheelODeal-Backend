import PublicPage from '../models/publicPage.model.js';

// Fetch PublicPage configuration by projectId
export const getPP = async (req, res) => {
  const { projectId } = req.params;

  try {
    console.log(`Fetching PublicPage for projectId: ${projectId}`);
    const publicPageData = await PublicPage.findOne({ projectId });

    if (!publicPageData) {
      console.log(`No PublicPage found for projectId: ${projectId}`);
      return res.status(404).json({ success: false, message: 'PublicPage not found.' });
    }

    res.status(200).json({ success: true, data: publicPageData });
    console.log(`Fetched PublicPage for projectId: ${projectId}`);
  } catch (error) {
    console.error(`Error fetching the PublicPage for projectId: ${projectId}`, error);
    res.status(500).json({ success: false, message: 'Error fetching the PublicPage data.' });
  }
};


// Update PublicPage configuration by projectId
export const updatePP = async (req, res) => {
  const { projectId } = req.params;
  const updatedData = req.body;

  try {
    console.log(`Updating PublicPage for projectId: ${projectId}`);
    const publicPageData = await PublicPage.findOneAndUpdate(
      { projectId },
      { $set: updatedData },
      { new: true, upsert: true } // Return the updated document; create if it doesn't exist
    );

    res.status(200).json({ success: true, data: publicPageData });
    console.log(`Updated PublicPage for projectId: ${projectId}`);
  } catch (error) {
    console.error(`Error updating the PublicPage for projectId: ${projectId}`, error);
    res.status(500).json({ success: false, message: 'Error updating the PublicPage data.' });
  }
};

