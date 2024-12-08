import MLP from '../models/mlPage.model.js';




export const getMLP =  async (req, res) => {
    
    
    const initializeDefaultConfig = async () => {
        try {
          const existingConfig = await MLP.findOne();
          if (!existingConfig) {
            await MLP.create({}); // Create an empty MLP with default values
            console.log('Default configuration initialized.');
          } else {
            console.log('Default configuration already exists.');
          }
        } catch (err) {
          console.error('Error initializing default configuration:', err.message);
        }
      };

    
    
    
    
    try {
        console.log('Fetching MLP');
      
      initializeDefaultConfig();
      const mlP = await MLP.findOne(); // Fetch the main landing page configuration
      res.status(200).json({ success: true, data: mlP });
      

      
    } catch (error) {
      console.error("Error fetching the Main Landing Page", error);
      res.status(500).json({ success: false, message: "Error fetching the main landing page data." });
    }

 


};

export const updateMLP =  async (req, res) => {
    try {
      const updates = req.body;
  
      // Fetch the existing document
      const mlP = await MLP.findOne();
      if (!mlP) {
        return res.status(404).json({ success: false, message: 'Main landing page configuration not found.' });
      }
  
      // Apply updates to the MLP document
      Object.keys(updates).forEach((key) => {
        if (mlP[key] !== undefined) {
          mlP[key] = updates[key];
        }
      });
  
      // Save the updated document
      await mlP.save();
  
      res.status(200).json({ success: true, message: 'Landing page updated successfully.', data: updates });
    } catch (error) {
      console.error('Error updating landing page:', error);
      res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
  }