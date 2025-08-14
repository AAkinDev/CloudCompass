import React from 'react';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { providerFacts } from '../../data/providerFacts';
import { getAssetUrl } from '../../utils/cacheBuster';

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

const getSuggestedStack = (providerId: string, useCase: UseCase | null): string => {
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

const getProviderName = (providerId: string): string => {
  const names = {
    aws: 'AWS',
    azure: 'Azure',
    gcp: 'Google Cloud',
    oracle: 'Oracle Cloud',
    ibm: 'IBM Cloud'
  };
  return names[providerId] || providerId.toUpperCase();
};

const getConfidenceColor = (confidence: string): string => {
  switch (confidence) {
    case 'High': return 'text-green-600 bg-green-100';
    case 'Medium': return 'text-yellow-600 bg-yellow-100';
    case 'Low': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const PreviewPane = ({ 
  rankings, 
  currentStep, 
  useCase, 
  weights, 
  constraints 
}) => {
  const hasInputs = useCase || Object.values(weights).some(w => w > 0) || 
    constraints.regions.length > 0 || constraints.compliance.length > 0;

  if (currentStep === 4) {
    return null; // Results view handles this
  }

  return (
    <div className="lg:sticky lg:top-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Live Preview</h3>
        </div>

        {!hasInputs ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-600">
              Add at least one priority and one constraint to see tailored suggestions.
            </p>
          </div>
        ) : (
          <div className="space-y-4" aria-live="polite">
            {rankings.slice(0, 3).map((ranking, index) => {
              const Logo = providerLogos[ranking.id];
              const fact = providerFacts.find(f => f.id === ranking.id);
              const suggestedStack = getSuggestedStack(ranking.id, useCase);
              
              return (
                <div
                  key={ranking.id}
                  className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Logo />
                        <span className="font-semibold text-gray-900">
                          {getProviderName(ranking.id)}
                        </span>
                      </div>
                      {index === 0 && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Top Pick
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {Math.round(ranking.score * 100)}
                      </div>
                      <div className="text-xs text-gray-500">score</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs">
                      <span className={`px-2 py-1 rounded ${getConfidenceColor(ranking.confidence)}`}>
                        {ranking.confidence} Confidence
                      </span>
                    </div>
                    
                    {ranking.reasons.length > 0 && (
                      <div className="text-xs text-gray-600">
                        <div className="font-medium mb-1">Why this provider:</div>
                        <ul className="space-y-1">
                          {ranking.reasons.slice(0, 2).map((reason, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-blue-500">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {suggestedStack && (
                      <div className="text-xs">
                        <div className="font-medium text-gray-700 mb-1">Suggested stack:</div>
                        <div className="text-gray-600 bg-gray-50 px-2 py-1 rounded">
                          {suggestedStack}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <a
                      href={fact?.catalogs.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span>View Documentation</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {rankings.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Rankings update in real-time as you adjust your preferences
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPane;
