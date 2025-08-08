// Provider facts data with realistic values for all cloud providers

export const providerFacts: ProviderFacts[] = [
  {
    id: 'aws',
    priceIndex: 0.4, // Competitive pricing
    perfIndex: 0.9, // Excellent performance
    serverlessMaturity: 0.95, // Most mature serverless ecosystem
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'FedRAMP', 'SOC 1/2/3', 'ISO 27001'],
    catalogs: {
      docs: 'https://aws.amazon.com/documentation/',
      pricing: 'https://aws.amazon.com/pricing/'
    }
  },
  {
    id: 'azure',
    priceIndex: 0.5, // Slightly higher than AWS
    perfIndex: 0.85, // Very good performance
    serverlessMaturity: 0.8, // Good serverless maturity
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'FedRAMP', 'SOC 1/2/3', 'ISO 27001'],
    catalogs: {
      docs: 'https://docs.microsoft.com/azure/',
      pricing: 'https://azure.microsoft.com/en-us/pricing/'
    }
  },
  {
    id: 'gcp',
    priceIndex: 0.45, // Competitive with AWS
    perfIndex: 0.9, // Excellent performance
    serverlessMaturity: 0.85, // Very mature serverless
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'SOC 1/2/3', 'ISO 27001'],
    catalogs: {
      docs: 'https://cloud.google.com/docs',
      pricing: 'https://cloud.google.com/pricing'
    }
  },
  {
    id: 'oracle',
    priceIndex: 0.35, // Often cheaper than others
    perfIndex: 0.75, // Good performance
    serverlessMaturity: 0.6, // Developing serverless
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'SOC 1/2/3', 'ISO 27001'],
    catalogs: {
      docs: 'https://docs.oracle.com/en-us/iaas/Content/home.htm',
      pricing: 'https://www.oracle.com/cloud/cost-estimator.html'
    }
  },
  {
    id: 'ibm',
    priceIndex: 0.6, // Higher pricing
    perfIndex: 0.7, // Good performance
    serverlessMaturity: 0.7, // Moderate serverless maturity
    gpuSupport: true,
    managedRdbms: true,
    managedNosql: true,
    compliance: ['HIPAA', 'PCI', 'GDPR', 'SOC 1/2/3', 'ISO 27001'],
    catalogs: {
      docs: 'https://cloud.ibm.com/docs',
      pricing: 'https://www.ibm.com/cloud/pricing'
    }
  }
];
