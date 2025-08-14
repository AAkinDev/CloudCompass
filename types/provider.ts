export type ProviderId = 'aws' | 'azure' | 'gcp' | 'oracle' | 'ibm';

export type ProviderAnalytics = {
  services: number;           // distinct first-party services
  regions: string[];          // normalized region codes/names
  lastSynced: string;         // ISO timestamp
};

export type AnalyticsMap = Record<ProviderId, ProviderAnalytics>;


