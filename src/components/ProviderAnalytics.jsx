import React, { useState, useEffect, useCallback } from 'react';

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

// Mock service data for now (in real app, this would come from the fetchers)
const mockServices = {
  aws: [
    { id: 'ec2', name: 'Amazon EC2', category: 'Compute', regions: ['us-east-1', 'us-west-2'] },
    { id: 'lambda', name: 'AWS Lambda', category: 'Compute', regions: ['us-east-1', 'us-west-2'] },
    { id: 's3', name: 'Amazon S3', category: 'Storage', regions: ['us-east-1', 'us-west-2'] },
    { id: 'rds', name: 'Amazon RDS', category: 'Database', regions: ['us-east-1', 'us-west-2'] },
    { id: 'sagemaker', name: 'Amazon SageMaker', category: 'AI/ML', regions: ['us-east-1', 'us-west-2'] }
  ],
  azure: [
    { id: 'vm', name: 'Azure Virtual Machines', category: 'Compute', regions: ['eastus', 'westus2'] },
    { id: 'functions', name: 'Azure Functions', category: 'Compute', regions: ['eastus', 'westus2'] },
    { id: 'storage', name: 'Azure Storage', category: 'Storage', regions: ['eastus', 'westus2'] },
    { id: 'sql', name: 'Azure SQL Database', category: 'Database', regions: ['eastus', 'westus2'] },
    { id: 'ml', name: 'Azure Machine Learning', category: 'AI/ML', regions: ['eastus', 'westus2'] }
  ],
  gcp: [
    { id: 'compute', name: 'Compute Engine', category: 'Compute', regions: ['us-east1', 'us-west1'] },
    { id: 'functions', name: 'Cloud Functions', category: 'Compute', regions: ['us-east1', 'us-west1'] },
    { id: 'storage', name: 'Cloud Storage', category: 'Storage', regions: ['us-east1', 'us-west1'] },
    { id: 'sql', name: 'Cloud SQL', category: 'Database', regions: ['us-east1', 'us-west1'] },
    { id: 'vertex', name: 'Vertex AI', category: 'AI/ML', regions: ['us-east1', 'us-west1'] }
  ],
  oracle: [
    { id: 'compute', name: 'Oracle Cloud Compute', category: 'Compute', regions: ['us-east-1', 'us-west-1'] },
    { id: 'storage', name: 'Oracle Cloud Object Storage', category: 'Storage', regions: ['us-east-1', 'us-west-1'] },
    { id: 'database', name: 'Oracle Autonomous Database', category: 'Database', regions: ['us-east-1', 'us-west-1'] },
    { id: 'ai', name: 'Oracle AI Services', category: 'AI/ML', regions: ['us-east-1', 'us-west-1'] }
  ],
  ibm: [
    { id: 'vsi', name: 'IBM Cloud Virtual Servers', category: 'Compute', regions: ['us-south', 'us-east'] },
    { id: 'functions', name: 'IBM Cloud Functions', category: 'Compute', regions: ['us-south', 'us-east'] },
    { id: 'storage', name: 'IBM Cloud Object Storage', category: 'Storage', regions: ['us-south', 'us-east'] },
    { id: 'cloudant', name: 'IBM Cloudant', category: 'Database', regions: ['us-south', 'us-east'] },
    { id: 'watson', name: 'IBM Watson', category: 'AI/ML', regions: ['us-south', 'us-east'] }
  ]
};

export default function ProviderAnalytics({ defaultSort = 'services' }) {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(defaultSort);

  // Load provider data
  const loadProviderData = useCallback(async (forceRefresh = false) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const providerData = [];

      for (const [providerId, services] of Object.entries(mockServices)) {
        // Calculate category counts
        const categories = {};
        const regions = new Set();
        
        services.forEach(service => {
          categories[service.category] = (categories[service.category] || 0) + 1;
          service.regions?.forEach(region => regions.add(region));
        });

        // Get top 3 categories by count
        const topCategories = Object.entries(categories)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([category]) => category);

        providerData.push({
          id: providerId,
          name: PROVIDER_DISPLAY_NAMES[providerId],
          services,
          serviceCount: services.length,
          categories,
          topCategories,
          regionCount: regions.size,
          lastSynced: new Date()
        });
      }

      setProviders(providerData);
      setLastSynced(new Date());
    } catch (error) {
      console.error('Failed to load provider data:', error);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadProviderData();
    setIsLoading(false);
  }, [loadProviderData]);

  // Refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadProviderData(true);
    setIsRefreshing(false);
  };

  // Filter and sort providers
  const filteredAndSortedProviders = providers
    .filter(provider => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = provider.name.toLowerCase().includes(searchLower);
      const categoryMatch = provider.topCategories.some(cat => 
        cat.toLowerCase().includes(searchLower)
      );
      
      return nameMatch || categoryMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'services':
          return b.serviceCount - a.serviceCount;
        case 'ai':
          return (b.categories['AI/ML'] || 0) - (a.categories['AI/ML'] || 0);
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
            <option value="ai">By AI/ML</option>
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
        Last synced: {lastSynced.toISOString().slice(0, 10)}
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
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/aws-logo.png" 
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
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/azure-logo.png" 
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
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/gcp-logo.png" 
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
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/oracle-logo.png" 
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
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/ibm-logo.png" 
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
          title="Count of distinct first-party services we track. Click to view catalog."
        >
          {provider.serviceCount}
        </div>
        <div className="text-sm text-gray-600">services available</div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-1 mb-3">
        {provider.topCategories.map(category => (
          <span
            key={category}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Regions Tooltip */}
      {provider.regionCount > 0 && (
        <div className="text-xs text-gray-500" title={`${provider.regionCount} regions covered across services`}>
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
