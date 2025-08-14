'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Info } from 'lucide-react';
import { useAnalytics } from '@/lib/useAnalytics';
import { providerFacts } from '@/data/providerFacts';
import { rankProviders } from '@/lib/recommend/score';
import { DecideState, UseCase, Weights, Constraints } from '@/types/provider';
import { useCases } from '@/data/useCases';
import UseCaseStep from '@/components/decide/UseCaseStep';
import PrioritiesStep from '@/components/decide/PrioritiesStep';
import ConstraintsStep from '@/components/decide/ConstraintsStep';
import PreviewPane from '@/components/decide/PreviewPane';
import Results from '@/components/decide/Results';

const STORAGE_KEY = 'cloudproinsights-decide-state';

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
    scale: {
      monthlyRequests: 1000000,
      storedGB: 100
    }
  }
};

const DecidePage: React.FC = () => {
  const [state, setState] = useState<DecideState>(defaultState);
  const { analytics, isLoading, refresh } = useAnalytics();

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (error) {
        console.error('Failed to parse saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<DecideState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (state.step < 4) {
      updateState({ step: state.step + 1 });
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      updateState({ step: state.step - 1 });
    }
  };

  const resetWizard = () => {
    setState(defaultState);
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
            <div className="bg-white rounded-xl border shadow-sm p-6">
              {renderStep()}
              
              {/* Navigation */}
              {state.step < 4 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={prevStep}
                    disabled={state.step === 1}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.step === 3 ? 'Get Recommendations' : 'Next'}
                  </button>
                </div>
              )}
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

export default DecidePage;
