import { useState, useEffect, useCallback } from 'react';
import { AnalyticsMap } from '@/types/provider';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsMap | null>(null);
  const [lastSynced, setLastSynced] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get the correct base path
  const getBasePath = () => {
    // Check if we're on GitHub Pages (has /CloudProInsights/ in the path)
    if (typeof window !== 'undefined' && window.location.pathname.includes('/CloudProInsights/')) {
      return '/CloudProInsights';
    }
    return '';
  };

  const fetchAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Only fetch if we're in the browser
      if (typeof window === 'undefined') {
        return;
      }
      
      const basePath = getBasePath();
      console.log('Fetching analytics from:', `${basePath}/data/provider-analytics.json`);
      
      const response = await fetch(`${basePath}/data/provider-analytics.json`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.status}`);
      }
      
      const data: AnalyticsMap = await response.json();
      console.log('Analytics data loaded:', data);
      setAnalytics(data);
      
      // Calculate the earliest lastSynced timestamp
      const timestamps = Object.values(data).map(provider => new Date(provider.lastSynced));
      const earliest = new Date(Math.min(...timestamps.map(t => t.getTime())));
      setLastSynced(earliest.toISOString());
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      // For GitHub Pages, we can't call the API, so we'll just refetch the data
      // This provides a better user experience than showing an error
      await fetchAnalytics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh analytics');
    }
  }, [fetchAnalytics]);

  useEffect(() => {
    // Only run the effect in the browser
    if (typeof window !== 'undefined') {
      fetchAnalytics();
    }
  }, [fetchAnalytics]);

  return {
    analytics,
    lastSynced,
    isLoading,
    error,
    refresh
  };
};


