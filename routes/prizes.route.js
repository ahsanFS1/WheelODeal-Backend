import express from 'express';
import Prize from '../models/prizes.model.js';

const router = express.Router();

router.post('/prizes', async (req, res) => {
  const { pageId, prizeName } = req.body;

  if (!pageId || !prizeName) {
    return res.status(400).json({ success: false, message: 'pageId and prizeName are required.' });
  }

  try {
    // Use findOneAndUpdate with upsert to prevent duplicates
    const prize = await Prize.findOneAndUpdate(
      { pageId, prizeName },
      {
        $setOnInsert: { pageId, prizeName },
        $inc: { prizesRevealed: 1 }
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    res.status(201).json({
      success: true,
      message: 'Prize saved successfully.',
      data: prize
    });
  } catch (error) {
    console.error('Error saving prize:', error);
    res.status(500).json({ success: false, message: 'Failed to save prize.' });
  }
});

router.post('/prizes/claim', async (req, res) => {
  const { pageId, prizeName } = req.body;

  if (!pageId || !prizeName) {
    return res.status(400).json({ success: false, message: 'pageId and prizeName are required.' });
  }

  try {
    const prize = await Prize.findOneAndUpdate(
      { pageId, prizeName },
      { $inc: { prizesClaimed: 1 } },
      {
        new: true, // Return the updated document
        upsert: false // Do not create a new document if it doesn't exist
      }
    );

    if (!prize) {
      return res.status(404).json({
        success: false,
        message: 'Prize not found. Please save the prize first before claiming.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Prize claimed successfully.',
      data: prize
    });
  } catch (error) {
    console.error('Error claiming prize:', error);
    res.status(500).json({ success: false, message: 'Failed to claim prize.' });
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
      { $group: {
        _id: '$prizeName',
        revealedCount: { $sum: '$prizesRevealed' },
        claimedCount: { $sum: '$prizesClaimed' }
      } }, // Group by prizeName
      { $sort: { revealedCount: -1 } }, // Sort by revealed count descending
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

router.get('/prizes/top-5', async (req, res) => {
  const { pageId } = req.query;

  if (!pageId) {
    return res.status(400).json({ success: false, message: 'pageId is required.' });
  }

  try {
    const topPrizes = await Prize.aggregate([
      { $match: { pageId } },
      { $group: {
        _id: '$prizeName',
        revealed: { $sum: '$prizesRevealed' },
        claimed: { $sum: '$prizesClaimed' }
      }},
      { $project: {
        name: '$_id',
        revealed: '$revealed',
        claimed: '$claimed',
        redemptionRate: { $cond: [{ $gt: ['$revealed', 0] }, { $divide: ['$claimed', '$revealed'] }, 0] }
      }},
      { $sort: { revealed: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({ success: true, data: topPrizes });
  } catch (error) {
    console.error('Error fetching top prizes:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch top prizes.' });
  }
});

export default router;