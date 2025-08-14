'use client';

import React from 'react';
import { UseCase } from '@/types/provider';

interface UseCaseStepProps {
  useCase: UseCase | null;
  onUpdate: (useCase: UseCase) => void;
  useCases: UseCase[];
}

const UseCaseStep: React.FC<UseCaseStepProps> = ({ useCase, onUpdate, useCases }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Use Case
        </h2>
        <p className="text-gray-600">
          Select the primary use case that best describes your workload. This helps us tailor recommendations to your specific needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {useCases.map((uc) => {
          const Icon = uc.icon;
          const isSelected = useCase?.id === uc.id;
          
          return (
            <button
              key={uc.id}
              onClick={() => onUpdate(uc)}
              className={`p-6 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${
                    isSelected ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {uc.name}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    isSelected ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {uc.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {useCase && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {React.createElement(useCase.icon, { className: 'w-5 h-5 text-blue-600' })}
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">
                Selected: <span className="font-semibold">{useCase.name}</span>
              </p>
              <p className="text-sm text-blue-700">{useCase.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseCaseStep;

