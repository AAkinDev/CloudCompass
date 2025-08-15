'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cloud, BarChart3, Zap, Shield, Globe } from 'lucide-react';
import ProviderLogo from '@/components/ProviderLogos';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l3 3 3-3" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">CloudProInsights™</h1>
                  <p className="text-sm text-gray-500">Smarter Cloud Decisions Start Here.</p>
                </div>
              </div>
            </div>
            <nav className="flex space-x-8">
              <Link 
                href="/" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <Link 
                href="/compare" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Compare
              </Link>
              <Link 
                href="/decide/" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Decide
              </Link>
              <Link 
                href="/analytics" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </Link>
              <Link 
                href="/calculate" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculate
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Make Informed Cloud Decisions
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Compare cloud providers, analyze costs, and get personalized recommendations for your specific workload requirements.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/decide/"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Start Decision Wizard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-gray-900">
              Why Choose CloudProInsights?
            </h3>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <Cloud className="h-6 w-6" />
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">Provider Comparison</h4>
              <p className="mt-2 text-base text-gray-500">
                Compare AWS, Azure, GCP, Oracle, and IBM across multiple dimensions including cost, performance, and compliance.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">Live Analytics</h4>
              <p className="mt-2 text-base text-gray-500">
                Get real-time insights based on current service offerings and regional availability from each provider.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">Smart Recommendations</h4>
              <p className="mt-2 text-base text-gray-500">
                AI-powered suggestions tailored to your specific use case, priorities, and constraints.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <Shield className="h-6 w-6" />
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">Compliance Focus</h4>
              <p className="mt-2 text-base text-gray-500">
                Understand which providers meet your regulatory requirements like HIPAA, PCI, GDPR, and FedRAMP.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <Globe className="h-6 w-6" />
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">Global Coverage</h4>
              <p className="mt-2 text-base text-gray-500">
                Evaluate regional availability and choose providers that align with your geographic requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-gray-900">
              Cloud Provider Overview
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Get a quick overview of the major cloud providers we support
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* AWS */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <ProviderLogo providerId="aws" size="md" />
                <h4 className="ml-3 text-lg font-semibold text-gray-900">Amazon Web Services</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Industry leader with the broadest service portfolio and global infrastructure.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• Extensive service catalog</div>
                <div>• Global presence</div>
                <div>• Enterprise focus</div>
              </div>
            </div>

            {/* Azure */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <ProviderLogo providerId="azure" size="md" />
                <h4 className="ml-3 text-lg font-semibold text-gray-900">Microsoft Azure</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Strong enterprise integration and hybrid cloud capabilities.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• Microsoft ecosystem</div>
                <div>• Hybrid cloud</div>
                <div>• Enterprise tools</div>
              </div>
            </div>

            {/* GCP */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <ProviderLogo providerId="gcp" size="md" />
                <h4 className="ml-3 text-lg font-semibold text-gray-900">Google Cloud Platform</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Innovation leader with strong AI/ML and data analytics capabilities.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• AI/ML expertise</div>
                <div>• Data analytics</div>
                <div>• Open source friendly</div>
              </div>
            </div>

            {/* Oracle */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <ProviderLogo providerId="oracle" size="md" />
                <h4 className="ml-3 text-lg font-semibold text-gray-900">Oracle Cloud</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Database and enterprise application expertise with competitive pricing.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• Database expertise</div>
                <div>• Enterprise apps</div>
                <div>• Cost competitive</div>
              </div>
            </div>

            {/* IBM */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <ProviderLogo providerId="ibm" size="md" />
                <h4 className="ml-3 text-lg font-semibold text-gray-900">IBM Cloud</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Enterprise-grade cloud with strong security and compliance features.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• Enterprise security</div>
                <div>• Compliance focus</div>
                <div>• Industry expertise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Make Your Cloud Decision?
            </h3>
            <p className="mt-4 text-lg text-blue-100">
              Use our intelligent Decision Wizard to get personalized recommendations based on your specific needs.
            </p>
            <div className="mt-8">
              <Link
                href="/decide/"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Start Decision Wizard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">CloudProInsights</h4>
            <p className="text-gray-400 text-sm">
              Making cloud decisions easier with data-driven insights and intelligent recommendations.
            </p>
            <div className="mt-6">
              <Link
                href="/decide/"
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Try Decision Wizard
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
