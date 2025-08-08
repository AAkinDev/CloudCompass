import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { useAnalytics } from '../../lib/useAnalytics';
import { providerFacts } from '../../data/providerFacts';
import { rankProviders, Weights, Constraints } from '../../lib/recommend/score';
import UseCaseStep from './UseCaseStep';
import PrioritiesStep from './PrioritiesStep';
import ConstraintsStep from './ConstraintsStep';
import PreviewPane from './PreviewPane';
import Results from './Results';

export type UseCase = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type DecideState = {
  step: number;
  useCase: UseCase | null;
  weights: Weights;
  constraints: Constraints;
  budget?: number;
  scale: {
    monthlyRequests: number;
    storedGB: number;
  };
};

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
    db: 'both'
  },
  scale: {
    monthlyRequests: 1000000,
    storedGB: 100
  }
};

const DecideWizard: React.FC = () => {
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

  const getStepDescription = () => {
    switch (state.step) {
      case 1: return 'What type of application are you building?';
      case 2: return 'How important are cost, performance, availability, and compliance?';
      case 3: return 'Any specific requirements or constraints?';
      case 4: return 'Here are your personalized cloud provider recommendations.';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Decide</h1>
              <p className="text-sm text-gray-600">Get personalized cloud recommendations</p>
            </div>
            <button
              onClick={refresh}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              title="Refresh analytics data"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h2>
                <span className="text-sm text-gray-500">Step {state.step} of 4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(state.step / 4) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{getStepDescription()}</p>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {state.step === 1 && (
                <UseCaseStep
                  selectedUseCase={state.useCase}
                  onSelect={(useCase) => updateState({ useCase })}
                />
              )}
              
              {state.step === 2 && (
                <PrioritiesStep
                  weights={state.weights}
                  onUpdate={(weights) => updateState({ weights })}
                />
              )}
              
              {state.step === 3 && (
                <ConstraintsStep
                  constraints={state.constraints}
                  budget={state.budget}
                  scale={state.scale}
                  onUpdate={(updates) => updateState(updates)}
                />
              )}
              
              {state.step === 4 && (
                <Results
                  rankings={rankings}
                  useCase={state.useCase}
                  weights={state.weights}
                  constraints={state.constraints}
                  budget={state.budget}
                  scale={state.scale}
                  onReset={resetWizard}
                />
              )}
            </div>

            {/* Navigation */}
            {state.step < 4 && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevStep}
                  disabled={state.step === 1}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {state.step === 3 ? 'Get Recommendations' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Preview Pane */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <PreviewPane
              rankings={rankings}
              currentStep={state.step}
              useCase={state.useCase}
              weights={state.weights}
              constraints={state.constraints}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecideWizard;
