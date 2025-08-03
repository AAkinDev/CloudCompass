import React, { useState, useMemo } from 'react';
import { Search, Filter, BarChart3, Users, Zap, Database, Shield, Globe, Monitor, Brain, Calculator, Download, Star, ExternalLink } from 'lucide-react';

const CloudCompass = () => {
  const [activeView, setActiveView] = useState('compare');
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
      className="w-8 h-6 object-contain"
    />
  );

  const AzureLogo = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudCompass/main/public/assets/logos/azure-logo.png" 
      alt="Microsoft Azure" 
      className="w-6 h-6 object-contain"
    />
  );

  const GoogleCloudLogo = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudCompass/main/public/assets/logos/gcp-logo.png" 
      alt="Google Cloud Platform" 
      className="w-6 h-6 object-contain"
    />
  );

  const OracleLogo = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudCompass/main/public/assets/logos/oracle-logo.png" 
      alt="Oracle Cloud" 
      className="w-8 h-6 object-contain"
    />
  );

  const IBMCloudLogo = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudCompass/main/public/assets/logos/ibm-logo.png" 
      alt="IBM Cloud" 
      className="w-8 h-6 object-contain"
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
  const serviceData = [
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
  ];

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
  }, [searchTerm, selectedCategory]);

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
    const { useCase, scale, budget } = quizAnswers;
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

  // Component implementations would continue here...
  // [Rest of the component code from the original artifact]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CloudCompass</h1>
                <p className="text-sm text-gray-600">Navigate Your Cloud Journey</p>
              </div>
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
            <div className="text-sm text-gray-600">
              © 2025 CloudCompass by AAkinDev. Navigate your cloud journey with confidence.
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