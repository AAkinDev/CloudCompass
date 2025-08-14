import { ProviderFacts } from '@/types/provider';

export const providerFacts: ProviderFacts[] = [
  {
    id: 'aws',
    priceIndex: 0.85, // Lower = cheaper
    perfIndex: 0.95,
    serverlessMaturity: 0.95,
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'FedRAMP', 'SOC', 'ISO'],
    regions: [], // Will be populated from analytics
    catalogs: {
      docs: 'https://docs.aws.amazon.com/',
      pricing: 'https://aws.amazon.com/pricing/'
    }
  },
  {
    id: 'azure',
    priceIndex: 0.90,
    perfIndex: 0.90,
    serverlessMaturity: 0.85,
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'FedRAMP', 'SOC', 'ISO'],
    regions: [], // Will be populated from analytics
    catalogs: {
      docs: 'https://docs.microsoft.com/en-us/azure/',
      pricing: 'https://azure.microsoft.com/en-us/pricing/'
    }
  },
  {
    id: 'gcp',
    priceIndex: 0.80, // Most competitive pricing
    perfIndex: 0.92,
    serverlessMaturity: 0.90,
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'FedRAMP', 'SOC', 'ISO'],
    regions: [], // Will be populated from analytics
    catalogs: {
      docs: 'https://cloud.google.com/docs',
      pricing: 'https://cloud.google.com/pricing'
    }
  },
  {
    id: 'oracle',
    priceIndex: 0.95, // Higher pricing
    perfIndex: 0.88,
    serverlessMaturity: 0.75,
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'FedRAMP', 'SOC', 'ISO'],
    regions: [], // Will be populated from analytics
    catalogs: {
      docs: 'https://docs.oracle.com/en-us/iaas/',
      pricing: 'https://www.oracle.com/cloud/cost-estimator.html'
    }
  },
  {
    id: 'ibm',
    priceIndex: 0.92,
    perfIndex: 0.85,
    serverlessMaturity: 0.80,
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'FedRAMP', 'SOC', 'ISO'],
    regions: [], // Will be populated from analytics
    catalogs: {
      docs: 'https://cloud.ibm.com/docs',
      pricing: 'https://www.ibm.com/cloud/pricing'
    }
  }
];
