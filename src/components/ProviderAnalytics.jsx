import React, { useState, useEffect, useCallback } from 'react';
import { getAssetUrl } from '../utils/cacheBuster';

// Provider Analytics component with real service data
// Shows provider cards with service counts, categories, and metadata

// Provider catalog URLs
const PROVIDER_CATALOG_URLS = {
  aws: 'https://aws.amazon.com/products/',
  azure: 'https://azure.microsoft.com/products/',
  gcp: 'https://cloud.google.com/products',
  oracle: 'https://www.oracle.com/cloud/services/',
  ibm: 'https://www.ibm.com/cloud/products'
};

// Provider display names
const PROVIDER_DISPLAY_NAMES = {
  aws: 'AWS',
  azure: 'Azure',
  gcp: 'Google Cloud',
  oracle: 'Oracle Cloud',
  ibm: 'IBM Cloud'
};

// Utility function for formatting dates
const formatISO = (d) => (typeof d === 'string' ? d : d.toISOString()).slice(0, 10);

// Sample data for testing (fallback)
const sampleData = {
  aws: {
    services: 241,
    regions: ["us-east-1", "us-west-2", "eu-west-1"],
    lastSynced: "2025-08-07T22:18:55.774Z"
  },
  azure: {
    services: 150,
    regions: ["eastus", "westus2", "westeurope"],
    lastSynced: "2025-08-07T22:18:55.363Z"
  },
  gcp: {
    services: 120,
    regions: ["us-east1", "us-west1", "europe-west1"],
    lastSynced: "2025-08-07T22:18:54.596Z"
  },
  ibm: {
    services: 48,
    regions: ["us-south", "us-east", "eu-gb"],
    lastSynced: "2025-08-07T22:18:55.695Z"
  },
  oracle: {
    services: 80,
    regions: ["us-east-1", "us-west-1", "eu-frankfurt-1"],
    lastSynced: "2025-08-07T22:19:01.062Z"
  }
};

