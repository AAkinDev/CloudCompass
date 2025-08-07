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
    let nextLink = 'https://prices.azure.com/api/retail/prices?$select=serviceName,armRegionName';

    // Handle pagination
    while (nextLink) {
      const data = await fetchJSON(nextLink);
      
      data.Items?.forEach((item) => {
        if (item.serviceName) services.add(item.serviceName);
        if (item.armRegionName) regions.add(normalizeRegion(item.armRegionName));
      });

      nextLink = data.NextPageLink || '';
    }

    return pack(services.size, Array.from(regions));
  } catch (error) {
    return pack(0, []);
  }
}

// GCP Analytics
async function gcpAnalytics(apiKey) {
  if (!apiKey) {
    return pack(0, []);
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
    // Fetch products from Oracle API
    const productsData = await fetchJSON('https://apexapps.oracle.com/pls/apex/cetools/api/v1/products/');
    
    const services = new Set();
    productsData.items?.forEach((product) => {
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
    return pack(0, []);
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
