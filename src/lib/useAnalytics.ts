import { useState, useEffect, useCallback } from 'react';

export type AnalyticsMap = {
  aws: { services: number; regions: string[]; lastSynced: string };
  azure: { services: number; regions: string[]; lastSynced: string };
  gcp: { services: number; regions: string[]; lastSynced: string };
  oracle: { services: number; regions: string[]; lastSynced: string };
  ibm: { services: number; regions: string[]; lastSynced: string };
};

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsMap | null>(null);
  const [lastSynced, setLastSynced] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/CloudProInsights/data/provider-analytics.json', {
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
      const response = await fetch('/api/analytics/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh analytics');
      }
      
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
