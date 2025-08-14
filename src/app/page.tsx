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
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">CloudProInsights</h1>
              </div>
            </div>
            <nav className="flex space-x-8">
              <Link 
                href="/decide/" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Decision Wizard
                <ArrowRight className="ml-2 h-4 w-4" />
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
