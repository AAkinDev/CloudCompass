import React from 'react';
import { Globe, Smartphone, BarChart3, Brain, Building2, MoreHorizontal } from 'lucide-react';

const useCases = [
  {
    id: 'web-app',
    name: 'Web Application',
    description: 'Traditional web apps, e-commerce, content management systems',
    icon: Globe
  },
  {
    id: 'mobile-backend',
    name: 'Mobile Backend',
    description: 'APIs for mobile apps, real-time data, push notifications',
    icon: Smartphone
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    description: 'Big data processing, business intelligence, data warehouses',
    icon: BarChart3
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'AI/ML workloads, model training, inference pipelines',
    icon: Brain
  },
  {
    id: 'enterprise-migration',
    name: 'Enterprise Migration',
    description: 'Legacy system migration, hybrid cloud, compliance-heavy workloads',
    icon: Building2
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Specialized workloads, custom requirements, unique use cases',
    icon: MoreHorizontal
  }
];

const UseCaseStep = ({ selectedUseCase, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          What type of application are you building?
        </h3>
        <p className="text-sm text-gray-600">
          Choose the primary use case that best describes your workload
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {useCases.map((useCase) => {
          const Icon = useCase.icon;
          const isSelected = selectedUseCase?.id === useCase.id;
          
          return (
            <button
              key={useCase.id}
              onClick={() => onSelect(useCase)}
              className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-blue-500' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{useCase.name}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{useCase.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedUseCase && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <selectedUseCase.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">
                Selected: <span className="font-semibold">{selectedUseCase.name}</span>
              </p>
              <p className="text-xs text-blue-700 mt-1">{selectedUseCase.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseCaseStep;
