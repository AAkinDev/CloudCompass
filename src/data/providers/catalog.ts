// Provider service catalog data layer
// Defines types and service data for cloud provider analytics

export type ServiceCategory = 'Compute' | 'Storage' | 'Database' | 'Networking' | 'AI/ML' | 'Security' | 'DevTools' | 'Analytics' | 'Other';

export type ServiceStatus = 'GA' | 'Preview' | 'Beta' | 'Deprecated';

export type Service = {
  id: string;             // stable slug
  name: string;
  category: ServiceCategory;
  regions?: string[];     // e.g., ['us-east-1','europe-west1']
  status?: ServiceStatus;
  docsUrl: string;
  pricingUrl?: string;
};

export type ProviderId = 'aws' | 'azure' | 'gcp' | 'oracle' | 'ibm';

export type ProviderCatalog = Record<ProviderId, Service[]>;

// Provider service catalog URLs
export const PROVIDER_CATALOG_URLS = {
  aws: 'https://aws.amazon.com/products/',
  azure: 'https://azure.microsoft.com/products/',
  gcp: 'https://cloud.google.com/products',
  oracle: 'https://www.oracle.com/cloud/services/',
  ibm: 'https://www.ibm.com/cloud/products'
} as const;

// Provider display names
export const PROVIDER_DISPLAY_NAMES = {
  aws: 'AWS',
  azure: 'Azure',
  gcp: 'Google Cloud',
  oracle: 'Oracle Cloud',
  ibm: 'IBM Cloud'
} as const;
