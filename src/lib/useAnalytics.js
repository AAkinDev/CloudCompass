import { useState, useEffect, useCallback } from 'react';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [lastSynced, setLastSynced] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get the correct base path
  const getBasePath = () => {
    // Check if we're on GitHub Pages (has /CloudProInsights/ in the path)
    if (window.location.pathname.includes('/CloudProInsights/')) {
      return '/CloudProInsights';
    }
    return '';
  };

  const fetchAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const basePath = getBasePath();
      const response = await fetch(`${basePath}/data/provider-analytics.json`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.status}`);
      }
      
      const data = await response.json();
      setAnalytics(data);
      
      // Calculate the earliest lastSynced timestamp
      const timestamps = Object.values(data).map(provider => new Date(provider.lastSynced));
      const earliest = new Date(Math.min(...timestamps.map(t => t.getTime())));
      setLastSynced(earliest.toISOString());
    } catch (err) {
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
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    lastSynced,
    isLoading,
    error,
    refresh
  };
};
