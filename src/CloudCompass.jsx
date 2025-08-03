import React, { useState } from 'react';
import { Filter, BarChart3, Users, Calculator, Download, ExternalLink } from 'lucide-react';
import CloudCompassLogo from './components/CloudCompassLogo';

const CloudCompass = () => {
  const [activeView, setActiveView] = useState('compare');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <CloudCompassLogo size="default" className="flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">Navigate Your Cloud Journey</p>
            </div>
            
            <nav className="flex gap-1">
              {[
                { id: 'compare', label: 'Compare', icon: Filter },
                { id: 'wizard', label: 'Decide', icon: Users },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'calculator', label: 'Calculate', icon: Calculator },
              ].map(nav => {
                const Icon = nav.icon;
                return (
                  <button
                    key={nav.id}
                    onClick={() => setActiveView(nav.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeView === nav.id || (activeView === 'detailed-compare' && nav.id === 'compare')
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{nav.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <CloudCompassLogo size="xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Navigate Your Cloud Journey with Confidence
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Compare cloud services, analyze costs, and make informed decisions across AWS, Azure, GCP, Oracle, and IBM Cloud.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveView('compare')}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Comparing Services
            </button>
            <button
              onClick={() => setActiveView('wizard')}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Get Recommendations
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <CloudCompassLogo size="small" />
              <div className="text-sm text-gray-600">
                © 2025 CloudCompass by AAkinDev. Navigate your cloud journey with confidence.
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <a 
                href="https://github.com/AAkinDev/CloudCompass"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CloudCompass; 