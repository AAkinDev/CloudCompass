import React, { useState } from 'react';
import { MapPin, Shield, Database, Cpu, Zap, DollarSign, BarChart3 } from 'lucide-react';

const regions = [
  'us-east-1', 'us-west-1', 'us-west-2', 'eu-west-1', 'eu-central-1',
  'ap-southeast-1', 'ap-northeast-1', 'sa-east-1', 'af-south-1'
];

const complianceOptions = [
  { id: 'HIPAA', name: 'HIPAA', description: 'Healthcare data protection' },
  { id: 'PCI', name: 'PCI DSS', description: 'Payment card industry standards' },
  { id: 'GDPR', name: 'GDPR', description: 'European data protection' },
  { id: 'FedRAMP', name: 'FedRAMP', description: 'Federal government compliance' }
];

const databaseOptions = [
  { id: 'rdbms', name: 'Relational Database', description: 'SQL databases like MySQL, PostgreSQL' },
  { id: 'nosql', name: 'NoSQL Database', description: 'Document, key-value, or graph databases' },
  { id: 'both', name: 'Both', description: 'Need both relational and NoSQL options' }
];

const ConstraintsStep = ({ constraints, budget, scale, onUpdate }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleConstraintUpdate = (updates: Partial<Constraints>) => {
    onUpdate({ constraints: { ...constraints, ...updates } });
  };

  const toggleRegion = (region: string) => {
    const newRegions = constraints.regions.includes(region)
      ? constraints.regions.filter(r => r !== region)
      : [...constraints.regions, region];
    handleConstraintUpdate({ regions: newRegions });
  };

  const toggleCompliance = (compliance: string) => {
    const newCompliance = constraints.compliance.includes(compliance)
      ? constraints.compliance.filter(c => c !== compliance)
      : [...constraints.compliance, compliance];
    handleConstraintUpdate({ compliance: newCompliance });
  };

  const handleBudgetChange = (value: string) => {
    const numValue = value === '' ? undefined : parseInt(value);
    onUpdate({ budget: numValue });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const parseNumber = (str: string): number => {
    const num = parseInt(str.replace(/[^0-9]/g, ''));
    if (str.includes('M')) return num * 1000000;
    if (str.includes('K')) return num * 1000;
    return num;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Add Constraints (Optional)
        </h3>
        <p className="text-sm text-gray-600">
          Specify any requirements or constraints for your cloud deployment
        </p>
      </div>

      {/* Regions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          <h4 className="font-semibold text-gray-900">Preferred Regions</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => toggleRegion(region)}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                constraints.regions.includes(region)
                  ? 'bg-blue-100 border-blue-300 text-blue-900'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        {constraints.regions.length > 0 && (
          <p className="text-sm text-gray-600">
            Selected: {constraints.regions.join(', ')}
          </p>
        )}
      </div>

      {/* Compliance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-gray-600" />
          <h4 className="font-semibold text-gray-900">Compliance Requirements</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {complianceOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleCompliance(option.id)}
              className={`p-3 text-left rounded-lg border transition-colors ${
                constraints.compliance.includes(option.id)
                  ? 'bg-orange-100 border-orange-300 text-orange-900'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{option.name}</div>
              <div className="text-xs text-gray-600">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Database Type */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-gray-600" />
          <h4 className="font-semibold text-gray-900">Database Type</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {databaseOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleConstraintUpdate({ db: option.id })}
              className={`p-3 text-left rounded-lg border transition-colors ${
                constraints.db === option.id
                  ? 'bg-purple-100 border-purple-300 text-purple-900'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{option.name}</div>
              <div className="text-xs text-gray-600">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
        </button>

        {showAdvanced && (
          <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
            {/* GPU Support */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900">GPU Support Required</h4>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleConstraintUpdate({ gpu: true })}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    constraints.gpu === true
                      ? 'bg-green-100 border-green-300 text-green-900'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleConstraintUpdate({ gpu: false })}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    constraints.gpu === false
                      ? 'bg-red-100 border-red-300 text-red-900'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Serverless Preference */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900">Serverless Preferred</h4>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleConstraintUpdate({ serverless: true })}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    constraints.serverless === true
                      ? 'bg-blue-100 border-blue-300 text-blue-900'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleConstraintUpdate({ serverless: false })}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    constraints.serverless === false
                      ? 'bg-gray-100 border-gray-300 text-gray-900'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Budget Range */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900">Monthly Budget (Optional)</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">$</span>
                <input
                  type="number"
                  placeholder="1000"
                  value={budget || ''}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-sm text-gray-600">/month</span>
              </div>
            </div>

            {/* Scale Estimation */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900">Estimated Scale</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Monthly Requests
                  </label>
                  <input
                    type="text"
                    value={formatNumber(scale.monthlyRequests)}
                    onChange={(e) => {
                      const value = parseNumber(e.target.value);
                      onUpdate({ scale: { ...scale, monthlyRequests: value } });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Stored Data (GB)
                  </label>
                  <input
                    type="number"
                    value={scale.storedGB}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      onUpdate({ scale: { ...scale, storedGB: value } });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {(constraints.regions.length > 0 || constraints.compliance.length > 0 || constraints.db !== 'both' || constraints.gpu !== undefined || constraints.serverless !== undefined) && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Constraints Summary</h4>
          <div className="space-y-1 text-sm text-blue-800">
            {constraints.regions.length > 0 && (
              <div>• Regions: {constraints.regions.join(', ')}</div>
            )}
            {constraints.compliance.length > 0 && (
              <div>• Compliance: {constraints.compliance.join(', ')}</div>
            )}
            {constraints.db !== 'both' && (
              <div>• Database: {databaseOptions.find(d => d.id === constraints.db)?.name}</div>
            )}
            {constraints.gpu !== undefined && (
              <div>• GPU: {constraints.gpu ? 'Required' : 'Not Required'}</div>
            )}
            {constraints.serverless !== undefined && (
              <div>• Serverless: {constraints.serverless ? 'Preferred' : 'Not Preferred'}</div>
            )}
            {budget && (
              <div>• Budget: ${budget.toLocaleString()}/month</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstraintsStep;