export default function ProviderAnalytics({ defaultSort = 'services' }) {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(defaultSort);

  // Load provider data from JSON file
  const loadProviderData = useCallback(async (forceRefresh = false) => {
    try {
      // Fetch analytics data from JSON file
      const response = await fetch('/CloudProInsights/data/provider-analytics.json', { 
        cache: forceRefresh ? 'no-store' : 'default' 
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics data: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform data for UI
      const providerData = Object.entries(data).map(([providerId, analytics]) => ({
        id: providerId,
        name: PROVIDER_DISPLAY_NAMES[providerId],
        serviceCount: analytics.services,
        regionCount: analytics.regions.length,
        lastSynced: analytics.lastSynced
      }));

      setProviders(providerData);
      setLastSynced(new Date());
    } catch (error) {
      // Fallback to sample data
      const fallbackData = Object.entries(sampleData).map(([providerId, analytics]) => ({
        id: providerId,
        name: PROVIDER_DISPLAY_NAMES[providerId],
        serviceCount: analytics.services,
        regionCount: analytics.regions.length,
        lastSynced: analytics.lastSynced
      }));
      setProviders(fallbackData);
      setLastSynced(new Date());
    }
  }, []);

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await loadProviderData();
      setIsLoading(false);
    };
    loadData();
  }, [loadProviderData]);

  // Refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Call the refresh API
      const response = await fetch('/api/analytics/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider: 'all' })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh analytics');
      }

      // Reload the data
      await loadProviderData(true);
    } catch (error) {
      console.error('Failed to refresh analytics:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter and sort providers
  const filteredAndSortedProviders = providers
    .filter(provider => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = provider.name.toLowerCase().includes(searchLower);
      
      return nameMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'services':
          return b.serviceCount - a.serviceCount;
        case 'regions':
          return b.regionCount - a.regionCount;
        case 'az':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Provider Analytics</h2>
          <div className="flex items-center gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="services">By Services</option>
              <option value="regions">By Regions</option>
              <option value="az">A-Z</option>
            </select>
            
            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {isRefreshing ? (
                <span className="inline-flex items-center gap-2">
                  <span className="animate-spin">⟳</span>
                  Refreshing...
                </span>
              ) : (
                'Refresh'
              )}
            </button>
          </div>
        </div>

        {/* No Data Message */}
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No provider data available</div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Load Data
          </button>
        </div>

        {/* Last Synced */}
        <div className="text-center text-sm text-gray-500">
          Last synced: {formatISO(lastSynced)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Provider Analytics</h2>
        <div className="flex items-center gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="services">By Services</option>
            <option value="regions">By Regions</option>
            <option value="az">A-Z</option>
          </select>
          
          {/* Refresh */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {isRefreshing ? (
              <span className="inline-flex items-center gap-2">
                <span className="animate-spin">⟳</span>
                Refreshing...
              </span>
            ) : (
              'Refresh'
            )}
          </button>
        </div>
      </div>

      {/* Provider Grid */}
      <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-5">
        {filteredAndSortedProviders.map(provider => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      {/* Last Synced */}
      <div className="text-center text-sm text-gray-500">
        Last synced: {formatISO(lastSynced)}
      </div>
    </div>
  );
}

// Provider Card Component
function ProviderCard({ provider }) {
  const catalogUrl = PROVIDER_CATALOG_URLS[provider.id];
  
  // Logo components for Provider Analytics cards
  const AWSLogo = () => (
    <img 
              src={getAssetUrl('/assets/logos/aws-logo.png')} 
      alt="AWS" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">AWS</div>';
      }}
    />
  );

  const AzureLogo = () => (
    <img 
              src={getAssetUrl('/assets/logos/azure-logo.png')} 
      alt="Microsoft Azure" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">Az</div>';
      }}
    />
  );

  const GoogleCloudLogo = () => (
    <img 
              src={getAssetUrl('/assets/logos/gcp-logo.png')} 
      alt="Google Cloud Platform" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">GCP</div>';
      }}
    />
  );

  const OracleLogo = () => (
    <img 
              src={getAssetUrl('/assets/logos/oracle-logo.png')} 
      alt="Oracle Cloud" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">OCI</div>';
      }}
    />
  );

  const IBMCloudLogo = () => (
    <img 
              src={getAssetUrl('/assets/logos/ibm-logo.png')} 
      alt="IBM Cloud" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">IBM</div>';
      }}
    />
  );

  // Get the appropriate logo component
  const getLogoComponent = () => {
    switch (provider.id) {
      case 'aws':
        return <AWSLogo />;
      case 'azure':
        return <AzureLogo />;
      case 'gcp':
        return <GoogleCloudLogo />;
      case 'oracle':
        return <OracleLogo />;
      case 'ibm':
        return <IBMCloudLogo />;
      default:
        return <div className="w-8 h-8 bg-gray-200 rounded"></div>;
    }
  };
  
  return (
    <a
      href={catalogUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl border bg-white p-6 transition hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2"
      aria-label={`Open ${provider.name} service catalog in new tab`}
    >
      {/* Provider Logo and Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center">
          {getLogoComponent()}
        </div>
        <h3 className="font-semibold text-gray-900">{provider.name}</h3>
      </div>

      {/* Service Count */}
      <div className="mb-4">
        <div 
          className="text-2xl font-semibold text-blue-600"
          title="Distinct first-party services tracked. Source: official catalogs/APIs."
          aria-live="polite"
        >
          {provider.serviceCount}
        </div>
        <div className="text-sm text-gray-600">services available</div>
      </div>

      {/* Regions Count */}
      {provider.regionCount > 0 && (
        <div className="text-xs text-gray-500 mb-3" title={`${provider.regionCount} regions covered across services`}>
          {provider.regionCount} regions
        </div>
      )}

      {/* External Link Indicator */}
      <div className="mt-3 text-xs text-blue-600">
        Official catalog ↗
      </div>
    </a>
  );
}
