import React from 'react';
import { DollarSign, Zap, Globe, Shield, HelpCircle } from 'lucide-react';

const priorities = [
  {
    key: 'cost',
    name: 'Cost',
    icon: DollarSign,
    description: 'How important it is to minimize ongoing monthly cost.',
    color: 'bg-green-500'
  },
  {
    key: 'performance',
    name: 'Performance',
    icon: Zap,
    description: 'Throughput and latency under load.',
    color: 'bg-blue-500'
  },
  {
    key: 'availability',
    name: 'Availability',
    icon: Globe,
    description: 'Region coverage and multi-AZ options.',
    color: 'bg-purple-500'
  },
  {
    key: 'compliance',
    name: 'Compliance',
    icon: Shield,
    description: 'Fit for regulatory requirements like HIPAA, PCI, or GDPR.',
    color: 'bg-orange-500'
  }
];

const PrioritiesStep = ({ weights, onUpdate }) => {
  const handleSliderChange = (key, value) => {
    onUpdate({ ...weights, [key]: value });
  };

  const getTotalWeight = () => {
    return Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  };

  const getWeightPercentage = (weight: number) => {
    const total = getTotalWeight();
    return total > 0 ? Math.round((weight / total) * 100) : 0;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Set Your Priorities
        </h3>
        <p className="text-sm text-gray-600">
          Adjust the sliders to indicate how important each factor is for your use case
        </p>
      </div>

      <div className="space-y-6">
        {priorities.map((priority) => {
          const Icon = priority.icon;
          const weight = weights[priority.key];
          const percentage = getWeightPercentage(weight);
          
          return (
            <div key={priority.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${priority.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{priority.name}</h4>
                    <p className="text-sm text-gray-600">{priority.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{weight}</span>
                  <span className="text-xs text-gray-500">({percentage}%)</span>
                  <div className="relative group">
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {priority.description}
                      <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weight}
                  onChange={(e) => handleSliderChange(priority.key, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, ${priority.color.replace('bg-', '')} 0%, ${priority.color.replace('bg-', '')} ${weight}%, #e5e7eb ${weight}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {priorities.map((priority) => {
            const weight = weights[priority.key];
            const percentage = getWeightPercentage(weight);
            
            return (
              <div key={priority.key} className="text-center">
                <div className="text-lg font-semibold text-gray-900">{weight}</div>
                <div className="text-xs text-gray-600">{priority.name}</div>
                <div className="text-xs text-gray-500">{percentage}% of total</div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Weight:</span>
            <span className="font-medium text-gray-900">{getTotalWeight()}</span>
          </div>
        </div>
      </div>

      {/* CSS for custom slider styling */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default PrioritiesStep;
