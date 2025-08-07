// Helper functions
const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.json();
};

const pack = (servicesCount, regions) => ({
  services: servicesCount,
  regions: [...new Set(regions)].sort(),
  lastSynced: new Date().toISOString()
});

// Normalize region names to avoid duplicates
const normalizeRegion = (region) => {
  return region.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
};

// AWS Analytics
async function awsAnalytics() {
  try {
    // Fetch services from pricing API
    const pricingData = await fetchJSON('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json');
    const services = new Set();
    
    // Extract service names from offers
    Object.keys(pricingData.offers || {}).forEach(serviceName => {
      services.add(serviceName);
    });

    // Fetch regions from EC2 pricing
    const regionData = await fetchJSON('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/region_index.json');
    const regions = Object.keys(regionData.regions || {}).map(normalizeRegion);

    return pack(services.size, regions);
  } catch (error) {
    return pack(0, []);
  }
}

// Azure Analytics
async function azureAnalytics() {
  try {
    const services = new Set();
    const regions = new Set();
    
    // Use a simpler approach - fetch from Azure's product catalog
    const data = await fetchJSON('https://azure.microsoft.com/api/catalog/products');
    
    data.products?.forEach((product) => {
      if (product.name) services.add(product.name);
      if (product.regions) {
        product.regions.forEach((region) => {
          regions.add(normalizeRegion(region));
        });
      }
    });

    return pack(services.size, Array.from(regions));
  } catch (error) {
    // Fallback to known Azure services and regions
    const fallbackServices = [
      'Virtual Machines', 'App Service', 'Azure Functions', 'Azure Kubernetes Service',
      'Azure SQL Database', 'Cosmos DB', 'Storage Account', 'Azure DevOps',
      'Azure Active Directory', 'Azure Monitor', 'Application Insights', 'Log Analytics',
      'Azure Backup', 'Azure Site Recovery', 'Azure CDN', 'Azure Load Balancer',
      'Azure Application Gateway', 'Azure Firewall', 'Azure VPN Gateway', 'ExpressRoute'
    ];
    const fallbackRegions = [
      'eastus', 'westus2', 'westeurope', 'northeurope', 'southeastasia', 'eastasia',
      'centralus', 'southcentralus', 'northcentralus', 'canadacentral', 'canadaeast',
      'brazilsouth', 'australiaeast', 'australiasoutheast', 'japaneast', 'japanwest',
      'koreacentral', 'koreasouth', 'southafricanorth', 'uaenorth', 'uksouth', 'ukwest'
    ];
    return pack(fallbackServices.length, fallbackRegions.map(normalizeRegion));
  }
}

// GCP Analytics
async function gcpAnalytics(apiKey) {
  if (!apiKey) {
    // Fallback to known GCP services and regions
    const fallbackServices = [
      'Compute Engine', 'App Engine', 'Cloud Functions', 'Cloud Run', 'Kubernetes Engine',
      'Cloud Storage', 'Cloud SQL', 'Firestore', 'BigQuery', 'Pub/Sub',
      'Cloud Build', 'Cloud Deploy', 'Cloud Monitoring', 'Cloud Logging',
      'Cloud Trace', 'Cloud Profiler', 'Error Reporting', 'Cloud Debugger',
      'Cloud Tasks', 'Cloud Scheduler', 'Cloud Vision', 'Cloud Speech',
      'Cloud Translation', 'Cloud Natural Language', 'Cloud Video Intelligence',
      'Cloud AutoML', 'Vertex AI', 'Cloud Dataflow', 'Cloud Dataproc',
      'Cloud Composer', 'Cloud Data Fusion', 'Cloud Dataprep', 'Cloud Data Catalog'
    ];
    const fallbackRegions = [
      'us-east1', 'us-west1', 'us-central1', 'europe-west1', 'europe-west2',
      'europe-west3', 'europe-west4', 'europe-west6', 'europe-north1',
      'asia-east1', 'asia-southeast1', 'asia-southeast2', 'asia-northeast1',
      'asia-northeast2', 'australia-southeast1', 'southamerica-east1'
    ];
    return pack(fallbackServices.length, fallbackRegions.map(normalizeRegion));
  }

  try {
    const services = new Set();
    const regions = new Set();

    // Fetch services
    const servicesResponse = await fetchJSON(`https://cloudbilling.googleapis.com/v1/services?key=${apiKey}`);
    
    for (const service of servicesResponse.services || []) {
      services.add(service.serviceId);
      
      // Fetch SKUs for each service to get regions
      try {
        const skusResponse = await fetchJSON(`https://cloudbilling.googleapis.com/v1/${service.serviceId}/skus?key=${apiKey}`);
        
        skusResponse.skus?.forEach((sku) => {
          sku.geoTaxonomy?.regions?.forEach((region) => {
            regions.add(normalizeRegion(region));
          });
        });
              } catch (skuError) {
          // Continue with other services if SKU fetch fails
        }
    }

    return pack(services.size, Array.from(regions));
  } catch (error) {
    return pack(0, []);
  }
}

// IBM Cloud Analytics
async function ibmAnalytics() {
  try {
    const data = await fetchJSON('https://globalcatalog.cloud.ibm.com/api/v1?include=deployment&complete=true&limit=1000');
    
    const services = new Set();
    const regions = new Set();

    data.resources?.forEach((resource) => {
      if (resource.name) services.add(resource.name);
      
      // Extract regions from deployment info
      resource.deployment?.locations?.forEach((location) => {
        if (location.name) regions.add(normalizeRegion(location.name));
      });
    });

    return pack(services.size, Array.from(regions));
  } catch (error) {
    return pack(0, []);
  }
}

// Oracle Analytics
async function oracleAnalytics() {
  try {
    // Try Oracle's product catalog
    const productsData = await fetchJSON('https://www.oracle.com/cloud/products.json');
    
    const services = new Set();
    productsData.products?.forEach((product) => {
      if (product.name) services.add(product.name);
    });

    // For regions, we'll use a fallback list since the API doesn't provide region info
    // In a real implementation, this would be replaced with Identity ListRegions API
    const fallbackRegions = [
      'us-east-1', 'us-west-1', 'us-west-2', 'eu-frankfurt-1', 'eu-zurich-1',
      'uk-london-1', 'ap-singapore-1', 'ap-tokyo-1', 'ap-seoul-1', 'ap-mumbai-1'
    ];

    return pack(services.size, fallbackRegions.map(normalizeRegion));
  } catch (error) {
    // Fallback to known Oracle services and regions
    const fallbackServices = [
      'Compute', 'Storage', 'Database', 'Networking', 'Security', 'Analytics',
      'Integration', 'Developer Tools', 'Management', 'Migration', 'AI/ML',
      'Blockchain', 'Chatbots', 'Content Management', 'Data Integration',
      'Identity and Access Management', 'Load Balancing', 'Monitoring', 'VPN'
    ];
    const fallbackRegions = [
      'us-east-1', 'us-west-1', 'us-west-2', 'eu-frankfurt-1', 'eu-zurich-1',
      'uk-london-1', 'ap-singapore-1', 'ap-tokyo-1', 'ap-seoul-1', 'ap-mumbai-1'
    ];
    return pack(fallbackServices.length, fallbackRegions.map(normalizeRegion));
  }
}

// Main function to get all analytics
export async function getAnalytics() {
  const [aws, azure, gcp, ibm, oracle] = await Promise.all([
    awsAnalytics(),
    azureAnalytics(),
    gcpAnalytics(process.env.GCP_API_KEY),
    ibmAnalytics(),
    oracleAnalytics()
  ]);

  return { aws, azure, gcp, ibm, oracle };
}
