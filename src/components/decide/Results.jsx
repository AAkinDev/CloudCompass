import React from 'react';
import { ExternalLink, CheckCircle, XCircle, RotateCcw, Download } from 'lucide-react';
import { getAssetUrl } from '../../utils/cacheBuster';
import { providerFacts } from '../../data/providerFacts';

const providerLogos = {
  aws: () => (
    <img 
      src={getAssetUrl('/assets/logos/aws-logo.png')}
      alt="AWS" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">AWS</div>';
      }}
    />
  ),
  azure: () => (
    <img 
      src={getAssetUrl('/assets/logos/azure-logo.png')}
      alt="Azure" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">Az</div>';
      }}
    />
  ),
  gcp: () => (
    <img 
      src={getAssetUrl('/assets/logos/gcp-logo.png')}
      alt="GCP" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">GCP</div>';
      }}
    />
  ),
  oracle: () => (
    <img 
      src={getAssetUrl('/assets/logos/oracle-logo.png')}
      alt="Oracle" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">OCI</div>';
      }}
    />
  ),
  ibm: () => (
    <img 
      src={getAssetUrl('/assets/logos/ibm-logo.png')}
      alt="IBM" 
      className="w-8 h-8 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">IBM</div>';
      }}
    />
  )
};

const getSuggestedStack = (providerId, useCase) => {
  const stacks = {
    'web-app': {
      aws: 'ALB + ECS Fargate + RDS + CloudFront',
      azure: 'Application Gateway + App Service + Azure SQL + CDN',
      gcp: 'Load Balancer + Cloud Run + Cloud SQL + Cloud CDN',
      oracle: 'Load Balancer + Container Engine + Autonomous DB + CDN',
      ibm: 'Load Balancer + Code Engine + Db2 + CDN'
    },
    'mobile-backend': {
      aws: 'API Gateway + Lambda + DynamoDB + S3',
      azure: 'API Management + Functions + Cosmos DB + Blob Storage',
      gcp: 'Cloud Endpoints + Cloud Functions + Firestore + Cloud Storage',
      oracle: 'API Gateway + Functions + NoSQL + Object Storage',
      ibm: 'API Connect + Cloud Functions + Cloudant + Object Storage'
    },
    'data-analytics': {
      aws: 'EMR + Redshift + S3 + QuickSight',
      azure: 'HDInsight + Synapse + Data Lake + Power BI',
      gcp: 'Dataproc + BigQuery + Cloud Storage + Looker',
      oracle: 'Big Data Service + Autonomous Data Warehouse + Object Storage + Analytics Cloud',
      ibm: 'Cloud Pak for Data + Db2 Warehouse + Object Storage + Cognos'
    },
    'machine-learning': {
      aws: 'SageMaker + ECS + RDS + S3',
      azure: 'Machine Learning + Container Instances + Azure SQL + Blob Storage',
      gcp: 'Vertex AI + Cloud Run + Cloud SQL + Cloud Storage',
      oracle: 'Data Science + Container Engine + Autonomous DB + Object Storage',
      ibm: 'Watson Studio + Code Engine + Db2 + Object Storage'
    },
    'enterprise-migration': {
      aws: 'Migration Hub + EC2 + RDS + Direct Connect',
      azure: 'Azure Migrate + Virtual Machines + Azure SQL + ExpressRoute',
      gcp: 'Migrate for Compute + Compute Engine + Cloud SQL + Cloud Interconnect',
      oracle: 'Cloud Migrations + Compute + Autonomous DB + FastConnect',
      ibm: 'Cloud Migration + Virtual Servers + Db2 + Direct Link'
    },
    'other': {
      aws: 'EC2 + RDS + S3 + CloudWatch',
      azure: 'Virtual Machines + Azure SQL + Blob Storage + Monitor',
      gcp: 'Compute Engine + Cloud SQL + Cloud Storage + Monitoring',
      oracle: 'Compute + Autonomous DB + Object Storage + Monitoring',
      ibm: 'Virtual Servers + Db2 + Object Storage + Monitoring'
    }
  };

  const useCaseId = useCase?.id || 'other';
  return stacks[useCaseId]?.[providerId] || stacks.other[providerId];
};

const getProviderName = (providerId) => {
  const names = {
    aws: 'AWS',
    azure: 'Azure',
    gcp: 'Google Cloud',
    oracle: 'Oracle Cloud',
    ibm: 'IBM Cloud'
  };
  return names[providerId] || providerId.toUpperCase();
};

