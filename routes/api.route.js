import express from 'express';
import GoogleAnalyticsClient from '../googleAnalytics.js';

const router = express.Router();
const gaClient = new GoogleAnalyticsClient();

// Fetch analytics data
router.get('/analytics', async (req, res) => {
  const { pageId, startDate, endDate } = req.query;
  console.log(`Received request for analytics: pageId=${pageId}, startDate=${startDate}, endDate=${endDate}`);

  if (!pageId || !startDate || !endDate) {
    console.warn('Missing parameters in analytics request');
    return res.status(400).json({ success: false, message: 'Missing parameters.' });
  }

  try {
    const metrics = await gaClient.getMetrics(pageId, startDate, endDate);
    console.log(`Analytics metrics retrieved successfully: ${JSON.stringify(metrics)}`);
    res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ success: false, message: 'Error fetching analytics.' });
  }
});

export default router;