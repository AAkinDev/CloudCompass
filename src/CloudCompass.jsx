import React, { useState, useMemo } from 'react';
import { Search, Filter, BarChart3, Users, Zap, Database, Shield, Globe, Monitor, Brain, Calculator, Download, Star, ExternalLink } from 'lucide-react';
import CloudCompassLogo from './components/CloudCompassLogo';

const CloudCompass = () => {
  const [activeView, setActiveView] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProviders, setSelectedProviders] = useState(['aws', 'azure', 'gcp']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [compareList, setCompareList] = useState([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  // Logo components using actual logo images from GitHub repo
  const AWSLogo = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudCompass/main/public/assets/logos/aws-logo.png" 
      alt="AWS" 
      className="w-16 h-12 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-16 h-12 bg-orange-500 rounded flex items-center justify-center text-white text-sm font-bold">AWS</div>';
      }}
    />
  );

  const AzureLogo = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudCompass/main/public/assets/logos/azure-logo.png" 
      alt="Microsoft Azure" 
      className="w-12 h-12 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-12 h-12 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">Az</div>';
      }}
    />
  );

  const GoogleCloudLogo = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudCompass/main/public/assets/logos/gcp-logo.png" 
      alt="Google Cloud Platform" 
      className="w-12 h-12 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-12 h-12 bg-red-500 rounded flex items-center justify-center text-white text-sm font-bold">GCP</div>';
      }}
    />
  );

  const OracleLogo = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudCompass/main/public/assets/logos/oracle-logo.png" 
      alt="Oracle Cloud" 
      className="w-16 h-12 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-16 h-12 bg-red-600 rounded flex items-center justify-center text-white text-sm font-bold">OCI</div>';
      }}
    />
  );

  const IBMCloudLogo = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudCompass/main/public/assets/logos/ibm-logo.png" 
      alt="IBM Cloud" 
      className="w-16 h-12 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-16 h-12 bg-blue-800 rounded flex items-center justify-center text-white text-sm font-bold">IBM</div>';
      }}
    />
  );

  const providers = [
    { 
      id: 'aws', 
      name: 'AWS', 
      color: 'bg-orange-500', 
      fullName: 'Amazon Web Services',
      logo: AWSLogo,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200'
    },
    { 
      id: 'azure', 
      name: 'Azure', 
      color: 'bg-blue-600', 
      fullName: 'Microsoft Azure',
      logo: AzureLogo,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
    { 
      id: 'gcp', 
      name: 'GCP', 
      color: 'bg-red-500', 
      fullName: 'Google Cloud Platform',
      logo: GoogleCloudLogo,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200'
    },
    { 
      id: 'oracle', 
      name: 'Oracle', 
      color: 'bg-red-600', 
      fullName: 'Oracle Cloud',
      logo: OracleLogo,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200'
    },
    { 
      id: 'ibm', 
      name: 'IBM', 
      color: 'bg-blue-800', 
      fullName: 'IBM Cloud',
      logo: IBMCloudLogo,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
  ];

  // Service data with cost information and pricing links
  const serviceData = useMemo(() => [
    {
      id: 1, category: 'compute', name: 'Virtual Machines', 
      aws: 'EC2', azure: 'Virtual Machines', gcp: 'Compute Engine', oracle: 'Compute', ibm: 'Virtual Servers',
      description: 'Scalable virtual computing instances', useCase: 'General-purpose computing, web hosting', 
      pricing: 'Pay-per-hour', maturity: 5,
      costs: { aws: '$0.0116/hour', azure: '$0.012/hour', gcp: '$0.0104/hour', oracle: '$0.011/hour', ibm: '$0.013/hour' },
      costType: 'hourly',
      pricingLinks: {
        aws: 'https://aws.amazon.com/ec2/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/virtual-machines/',
        gcp: 'https://cloud.google.com/compute/pricing',
        oracle: 'https://www.oracle.com/cloud/compute/pricing/',
        ibm: 'https://www.ibm.com/cloud/virtual-servers/pricing'
      }
    },
    {
      id: 2, category: 'compute', name: 'Container Orchestration',
      aws: 'EKS', azure: 'AKS', gcp: 'GKE', oracle: 'Container Engine', ibm: 'Kubernetes Service',
      description: 'Managed Kubernetes clusters', useCase: 'Microservices, containerized apps',
      pricing: 'Cluster + compute costs', maturity: 5,
      costs: { aws: '$0.10/hour + compute', azure: 'Free + compute', gcp: '$0.10/hour + compute', oracle: '$0.08/hour + compute', ibm: '$0.11/hour + compute' },
      costType: 'cluster',
      pricingLinks: {
        aws: 'https://aws.amazon.com/eks/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/kubernetes-service/',
        gcp: 'https://cloud.google.com/kubernetes-engine/pricing',
        oracle: 'https://www.oracle.com/cloud/cloud-native/container-engine-kubernetes/pricing/',
        ibm: 'https://www.ibm.com/cloud/kubernetes-service/pricing'
      }
    },
    {
      id: 3, category: 'compute', name: 'Serverless Functions',
      aws: 'Lambda', azure: 'Functions', gcp: 'Cloud Functions', oracle: 'Functions', ibm: 'Functions',
      description: 'Event-driven serverless computing', useCase: 'API backends, event processing',
      pricing: 'Per-execution', maturity: 5,
      costs: { aws: '$0.20 per 1M requests', azure: '$0.20 per 1M requests', gcp: '$0.40 per 1M requests', oracle: '$0.20 per 1M requests', ibm: '$0.17 per 1M requests' },
      costType: 'requests',
      pricingLinks: {
        aws: 'https://aws.amazon.com/lambda/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/functions/',
        gcp: 'https://cloud.google.com/functions/pricing',
        oracle: 'https://www.oracle.com/cloud/cloud-native/functions/pricing/',
        ibm: 'https://www.ibm.com/cloud/functions/pricing'
      }
    },
    {
      id: 4, category: 'storage', name: 'Object Storage',
      aws: 'S3', azure: 'Blob Storage', gcp: 'Cloud Storage', oracle: 'Object Storage', ibm: 'Cloud Object Storage',
      description: 'Scalable object storage', useCase: 'Backup, static websites, data lake',
      pricing: 'Per GB stored', maturity: 5,
      costs: { aws: '$0.023/GB/month', azure: '$0.0184/GB/month', gcp: '$0.020/GB/month', oracle: '$0.0255/GB/month', ibm: '$0.024/GB/month' },
      costType: 'storage',
      pricingLinks: {
        aws: 'https://aws.amazon.com/s3/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/storage/blobs/',
        gcp: 'https://cloud.google.com/storage/pricing',
        oracle: 'https://www.oracle.com/cloud/storage/object-storage/pricing/',
        ibm: 'https://www.ibm.com/cloud/object-storage/pricing'
      }
    },
    {
      id: 5, category: 'storage', name: 'Block Storage',
      aws: 'EBS', azure: 'Disk Storage', gcp: 'Persistent Disk', oracle: 'Block Volume', ibm: 'Block Storage',
      description: 'High-performance block storage', useCase: 'Database storage, file systems',
      pricing: 'Per GB + IOPS', maturity: 5,
      costs: { aws: '$0.10/GB/month', azure: '$0.048/GB/month', gcp: '$0.040/GB/month', oracle: '$0.0255/GB/month', ibm: '$0.10/GB/month' },
      costType: 'storage',
      pricingLinks: {
        aws: 'https://aws.amazon.com/ebs/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/managed-disks/',
        gcp: 'https://cloud.google.com/compute/disks-image-pricing',
        oracle: 'https://www.oracle.com/cloud/storage/block-volumes/pricing/',
        ibm: 'https://www.ibm.com/cloud/block-storage/pricing'
      }
    },
    {
      id: 6, category: 'database', name: 'Relational Database',
      aws: 'RDS', azure: 'SQL Database', gcp: 'Cloud SQL', oracle: 'Autonomous Database', ibm: 'Db2',
      description: 'Managed relational databases', useCase: 'Traditional applications, OLTP',
      pricing: 'Instance + storage', maturity: 5,
      costs: { aws: '$0.017/hour', azure: '$0.0208/hour', gcp: '$0.0150/hour', oracle: '$0.016/hour', ibm: '$0.019/hour' },
      costType: 'hourly',
      pricingLinks: {
        aws: 'https://aws.amazon.com/rds/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/azure-sql-database/',
        gcp: 'https://cloud.google.com/sql/pricing',
        oracle: 'https://www.oracle.com/cloud/database/autonomous-database/pricing/',
        ibm: 'https://www.ibm.com/cloud/databases-for-postgresql/pricing'
      }
    },
    {
      id: 7, category: 'database', name: 'NoSQL Database',
      aws: 'DynamoDB', azure: 'Cosmos DB', gcp: 'Firestore', oracle: 'NoSQL Database', ibm: 'Cloudant',
      description: 'Managed NoSQL databases', useCase: 'Web apps, mobile backends',
      pricing: 'Request units + storage', maturity: 5,
      costs: { aws: '$0.25 per 1M reads', azure: '$0.008 per 100 RUs/s', gcp: '$0.18 per 100K operations', oracle: '$0.133 per 1M reads', ibm: '$1.00 per 1M reads' },
      costType: 'operations',
      pricingLinks: {
        aws: 'https://aws.amazon.com/dynamodb/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/cosmos-db/',
        gcp: 'https://cloud.google.com/firestore/pricing',
        oracle: 'https://www.oracle.com/cloud/database/nosql/pricing/',
        ibm: 'https://www.ibm.com/cloud/cloudant/pricing'
      }
    },
    {
      id: 8, category: 'networking', name: 'Load Balancer',
      aws: 'ELB', azure: 'Load Balancer', gcp: 'Load Balancing', oracle: 'Load Balancer', ibm: 'Load Balancer',
      description: 'Traffic distribution', useCase: 'High availability, scaling',
      pricing: 'Per hour + data processed', maturity: 5,
      costs: { aws: '$0.0225/hour', azure: '$0.025/hour', gcp: '$0.025/hour', oracle: '$0.020/hour', ibm: '$0.030/hour' },
      costType: 'hourly',
      pricingLinks: {
        aws: 'https://aws.amazon.com/elasticloadbalancing/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/load-balancer/',
        gcp: 'https://cloud.google.com/load-balancing/pricing',
        oracle: 'https://www.oracle.com/cloud/networking/load-balancer/pricing/',
        ibm: 'https://www.ibm.com/cloud/load-balancer/pricing'
      }
    },
    {
      id: 9, category: 'networking', name: 'CDN',
      aws: 'CloudFront', azure: 'CDN', gcp: 'Cloud CDN', oracle: 'CDN', ibm: 'CDN',
      description: 'Content delivery network', useCase: 'Global content distribution',
      pricing: 'Data transfer', maturity: 5,
      costs: { aws: '$0.085/GB', azure: '$0.087/GB', gcp: '$0.08/GB', oracle: '$0.06/GB', ibm: '$0.09/GB' },
      costType: 'transfer',
      pricingLinks: {
        aws: 'https://aws.amazon.com/cloudfront/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/cdn/',
        gcp: 'https://cloud.google.com/cdn/pricing',
        oracle: 'https://www.oracle.com/cloud/networking/cdn/pricing/',
        ibm: 'https://www.ibm.com/cloud/cdn/pricing'
      }
    },
    {
      id: 10, category: 'security', name: 'Identity Management',
      aws: 'IAM', azure: 'Active Directory', gcp: 'Identity and Access Management', oracle: 'Identity Cloud', ibm: 'Security Identity',
      description: 'User access control', useCase: 'Authentication, authorization',
      pricing: 'Free tier available', maturity: 5,
      costs: { aws: 'Free', azure: '$6/user/month', gcp: 'Free', oracle: '$4/user/month', ibm: '$3/user/month' },
      costType: 'user',
      pricingLinks: {
        aws: 'https://aws.amazon.com/iam/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/active-directory/',
        gcp: 'https://cloud.google.com/identity/pricing',
        oracle: 'https://www.oracle.com/cloud/security/identity-management/pricing/',
        ibm: 'https://www.ibm.com/cloud/security-and-compliance/pricing'
      }
    }
  ], []);

  const categories = [
    { id: 'all', name: 'All Services', icon: Globe, color: 'bg-blue-500' },
    { id: 'compute', name: 'Compute', icon: Zap, color: 'bg-green-500' },
    { id: 'storage', name: 'Storage', icon: Database, color: 'bg-purple-500' },
    { id: 'database', name: 'Database', icon: Database, color: 'bg-red-500' },
    { id: 'networking', name: 'Networking', icon: Globe, color: 'bg-blue-500' },
    { id: 'security', name: 'Security', icon: Shield, color: 'bg-yellow-500' },
    { id: 'ai', name: 'AI/ML', icon: Brain, color: 'bg-pink-500' },
    { id: 'monitoring', name: 'Monitoring', icon: Monitor, color: 'bg-indigo-500' },
  ];

  const quizQuestions = [
    {
      question: "What's your primary use case?",
      options: [
        { value: 'web', label: 'Web Application' },
        { value: 'mobile', label: 'Mobile Backend' },
        { value: 'analytics', label: 'Data Analytics' },
        { value: 'ml', label: 'Machine Learning' },
        { value: 'enterprise', label: 'Enterprise Migration' }
      ]
    },
    {
      question: "What's your expected scale?",
      options: [
        { value: 'small', label: 'Small (< 1000 users)' },
        { value: 'medium', label: 'Medium (1K-100K users)' },
        { value: 'large', label: 'Large (100K+ users)' },
        { value: 'enterprise', label: 'Enterprise Scale' }
      ]
    },
    {
      question: "What's your budget preference?",
      options: [
        { value: 'minimal', label: 'Minimal Cost' },
        { value: 'balanced', label: 'Balanced Cost/Performance' },
        { value: 'performance', label: 'Performance First' },
        { value: 'enterprise', label: 'Enterprise Budget' }
      ]
    }
  ];

  const filteredServices = useMemo(() => {
    return serviceData.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.aws?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.azure?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.gcp?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, serviceData]);

  const toggleCompare = (service) => {
    setCompareList(prev => {
      const isAlreadyComparing = prev.find(s => s.id === service.id);
      if (isAlreadyComparing) {
        return prev.filter(s => s.id !== service.id);
      } else if (prev.length < 3) {
        return [...prev, service];
      }
      return prev;
    });
  };

  const getRecommendations = () => {
    const { useCase } = quizAnswers;
    let recommendations = [];

    if (useCase === 'web') {
      recommendations.push(
        serviceData.find(s => s.category === 'compute' && s.name === 'Virtual Machines'),
        serviceData.find(s => s.category === 'database' && s.name === 'Relational Database'),
        serviceData.find(s => s.category === 'storage' && s.name === 'Object Storage')
      );
    } else if (useCase === 'analytics') {
      recommendations.push(
        serviceData.find(s => s.category === 'storage' && s.name === 'Object Storage'),
        serviceData.find(s => s.category === 'compute' && s.name === 'Virtual Machines')
      );
    }

    return recommendations.filter(Boolean);
  };

  const CategoryStats = () => {
    const stats = categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? serviceData.length : serviceData.filter(s => s.category === cat.id).length
    }));

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.id}
              onClick={() => setSelectedCategory(stat.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === stat.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-medium">{stat.name}</div>
              <div className="text-xs text-gray-500">{stat.count} services</div>
            </button>
          );
        })}
      </div>
    );
  };

  const ServiceCard = ({ service }) => {
    const isComparing = compareList.find(s => s.id === service.id);
    
    return (
      <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(service.maturity)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <button
                onClick={() => toggleCompare(service)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  isComparing 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isComparing ? 'Remove' : 'Compare'}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            {selectedProviders.map(providerId => {
              const provider = providers.find(p => p.id === providerId);
              const serviceName = service[providerId];
              
              return serviceName ? (
                <div key={providerId} className="flex items-center justify-between py-2 px-3 border border-gray-100 rounded-md bg-gray-50">
                  <div className="flex items-center gap-3">
                    <provider.logo />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{provider.name}</span>
                      <div className="text-xs text-gray-500">{provider.fullName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700 bg-white px-2 py-1 rounded border">
                      {serviceName}
                    </span>
                    {service.pricingLinks && service.pricingLinks[providerId] && (
                      <a
                        href={service.pricingLinks[providerId]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                        title="View official pricing"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ) : null;
            })}
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Use Case: {service.useCase}</span>
              <span>Pricing: {service.pricing}</span>
            </div>
            
            {service.costs && (
              <div className="bg-gray-50 rounded p-3">
                <div className="text-xs font-semibold text-gray-700 mb-2">Cost Comparison ({service.costType})</div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProviders.map(providerId => {
                    const provider = providers.find(p => p.id === providerId);
                    const cost = service.costs[providerId];
                    return cost ? (
                      <div key={providerId} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded ${provider.color}`}></div>
                          {provider.name}
                        </span>
                        <span className="font-mono font-semibold">{cost}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Navigate Your Cloud Journey with <span className="text-blue-600">Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Compare cloud services, analyze costs, and make informed decisions across AWS, Azure, GCP, Oracle, and IBM Cloud. 
            Your comprehensive guide to cloud service selection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setActiveView('compare')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Comparing Services
            </button>
            <button
              onClick={() => setActiveView('wizard')}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Recommendations
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: Filter,
            title: 'Service Comparison',
            description: 'Compare 10+ cloud services across 5 major providers with detailed feature analysis.',
            color: 'bg-blue-500'
          },
          {
            icon: Calculator,
            title: 'Cost Analysis',
            description: 'Real pricing data with direct links to official provider documentation.',
            color: 'bg-green-500'
          },
          {
            icon: Users,
            title: 'Smart Recommendations',
            description: 'Get personalized service suggestions based on your use case and requirements.',
            color: 'bg-purple-500'
          },
          {
            icon: BarChart3,
            title: 'Provider Analytics',
            description: 'Comprehensive insights into service coverage and provider comparisons.',
            color: 'bg-orange-500'
          }
        ].map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Providers Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Supported Cloud Providers</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {providers.map(provider => (
            <div key={provider.id} className="text-center">
              <div className="mb-4">
                <provider.logo />
              </div>
              <h3 className="font-semibold text-lg">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.fullName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CompareView = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {providers.map(provider => (
              <button
                key={provider.id}
                onClick={() => {
                  const isSelected = selectedProviders.includes(provider.id);
                  if (isSelected) {
                    setSelectedProviders(prev => prev.filter(p => p !== provider.id));
                  } else {
                    setSelectedProviders(prev => [...prev, provider.id]);
                  }
                }}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  selectedProviders.includes(provider.id)
                    ? `${provider.borderColor} ${provider.bgColor} ${provider.textColor}`
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {provider.name}
              </button>
            ))}
          </div>
        </div>
        
        <CategoryStats />
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Compare List */}
      {compareList.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-blue-200">
          <h3 className="text-lg font-semibold mb-4">Comparison List ({compareList.length}/3)</h3>
          <div className="space-y-2">
            {compareList.map(service => (
              <div key={service.id} className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded">
                <span className="font-medium">{service.name}</span>
                <button
                  onClick={() => toggleCompare(service)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const WizardView = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Get Personalized Recommendations</h2>
        
        {quizStep < quizQuestions.length ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">{quizQuestions[quizStep].question}</h3>
            <div className="space-y-3">
              {quizQuestions[quizStep].options.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    setQuizAnswers(prev => ({
                      ...prev,
                      [quizQuestions[quizStep].question]: option.value
                    }));
                    setQuizStep(prev => prev + 1);
                  }}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Recommendations</h3>
            <div className="space-y-4">
              {getRecommendations().map(service => (
                <div key={service.id} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setQuizStep(0);
                setQuizAnswers({});
              }}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Provider Analytics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {providers.map(provider => {
            const serviceCount = serviceData.filter(service => service[provider.id]).length;
            return (
              <div key={provider.id} className="text-center p-4 border rounded-lg">
                <div className="mb-2">
                  <provider.logo />
                </div>
                <h3 className="font-semibold">{provider.name}</h3>
                <p className="text-2xl font-bold text-blue-600">{serviceCount}</p>
                <p className="text-sm text-gray-600">services available</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const CalculatorView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Cost Calculator</h2>
        <p className="text-gray-600">Calculate estimated costs for your cloud infrastructure.</p>
        {/* Add cost calculator implementation here */}
      </div>
    </div>
  );

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'compare':
        return <CompareView />;
      case 'wizard':
        return <WizardView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'calculator':
        return <CalculatorView />;
      default:
        return <HomeView />;
    }
  };

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
                { id: 'home', label: 'Home', icon: Globe },
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
                      activeView === nav.id
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
        {renderView()}
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