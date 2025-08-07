// Official Pricing References and Disclaimers
// Links to official pricing pages and important disclaimers for each cloud provider

export const pricingReferences = {
  aws: {
    name: "Amazon Web Services (AWS)",
    officialPricing: "https://aws.amazon.com/pricing/",
    calculator: "https://calculator.aws/",
    disclaimer: "AWS pricing varies by region, instance type, and usage patterns. Reserved Instances and Savings Plans can reduce costs by up to 72%. Spot Instances offer up to 90% savings but may be interrupted.",
    freeTier: "https://aws.amazon.com/free/",
    regions: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
    pricingNotes: [
      "Prices shown are for US East (N. Virginia) region",
      "On-Demand pricing - no upfront commitment required",
      "Reserved Instances offer 1-3 year commitments with significant discounts",
      "Spot Instances provide up to 90% savings but can be terminated",
      "Data transfer pricing varies by region and volume"
    ]
  },
  
  azure: {
    name: "Microsoft Azure",
    officialPricing: "https://azure.microsoft.com/en-us/pricing/",
    calculator: "https://azure.microsoft.com/en-us/pricing/calculator/",
    disclaimer: "Azure pricing varies by region and currency. Enterprise Agreement customers receive additional discounts. Hybrid Benefit can reduce costs by up to 55% for existing licenses.",
    freeTier: "https://azure.microsoft.com/en-us/free/",
    regions: "https://azure.microsoft.com/en-us/global-infrastructure/regions/",
    pricingNotes: [
      "Prices shown are for East US region",
      "Pay-as-you-go pricing with no upfront commitment",
      "Reserved Instances offer 1-3 year commitments with discounts up to 72%",
      "Azure Hybrid Benefit can reduce costs for existing Windows Server/SQL Server licenses",
      "Spot instances available for up to 90% savings with potential interruptions"
    ]
  },
  
  gcp: {
    name: "Google Cloud Platform",
    officialPricing: "https://cloud.google.com/pricing",
    calculator: "https://cloud.google.com/products/calculator",
    disclaimer: "GCP pricing varies by region and currency. Committed Use Discounts can reduce costs by up to 55%. Preemptible instances offer up to 80% savings but may be terminated.",
    freeTier: "https://cloud.google.com/free",
    regions: "https://cloud.google.com/about/locations",
    pricingNotes: [
      "Prices shown are for us-east1 region",
      "On-demand pricing with no upfront commitment",
      "Committed Use Discounts offer 1-3 year commitments with up to 55% savings",
      "Preemptible instances provide up to 80% savings but can be terminated",
      "Sustained Use Discounts automatically apply for long-running instances"
    ]
  },
  
  oracle: {
    name: "Oracle Cloud Infrastructure",
    officialPricing: "https://www.oracle.com/cloud/cost-estimator.html",
    calculator: "https://www.oracle.com/cloud/cost-estimator.html",
    disclaimer: "Oracle Cloud pricing varies by region. Universal Credits provide flexible spending. Bring Your Own License (BYOL) can reduce costs for existing Oracle software licenses.",
    freeTier: "https://www.oracle.com/cloud/free/",
    regions: "https://www.oracle.com/cloud/data-centers/",
    pricingNotes: [
      "Prices shown are for US East (Ashburn) region",
      "Pay-as-you-go pricing with Universal Credits",
      "Universal Credits provide flexible spending across all services",
      "BYOL allows use of existing Oracle software licenses",
      "Spot instances available for up to 90% savings"
    ]
  },
  
  ibm: {
    name: "IBM Cloud",
    officialPricing: "https://www.ibm.com/cloud/pricing",
    calculator: "https://www.ibm.com/cloud/pricing",
    disclaimer: "IBM Cloud pricing varies by region and data center. Enterprise customers receive volume discounts. Reserved instances offer up to 50% savings with 1-3 year commitments.",
    freeTier: "https://www.ibm.com/cloud/free",
    regions: "https://www.ibm.com/cloud/data-centers",
    pricingNotes: [
      "Prices shown are for US South region",
      "Pay-as-you-go pricing with no upfront commitment",
      "Reserved instances offer 1-3 year commitments with up to 50% savings",
      "Volume discounts available for enterprise customers",
      "Spot instances available for cost optimization"
    ]
  }
};

// General disclaimers and important notes
export const generalDisclaimers = {
  accuracy: "All pricing information is sourced from official provider websites and is subject to change. Please verify current pricing on official provider websites before making purchasing decisions.",
  
  estimates: "Cost estimates are approximations based on current pricing. Actual costs may vary significantly based on usage patterns, region selection, discounts, and other factors.",
  
  freeTier: "Free tier allowances are not included in cost calculations. Many providers offer generous free tiers that can significantly reduce costs for new users.",
  
  commitments: "Long-term commitments (Reserved Instances, Committed Use Discounts) can provide significant savings but require upfront payment or minimum usage commitments.",
  
  regions: "Pricing varies by region. Costs shown are typically for US East regions. Check provider-specific regional pricing for your target deployment location.",
  
  usage: "Actual costs depend heavily on usage patterns, data transfer volumes, storage access patterns, and application-specific requirements.",
  
  support: "Enterprise support plans and additional services (monitoring, backup, security) may incur additional costs not reflected in basic service pricing."
};

// Pricing model explanations
export const pricingModels = {
  onDemand: {
    name: "On-Demand Pricing",
    description: "Pay only for what you use with no upfront commitment or minimum fees.",
    pros: ["No upfront commitment", "Flexible scaling", "No long-term contracts"],
    cons: ["Highest per-unit cost", "No volume discounts", "Unpredictable monthly costs"]
  },
  
  reserved: {
    name: "Reserved Instances / Committed Use",
    description: "Commit to 1-3 year terms for significant discounts (up to 72% savings).",
    pros: ["Significant cost savings", "Predictable costs", "Capacity reservation"],
    cons: ["Upfront payment required", "Long-term commitment", "Less flexibility"]
  },
  
  spot: {
    name: "Spot / Preemptible Instances",
    description: "Use spare capacity at steep discounts (up to 90% savings) with potential interruptions.",
    pros: ["Maximum cost savings", "No upfront commitment", "Good for fault-tolerant workloads"],
    cons: ["Can be terminated with short notice", "Not suitable for critical workloads", "Limited availability"]
  }
};

export default pricingReferences;
