'use client';

import React from 'react';
import { ExternalLink, TrendingUp, Info } from 'lucide-react';
import { ScoreOut, UseCase, Weights, Constraints } from '@/types/provider';
import { getSuggestedStack } from '@/data/useCases';
import ProviderLogo from '@/components/ProviderLogos';
import { formatNumber } from '@/lib/string';

interface PreviewPaneProps {
  rankings: ScoreOut[];
  useCase: UseCase | null;
  weights: Weights;
  constraints: Constraints;
  isLoading: boolean;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({
  rankings,
  useCase,
  weights,
  constraints,
  isLoading
}) => {
  const hasInputs = useCase || Object.values(weights).some(w => w > 0) || 
    constraints.regions.length > 0 || constraints.compliance.length > 0;

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-24">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!hasInputs) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-24">
        <div className="text-center text-gray-500">
          <Info className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <h3 className="font-medium text-gray-900 mb-2">No Inputs Yet</h3>
          <p className="text-sm">
            Add at least one priority and one constraint to see tailored suggestions.
          </p>
        </div>
      </div>
    );
  }

  if (rankings.length === 0) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-24">
        <div className="text-center text-gray-500">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <h3 className="font-medium text-gray-900 mb-2">Calculating...</h3>
          <p className="text-sm">
            Complete the form to see your personalized recommendations.
          </p>
        </div>
      </div>
    );
  }

  const topProvider = rankings[0];
  const suggestedStack = getSuggestedStack(topProvider.id, useCase?.id || null);

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-24" aria-live="polite">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Preview</h3>
        <p className="text-sm text-gray-600">
          Top provider: <span className="font-medium">{topProvider.id.toUpperCase()}</span>, 
          score <span className="font-medium">{Math.round(topProvider.score * 100)}</span>
        </p>
      </div>

      {/* Top 3 Providers */}
      <div className="space-y-4">
        {rankings.slice(0, 3).map((ranking, index) => (
          <div
            key={ranking.id}
            className={`p-4 rounded-lg border transition-all hover:shadow-md ${
              index === 0 ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <ProviderLogo providerId={ranking.id} size="sm" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {ranking.id.toUpperCase()}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Rank #{index + 1}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {ranking.confidence} Confidence
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(ranking.score * 100)}
                </div>
                <div className="text-xs text-gray-500">score</div>
              </div>
            </div>

            {/* Top Reasons */}
            {ranking.reasons.length > 0 && (
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Why this provider:</h5>
                <ul className="space-y-1">
                  {ranking.reasons.slice(0, 2).map((reason, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Stack */}
            {index === 0 && suggestedStack && (
              <div className="mb-3 p-3 bg-white rounded border border-gray-200">
                <h5 className="text-xs font-medium text-gray-700 mb-1">Suggested Stack:</h5>
                <p className="text-xs text-gray-600">{suggestedStack}</p>
              </div>
            )}

            {/* Provider Links */}
            <div className="flex space-x-2">
              <a
                href={`https://${ranking.id}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Visit
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      {useCase && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Best for {useCase.name}</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-gray-500">Top Score</div>
              <div className="font-semibold text-gray-900">
                {Math.round(topProvider.score * 100)}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Confidence</div>
              <div className="font-semibold text-gray-900">
                {topProvider.confidence}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scale Info */}
      {constraints.scale && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-xs font-medium text-blue-900 mb-2">Your Scale</h4>
          <div className="text-xs text-blue-800 space-y-1">
            <div>• {formatNumber(constraints.scale.monthlyRequests)} requests/month</div>
            <div>• {constraints.scale.storedGB} GB storage</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPane;

