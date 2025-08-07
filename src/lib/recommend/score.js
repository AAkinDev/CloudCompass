import { joinAnd } from '../string';

// Helper function to calculate region coverage match
const calculateRegionCoverage = (userRegions, providerRegions) => {
  if (userRegions.length === 0) return 1; // No region constraint = full coverage
  
  const normalizedUserRegions = userRegions.map(r => r.toLowerCase());
  const normalizedProviderRegions = providerRegions.map(r => r.toLowerCase());
  
  const matches = normalizedUserRegions.filter(userRegion => 
    normalizedProviderRegions.some(providerRegion => 
      providerRegion.includes(userRegion) || userRegion.includes(providerRegion)
    )
  );
  
  return matches.length / normalizedUserRegions.length;
};

// Helper function to calculate compliance match
const calculateComplianceMatch = (requiredCompliance, providerCompliance) => {
  if (requiredCompliance.length === 0) return 1; // No compliance requirement = full match
  
  const matches = requiredCompliance.filter(req => 
    providerCompliance.some(comp => comp.includes(req) || req.includes(comp))
  );
  
  return matches.length / requiredCompliance.length;
};

// Helper function to determine confidence level
const calculateConfidence = (weights, constraints) => {
  const hasRegions = constraints.regions.length >= 2;
  const hasPriorities = Object.values(weights).filter(w => w > 60).length >= 2;
  const hasConstraints = constraints.regions.length > 0 || constraints.compliance.length > 0 || constraints.db !== 'both';
  
  if (hasRegions && hasPriorities && hasConstraints) return 'High';
  if (hasPriorities || hasConstraints) return 'Medium';
  return 'Low';
};

export function rankProviders(facts, analytics, weights, constraints) {
  const results = [];

  for (const fact of facts) {
    const analyticsData = analytics[fact.id];
    if (!analyticsData) continue;

    let score = 0;
    const reasons = [];

    // Cost score (lower priceIndex = better)
    const costScore = (1 - fact.priceIndex) * (weights.cost / 100);
    score += costScore;
    if (weights.cost > 50) {
      reasons.push(`Lower price index vs peers`);
    }

    // Performance score
    const perfScore = fact.perfIndex * (weights.performance / 100);
    score += perfScore;
    if (weights.performance > 50) {
      reasons.push(`Strong performance metrics`);
    }

    // Availability score (region coverage)
    const regionCoverage = calculateRegionCoverage(constraints.regions, analyticsData.regions);
    const availabilityScore = regionCoverage * (weights.availability / 100);
    score += availabilityScore;
    
    if (constraints.regions.length > 0) {
      const matchCount = constraints.regions.filter(userRegion => 
        analyticsData.regions.some(providerRegion => 
          providerRegion.toLowerCase().includes(userRegion.toLowerCase()) ||
          userRegion.toLowerCase().includes(providerRegion.toLowerCase())
        )
      ).length;
      reasons.push(`Matches required regions (${matchCount}/${constraints.regions.length})`);
    }

    // Compliance score
    const complianceMatch = calculateComplianceMatch(constraints.compliance, fact.compliance);
    const complianceScore = complianceMatch * (weights.compliance / 100);
    score += complianceScore;
    
    if (constraints.compliance.length > 0) {
      const matchedCompliance = constraints.compliance.filter(req => 
        fact.compliance.some(comp => comp.includes(req) || req.includes(comp))
      );
      if (matchedCompliance.length > 0) {
        reasons.push(`Meets ${joinAnd(matchedCompliance)}`);
      }
    }

    // Service breadth bonus (normalized by max services)
    const maxServices = Math.max(...Object.values(analytics).map(p => p.services));
    const serviceBreadthFactor = analyticsData.services / maxServices;
    score += serviceBreadthFactor * 0.1; // Small bonus for service breadth
    reasons.push(`${analyticsData.services} services available`);

    // Special bonuses
    if (constraints.gpu && fact.gpuSupport) {
      score += 0.05;
      reasons.push(`GPU support available`);
    }

    if (constraints.serverless && fact.serverlessMaturity > 0.7) {
      score += 0.05;
      reasons.push(`Strong serverless maturity`);
    }

    if (constraints.db === 'rdbms' && fact.managedRdbms) {
      score += 0.05;
      reasons.push(`Managed RDBMS available`);
    }

    if (constraints.db === 'nosql' && fact.managedNosql) {
      score += 0.05;
      reasons.push(`Managed NoSQL available`);
    }

    if (constraints.db === 'both' && fact.managedRdbms && fact.managedNosql) {
      score += 0.05;
      reasons.push(`Both managed RDBMS and NoSQL available`);
    }

    // Normalize score to 0-1 range
    score = Math.min(1, Math.max(0, score));

    const confidence = calculateConfidence(weights, constraints);

    results.push({
      id: fact.id,
      score,
      reasons: reasons.slice(0, 3), // Top 3 reasons
      confidence
    });
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
