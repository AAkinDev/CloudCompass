'use client';

import React from 'react';
import { Weights } from '@/types/provider';
import { DollarSign, Zap, Globe, Shield } from 'lucide-react';

interface PrioritiesStepProps {
  weights: Weights;
  onUpdate: (weights: Weights) => void;
}

const PrioritiesStep: React.FC<PrioritiesStepProps> = ({ weights, onUpdate }) => {
  const handleWeightChange = (key: keyof Weights, value: number) => {
    onUpdate({ ...weights, [key]: value });
  };

  const priorityItems = [
    {
      key: 'cost' as keyof Weights,
      label: 'Cost',
      icon: DollarSign,
      description: 'How important it is to minimize ongoing monthly cost.',
      color: 'text-green-600'
    },
    {
      key: 'performance' as keyof Weights,
      label: 'Performance',
      icon: Zap,
      description: 'Throughput and latency under load.',
      color: 'text-yellow-600'
    },
    {
      key: 'availability' as keyof Weights,
      label: 'Availability',
      icon: Globe,
      description: 'Region coverage and multi-AZ options.',
      color: 'text-blue-600'
    },
    {
      key: 'compliance' as keyof Weights,
      label: 'Compliance',
      icon: Shield,
      description: 'Fit for regulatory requirements like HIPAA, PCI, or GDPR.',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Set Your Priorities
        </h2>
        <p className="text-gray-600">
          Adjust the sliders to indicate how important each factor is for your decision. Higher values mean higher priority.
        </p>
      </div>

      <div className="space-y-6">
        {priorityItems.map((item) => {
          const Icon = item.icon;
          const value = weights[item.key];
          
          return (
            <div key={item.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">{value}</span>
                  <span className="text-sm text-gray-500 ml-1">%</span>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleWeightChange(item.key, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, ${item.color.replace('text-', '')} 0%, ${item.color.replace('text-', '')} ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not Important</span>
                  <span>Very Important</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Priority Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {priorityItems.map((item) => (
            <div key={item.key} className="text-center">
              <div className={`text-lg font-semibold ${item.color}`}>
                {weights[item.key]}%
              </div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-sm text-gray-500 text-center">
          Total: {Object.values(weights).reduce((sum, weight) => sum + weight, 0)}%
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default PrioritiesStep;


