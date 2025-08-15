'use client';

import React, { useState, useEffect } from 'react';
import { Info, RefreshCw } from 'lucide-react';
import { DecideState, UseCase } from '@/types/provider';
import { useAnalytics } from '@/lib/useAnalytics';
import { rankProviders } from '@/lib/recommend/score';
import { providerFacts } from '@/data/providerFacts';
import { useCases } from '@/data/useCases';
import UseCaseStep from './UseCaseStep';
import PrioritiesStep from './PrioritiesStep';
import ConstraintsStep from './ConstraintsStep';
import PreviewPane from './PreviewPane';
import Results from './Results';

const defaultState: DecideState = {
  step: 1,
  useCase: null,
  weights: {
    cost: 50,
    performance: 50,
    availability: 50,
    compliance: 50
  },
  constraints: {
    regions: [],
    compliance: [],
    db: 'both',
    gpu: false,
    serverless: false,
    scale: {
      monthlyRequests: 1000000,
      storedGB: 100
    }
  }
};

const DecideWizard: React.FC = () => {
  const [state, setState] = useState<DecideState>(defaultState);
  const { analytics, isLoading, refresh } = useAnalytics();

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('decideWizardState');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setState(parsed);
        } catch (e) {
          console.warn('Failed to parse saved state:', e);
        }
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('decideWizardState', JSON.stringify(state));
    }
  }, [state]);

  const updateState = (updates: Partial<DecideState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (state.step < 4) {
      setState(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const resetWizard = () => {
    setState(defaultState);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('decideWizardState');
    }
  };

  // Calculate rankings when analytics and state are available
  const rankings = analytics && state.useCase ? 
    rankProviders(providerFacts, analytics, state.weights, state.constraints) : [];

  const canProceed = () => {
    switch (state.step) {
      case 1:
        return state.useCase !== null;
      case 2:
        return Object.values(state.weights).some(w => w > 0);
      case 3:
        return true; // Constraints are optional
      default:
        return true;
    }
  };

  const getStepTitle = () => {
    switch (state.step) {
      case 1: return 'Choose Your Use Case';
      case 2: return 'Set Your Priorities';
      case 3: return 'Add Constraints';
      case 4: return 'Your Recommendations';
      default: return '';
    }
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <UseCaseStep
            useCase={state.useCase}
            onUpdate={(useCase) => updateState({ useCase })}
            useCases={useCases}
          />
        );
      case 2:
        return (
          <PrioritiesStep
            weights={state.weights}
            onUpdate={(weights) => updateState({ weights })}
          />
        );
      case 3:
        return (
          <ConstraintsStep
            constraints={state.constraints}
            onUpdate={(constraints) => updateState({ constraints })}
          />
        );
      case 4:
        return (
          <Results
            rankings={rankings}
            useCase={state.useCase}
            weights={state.weights}
            constraints={state.constraints}
            onReset={resetWizard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Cloud Decision Wizard</h1>
              <div className="ml-4 flex items-center text-sm text-gray-500">
                <Info className="w-4 h-4 mr-1" />
                Step {state.step} of 4
              </div>
            </div>
            <button
              onClick={refresh}
              disabled={isLoading}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{getStepTitle()}</span>
              <span className="text-sm text-gray-500">Step {state.step} of 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(state.step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wizard Steps */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={state.step === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                
                {state.step < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={resetWizard}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Start Over
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <PreviewPane 
              rankings={rankings}
              useCase={state.useCase}
              weights={state.weights}
              constraints={state.constraints}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecideWizard;
