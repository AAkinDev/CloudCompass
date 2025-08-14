'use client';

import React from 'react';
import { CheckCircle, XCircle, ExternalLink, Download, RotateCcw, TrendingUp } from 'lucide-react';
import { ScoreOut, UseCase, Weights, Constraints } from '@/types/provider';
import { getSuggestedStack } from '@/data/useCases';
import { providerFacts } from '@/data/providerFacts';
import ProviderLogo from '@/components/ProviderLogos';
import { formatNumber } from '@/lib/string';

interface ResultsProps {
  rankings: ScoreOut[];
  useCase: UseCase | null;
  weights: Weights;
  constraints: Constraints;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({
  rankings,
  useCase,
  weights,
  constraints,
  onReset
}) => {
  const getProviderName = (providerId: string): string => {
    const names = {
      aws: 'Amazon Web Services',
      azure: 'Microsoft Azure',
      gcp: 'Google Cloud Platform',
      oracle: 'Oracle Cloud Infrastructure',
      ibm: 'IBM Cloud'
    };
    return names[providerId as keyof typeof names] || providerId.toUpperCase();
  };

  const getConfidenceColor = (confidence: string): string => {
    switch (confidence) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProsAndCons = (providerId: string) => {
    const pros = {
      aws: ['Market leader with most services', 'Excellent documentation', 'Strong enterprise support'],
      azure: ['Great Windows integration', 'Strong enterprise features', 'Excellent compliance'],
      gcp: ['Best pricing for many services', 'Strong ML/AI capabilities', 'Excellent networking'],
      oracle: ['Strong database offerings', 'Good enterprise features', 'Competitive pricing'],
      ibm: ['Strong enterprise focus', 'Good hybrid cloud options', 'Watson AI platform']
    };

    const cons = {
      aws: ['Complex pricing structure', 'Steep learning curve', 'Some services can be expensive'],
      azure: ['Less mature than AWS', 'Some services limited', 'Windows-centric'],
      gcp: ['Fewer services than AWS', 'Less enterprise focus', 'Smaller partner ecosystem'],
      oracle: ['Smaller service portfolio', 'Less mature than others', 'Limited global presence'],
      ibm: ['Smaller service portfolio', 'Less developer focus', 'Higher pricing for some services']
    };

    return {
      pros: pros[providerId as keyof typeof pros] || [],
      cons: cons[providerId as keyof typeof cons] || []
    };
  };

  const estimateCost = (providerId: string, scale: any): string => {
    const fact = providerFacts.find(f => f.id === providerId);
    if (!fact) return 'Contact provider for pricing';
    
    // Simple cost estimation based on price index and scale
    const baseCost = 100; // Base cost per month
    const estimatedCost = baseCost * fact.priceIndex * (scale.monthlyRequests / 1000000) * (scale.storedGB / 100);
    return `$${Math.round(estimatedCost).toLocaleString()}/month (estimate)`;
  };

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
          const fact = providerFacts.find(f => f.id === ranking.id);
          const suggestedStack = getSuggestedStack(ranking.id, useCase?.id || null);
          const { pros, cons } = getProsAndCons(ranking.id);
          const estimatedCost = estimateCost(ranking.id, constraints.scale);
          
          return (
            <div
              key={ranking.id}
              className="bg-white rounded-xl border shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <ProviderLogo providerId={ranking.id} size="lg" />
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
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pros */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-500 mt-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      Considerations
                    </h4>
                    <ul className="space-y-2">
                      {cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-red-500 mt-1">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Why This Provider */}
                {ranking.reasons.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Why This Provider
                    </h4>
                    <ul className="space-y-2">
                      {ranking.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-500 mt-1">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200">
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
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Docs
                    </a>
                    <button
                      onClick={handleExportPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Export PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendation Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Your Priorities</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {Object.entries(weights).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}:</span>
                  <span className="font-medium">{value}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Your Constraints</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {constraints.regions.length > 0 && (
                <div>Regions: {constraints.regions.length}</div>
              )}
              {constraints.compliance.length > 0 && (
                <div>Compliance: {constraints.compliance.length}</div>
              )}
              <div>Database: {constraints.db}</div>
              {constraints.gpu !== undefined && (
                <div>GPU: {constraints.gpu ? 'Required' : 'Not Required'}</div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Your Scale</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div>{formatNumber(constraints.scale.monthlyRequests)} requests/month</div>
              <div>{constraints.scale.storedGB} GB storage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

