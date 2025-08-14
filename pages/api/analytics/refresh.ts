import type { NextApiRequest, NextApiResponse } from 'next';
import { refreshAnalytics } from '../../../scripts/refreshProviderAnalytics';

// Simple in-memory mutex to avoid concurrent runs
let isRefreshing = false;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if already refreshing
  if (isRefreshing) {
    return res.status(429).json({ error: 'Refresh already in progress' });
  }

  try {
    isRefreshing = true;
    
    // Check for GCP API key if GCP is requested
    const { provider } = req.body;
    if (provider === 'gcp' && !process.env.GCP_API_KEY) {
      return res.status(401).json({ error: 'GCP API key required for GCP analytics' });
    }

    const data = await refreshAnalytics();
    
    res.status(200).json({
      success: true,
      data,
      message: 'Analytics refreshed successfully'
    });
  } catch (error) {
    console.error('API refresh failed:', error);
    res.status(500).json({
      error: 'Failed to refresh analytics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    isRefreshing = false;
  }
}


