import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

class GoogleAnalyticsClient {
  constructor() {
    const rawPrivateKey = process.env.GA_PRIVATE_KEY;

    if (!rawPrivateKey || typeof rawPrivateKey !== 'string') {
      throw new Error('GA_PRIVATE_KEY is not set or is not a valid string.');
    }

    const formattedPrivateKey = rawPrivateKey.includes('\\n')
      ? rawPrivateKey.replace(/\\n/g, '\n')
      : rawPrivateKey;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: formattedPrivateKey,
        project_id: process.env.GA_PROJECT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    this.analyticsdata = google.analyticsdata({
      version: 'v1beta',
      auth,
    });

    console.log('GoogleAnalyticsClient initialized successfully');

    // Validate credentials
    auth.getClient()
      .then(() => console.log('API Credentials are valid'))
      .catch((error) => console.error('Invalid API Credentials:', error.message));
  }

  // Utility function to extract metric values
  getMetricValue(rows, eventName, metricIndex = 0) {
    const row = rows.find((r) => r.dimensionValues?.[1]?.value === eventName);
    return row?.metricValues?.[metricIndex]?.value || '0';
  }

  async getMetrics(pageId, startDate, endDate) {
    try {
      const property = `properties/${process.env.GA_PROPERTY_ID}`;
      console.log(`Fetching metrics for property: ${property}, pageId: ${pageId}, startDate: ${startDate}, endDate: ${endDate}`);

      const response = await this.analyticsdata.properties.runReport({
        property,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          metrics: [
            { name: 'activeUsers' },
            { name: 'eventCount' },
            { name: 'screenPageViews' },
          ],
          dimensions: [
            { name: 'date' }, // Include date for time-series data
            { name: 'eventName' },
            { name: 'pagePath' },
          ],
          dimensionFilter: {
            filter: {
              fieldName: 'pagePath',
              stringFilter: {
                value: `/wheel/${pageId}`,
              },
            },
          },
        },
      });

      console.log('API Response:', JSON.stringify(response.data, null, 2));

      const rows = response.data.rows || [];
      if (rows.length === 0) {
        console.warn('No data returned for the query. Verify filters and event processing.');
      }

      // Build time-series history
      const history = rows.reduce(
        (acc, row) => {
          const date = row.dimensionValues?.[0]?.value; // Date as YYYYMMDD
          const eventName = row.dimensionValues?.[1]?.value;
          const value = parseInt(row.metricValues?.[1]?.value || '0', 10);

          if (date) {
            if (!acc.labels.includes(date)) {
              acc.labels.push(date);
              acc.visitors.push(0);
              acc.spins.push(0);
              acc.conversions.push(0);
            }

            const index = acc.labels.indexOf(date);
            if (eventName === 'page_loaded') acc.visitors[index] += value;
            if (eventName === 'spin_completed') acc.spins[index] += value;
            if (eventName === 'prize_claimed') acc.conversions[index] += value;
          }
          return acc;
        },
        { labels: [], visitors: [], spins: [], conversions: [] }
      );

      // Sort history by ascending dates
      const sortedHistory = history.labels
        .map((label, index) => ({
          label,
          visitors: history.visitors[index],
          spins: history.spins[index],
          conversions: history.conversions[index],
        }))
        .sort((a, b) => a.label.localeCompare(b.label)); // Sort by date

      // Rebuild history arrays
      history.labels = sortedHistory.map((item) => item.label);
      history.visitors = sortedHistory.map((item) => item.visitors);
      history.spins = sortedHistory.map((item) => item.spins);
      history.conversions = sortedHistory.map((item) => item.conversions);

      // Sum all "page_loaded" events for pageVisited
      const pageViews = rows
        .filter((row) => row.dimensionValues?.[1]?.value === 'page_loaded')
        .reduce((sum, row) => sum + parseInt(row.metricValues?.[1]?.value || '0', 10), 0);

      // Parse aggregated metrics
      const metrics = {
        visitors: parseInt(this.getMetricValue(rows, 'page_loaded')),
        spins: parseInt(this.getMetricValue(rows, 'spin_completed')),
        conversions: parseInt(this.getMetricValue(rows, 'prize_claimed')),
        pageVisited: pageViews,
        spinConversionRate:
        ( (parseInt(this.getMetricValue(rows, 'prize_claimed'))) /
            (parseInt(this.getMetricValue(rows, 'spin_completed')) )) *
          100 ,
      };

      console.log('Parsed Metrics:', metrics);
      console.log('Parsed History:', history);

      return { metrics, history };
    } catch (error) {
      console.error('Error fetching GA4 metrics:', error.response?.data || error.message);
      return { metrics: {}, history: { labels: [], visitors: [], spins: [], conversions: [] } };
    }
  }
}

export default GoogleAnalyticsClient;
