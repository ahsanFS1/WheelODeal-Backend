import express from 'express';
import Prize from '../models/prizes.model.js'; // Adjust the path as per your structure

const router = express.Router();

router.post('/prizes', async (req, res) => {
  const { pageId, prizeName } = req.body;

  if (!pageId || !prizeName) {
    return res.status(400).json({ success: false, message: 'pageId and prizeName are required.' });
  }

  try {
    const prize = new Prize({ pageId, prizeName });
    await prize.save();

    res.status(201).json({ success: true, message: 'Prize saved successfully.' });
  } catch (error) {
    console.error('Error saving prize:', error);
    res.status(500).json({ success: false, message: 'Failed to save prize.' });
  }
});

router.get('/prizes/most-popular', async (req, res) => {
    const { pageId } = req.query;
  
    if (!pageId) {
      return res.status(400).json({ success: false, message: 'pageId is required.' });
    }
  
    try {
      const mostPopularPrize = await Prize.aggregate([
        { $match: { pageId } }, // Filter by pageId
        { $group: { _id: '$prizeName', count: { $sum: 1 } } }, // Group by prizeName
        { $sort: { count: -1 } }, // Sort by count descending
        { $limit: 1 }, // Take the top result
      ]);
  
      if (mostPopularPrize.length === 0) {
        return res.status(404).json({ success: false, message: 'No prizes found for this pageId.' });
      }
      
      res.status(200).json({ success: true, data: mostPopularPrize[0] });
    } catch (error) {
      console.error('Error fetching most popular prize:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch most popular prize.' });
    }
  });
  

export default router;
