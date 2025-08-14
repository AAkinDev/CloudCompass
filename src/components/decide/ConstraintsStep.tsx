'use client';

import React, { useState } from 'react';
import { Constraints } from '@/types/provider';
import { MapPin, Shield, Database, Zap, Server, HardDrive } from 'lucide-react';

interface ConstraintsStepProps {
  constraints: Constraints;
  onUpdate: (constraints: Constraints) => void;
}

const ConstraintsStep: React.FC<ConstraintsStepProps> = ({ constraints, onUpdate }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleUpdate = (updates: Partial<Constraints>) => {
    onUpdate({ ...constraints, ...updates });
  };

  const complianceOptions = ['HIPAA', 'PCI', 'GDPR', 'FedRAMP', 'SOC', 'ISO'];
  
  const regionOptions = [
    'us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1',
    'ca-central-1', 'sa-east-1', 'me-south-1', 'af-south-1'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Add Constraints
        </h2>
        <p className="text-gray-600">
          Set optional constraints to further refine your cloud provider recommendations.
        </p>
      </div>

      {/* Region Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Regions</h3>
            <p className="text-sm text-gray-500">Select regions where you need infrastructure</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {regionOptions.map((region) => (
            <label key={region} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={constraints.regions.includes(region)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleUpdate({ regions: [...constraints.regions, region] });
                  } else {
                    handleUpdate({ regions: constraints.regions.filter(r => r !== region) });
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{region}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Compliance Requirements */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Compliance</h3>
            <p className="text-sm text-gray-500">Select required compliance standards</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {complianceOptions.map((compliance) => (
            <label key={compliance} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={constraints.compliance.includes(compliance)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleUpdate({ compliance: [...constraints.compliance, compliance] });
                  } else {
                    handleUpdate({ compliance: constraints.compliance.filter(c => c !== compliance) });
                  }
                }}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">{compliance}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Database Type */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-green-100 text-green-600">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Database Requirements</h3>
            <p className="text-sm text-gray-500">What type of database do you need?</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'rdbms', label: 'RDBMS', icon: Database },
            { value: 'nosql', label: 'NoSQL', icon: Database },
            { value: 'both', label: 'Both', icon: Database }
          ].map((option) => (
            <label key={option.value} className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:border-blue-300">
              <input
                type="radio"
                name="db"
                value={option.value}
                checked={constraints.db === option.value}
                onChange={(e) => handleUpdate({ db: e.target.value as 'rdbms' | 'nosql' | 'both' })}
                className="sr-only"
              />
              <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center ${
                constraints.db === option.value ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
              }`}>
                <option.icon className="w-5 h-5" />
              </div>
              <span className={`text-sm font-medium ${
                constraints.db === option.value ? 'text-blue-900' : 'text-gray-700'
              }`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
          <svg
            className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAdvanced && (
          <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
            {/* GPU Support */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">GPU Required</h4>
                  <p className="text-sm text-gray-500">Do you need GPU support for ML/AI workloads?</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gpu"
                    checked={constraints.gpu === true}
                    onChange={() => handleUpdate({ gpu: true })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gpu"
                    checked={constraints.gpu === false}
                    onChange={() => handleUpdate({ gpu: false })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Serverless Preference */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Serverless Preferred</h4>
                  <p className="text-sm text-gray-500">Do you prefer serverless solutions?</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="serverless"
                    checked={constraints.serverless === true}
                    onChange={() => handleUpdate({ serverless: true })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="serverless"
                    checked={constraints.serverless === false}
                    onChange={() => handleUpdate({ serverless: false })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scale Estimation */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Scale Estimation</h3>
            <p className="text-sm text-gray-500">Help us understand your expected scale</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Requests
            </label>
            <input
              type="number"
              value={constraints.scale.monthlyRequests}
              onChange={(e) => handleUpdate({
                scale: { ...constraints.scale, monthlyRequests: parseInt(e.target.value) || 0 }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1000000"
            />
            <p className="text-xs text-gray-500 mt-1">Estimated monthly API/request volume</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage (GB)
            </label>
            <input
              type="number"
              value={constraints.scale.storedGB}
              onChange={(e) => handleUpdate({
                scale: { ...constraints.scale, storedGB: parseInt(e.target.value) || 0 }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
            <p className="text-xs text-gray-500 mt-1">Expected data storage requirements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstraintsStep;