const getConfidenceColor = (confidence) => {
  switch (confidence) {
    case 'High': return 'text-green-600 bg-green-100';
    case 'Medium': return 'text-yellow-600 bg-yellow-100';
    case 'Low': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getProsAndCons = (providerId) => {
  const data = {
    aws: {
      pros: ['Largest service ecosystem', 'Excellent documentation', 'Strong enterprise features'],
      cons: ['Complex pricing model', 'Steep learning curve', 'Vendor lock-in concerns']
    },
    azure: {
      pros: ['Strong enterprise integration', 'Excellent Windows support', 'Hybrid cloud leader'],
      cons: ['Less mature than AWS', 'Complex licensing', 'Limited open source support']
    },
    gcp: {
      pros: ['Excellent data analytics', 'Strong AI/ML capabilities', 'Simple pricing'],
      cons: ['Smaller service ecosystem', 'Less enterprise focus', 'Limited global presence']
    },
    oracle: {
      pros: ['Competitive pricing', 'Strong database offerings', 'Good enterprise support'],
      cons: ['Limited service ecosystem', 'Less mature cloud platform', 'Oracle lock-in']
    },
    ibm: {
      pros: ['Strong enterprise focus', 'Excellent security', 'Good hybrid cloud'],
      cons: ['Higher pricing', 'Limited service ecosystem', 'Less developer-friendly']
    }
  };
  return data[providerId] || { pros: [], cons: [] };
};

const estimateCost = (providerId, budget, scale) => {
  if (!budget) return 'Contact provider for pricing';
  
  const fact = providerFacts.find(f => f.id === providerId);
  if (!fact) return 'Contact provider for pricing';
  
  // Simple cost estimation based on price index
  const estimatedCost = budget * fact.priceIndex;
  return `$${Math.round(estimatedCost).toLocaleString()}/month (estimate)`;
};

const Results = ({ 
  rankings, 
  useCase, 
  weights, 
  constraints, 
  budget, 
  scale, 
  onReset 
}) => {
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Cloud Recommendations
        </h2>
        <p className="text-gray-600 mb-4">
          Best for {useCase?.name || 'your use case'}
        </p>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </button>
      </div>

      {/* Top 3 Results */}
      <div className="space-y-6">
        {rankings.slice(0, 3).map((ranking, index) => {
          const Logo = providerLogos[ranking.id];
          const fact = providerFacts.find(f => f.id === ranking.id);
          const suggestedStack = getSuggestedStack(ranking.id, useCase);
          const { pros, cons } = getProsAndCons(ranking.id);
          const estimatedCost = estimateCost(ranking.id, budget, scale);
          
          return (
            <div
              key={ranking.id}
              className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Logo />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {getProviderName(ranking.id)}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">Rank #{index + 1}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className={`text-xs px-2 py-1 rounded ${getConfidenceColor(ranking.confidence)}`}>
                          {ranking.confidence} Confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round(ranking.score * 100)}
                    </div>
                    <div className="text-sm text-gray-500">score</div>
                  </div>
                </div>

                {/* Suggested Stack */}
                {suggestedStack && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Suggested Stack</h4>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-gray-700">{suggestedStack}</p>
                    </div>
                  </div>
                )}

                {/* Cost Estimate */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Estimated Cost</h4>
                  <div className="text-lg font-semibold text-green-600">
                    {estimatedCost}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on your scale and provider pricing
                  </p>
                </div>

                {/* Why This Provider */}
                {ranking.reasons.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Why This Provider</h4>
                    <ul className="space-y-1">
                      {ranking.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Pros and Cons */}
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Pros
                  </h4>
                  <ul className="space-y-2">
                    {pros.map((pro, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Cons
                  </h4>
                  <ul className="space-y-2">
                    {cons.map((con, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  <a
                    href={fact?.catalogs.pricing}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Pricing
                  </a>
                  <a
                    href={fact?.catalogs.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Docs
                  </a>
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">Recommendation Summary</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Your Priorities</h4>
            <ul className="space-y-1">
              {Object.entries(weights).map(([key, value]) => (
                <li key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}/100
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Your Constraints</h4>
            <ul className="space-y-1">
              {constraints.regions.length > 0 && (
                <li>Regions: {constraints.regions.join(', ')}</li>
              )}
              {constraints.compliance.length > 0 && (
                <li>Compliance: {constraints.compliance.join(', ')}</li>
              )}
              {constraints.db !== 'both' && (
                <li>Database: {constraints.db.toUpperCase()}</li>
              )}
              {budget && (
                <li>Budget: ${budget.toLocaleString()}/month</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
