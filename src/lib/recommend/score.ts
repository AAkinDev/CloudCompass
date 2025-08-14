import { ProviderFacts, AnalyticsMap, Weights, Constraints, ScoreOut, ProviderId } from '@/types/provider';

export function rankProviders(
  facts: ProviderFacts[],
  analytics: AnalyticsMap,
  weights: Weights,
  constraints: Constraints
): ScoreOut[] {
  // Merge facts with live analytics data
  const enrichedFacts = facts.map(fact => ({
    ...fact,
    regions: analytics[fact.id]?.regions || [],
    serviceCount: analytics[fact.id]?.services || 0
  }));

  // Normalize service counts for scoring
  const maxServices = Math.max(...enrichedFacts.map(f => f.serviceCount));
  const minServices = Math.min(...enrichedFacts.map(f => f.serviceCount));

  const scores: ScoreOut[] = enrichedFacts.map(fact => {
    let score = 0;
    const reasons: string[] = [];

    // Cost score (lower price index = higher score)
    const costScore = (1 - fact.priceIndex) * weights.cost;
    score += costScore;
    if (costScore > 0.3) {
      reasons.push(`Lower price index vs peers (${(1 - fact.priceIndex).toFixed(2)})`);
    }

    // Performance score
    const perfScore = fact.perfIndex * weights.performance;
    score += perfScore;
    if (perfScore > 0.3) {
      reasons.push(`Strong performance metrics (${fact.perfIndex.toFixed(2)})`);
    }

    // Availability score (region coverage)
    const regionMatch = calculateRegionMatch(constraints.regions, fact.regions);
    const availabilityScore = regionMatch * weights.availability;
    score += availabilityScore;
    if (regionMatch > 0) {
      const matchedCount = constraints.regions.filter(r => fact.regions.includes(r)).length;
      const totalCount = constraints.regions.length;
      if (totalCount > 0) {
        reasons.push(`Matches required regions (${matchedCount}/${totalCount})`);
      }
    }

    // Compliance score
    const complianceScore = calculateComplianceScore(constraints.compliance, fact.compliance) * weights.compliance;
    score += complianceScore;
    if (complianceScore > 0.2) {
      const matchedCompliance = constraints.compliance.filter(c => fact.compliance.includes(c));
      if (matchedCompliance.length > 0) {
        reasons.push(`Meets ${matchedCompliance.join(', ')}`);
      }
    }

    // Service breadth bonus
    const serviceBonus = ((fact.serviceCount - minServices) / (maxServices - minServices)) * 0.1;
    score += serviceBonus;
    if (serviceBonus > 0.05) {
      reasons.push(`Broad service portfolio (${fact.serviceCount} services)`);
    }

    // Special bonuses
    if (constraints.gpu && fact.gpuSupport) {
      score += 0.05;
      reasons.push('GPU support available');
    }

    if (constraints.serverless && fact.serverlessMaturity > 0.7) {
      score += 0.05;
      reasons.push('Strong serverless maturity');
    }

    if (constraints.db === 'rdbms' && fact.managedRdbms) {
      score += 0.05;
      reasons.push('Managed RDBMS available');
    }

    if (constraints.db === 'nosql' && fact.managedNosql) {
      score += 0.05;
      reasons.push('Managed NoSQL available');
    }

    // Calculate confidence
    const confidence = calculateConfidence(constraints, weights);

    return {
      id: fact.id,
      score: Math.min(score, 1), // Cap at 1.0
      reasons: reasons.slice(0, 3), // Top 3 reasons
      confidence
    };
  });

  // Sort by score descending
  return scores.sort((a, b) => b.score - a.score);
}

function calculateRegionMatch(userRegions: string[], providerRegions: string[]): number {
  if (userRegions.length === 0) return 1; // No constraints = full score
  
  const matchedRegions = userRegions.filter(r => providerRegions.includes(r));
  const matchRatio = matchedRegions.length / userRegions.length;
  
  if (matchRatio === 1) return 1; // Full match
  if (matchRatio > 0.5) return 0.7; // Partial match
  if (matchRatio > 0) return 0.3; // Minimal match
  return 0; // No match
}

function calculateComplianceScore(required: string[], available: string[]): number {
  if (required.length === 0) return 1; // No requirements = full score
  
  const matched = required.filter(c => available.includes(c));
  return matched.length / required.length;
}

function calculateConfidence(constraints: Constraints, weights: Weights): 'High' | 'Medium' | 'Low' {
  const hasRegions = constraints.regions.length >= 2;
  const hasPriorities = Object.values(weights).filter(w => w > 60).length >= 2;
  const hasConstraints = constraints.compliance.length > 0 || constraints.db !== 'both';
  
  if ((hasRegions || hasPriorities) && hasConstraints) return 'High';
  if (hasRegions || hasPriorities || hasConstraints) return 'Medium';
  return 'Low';
}


