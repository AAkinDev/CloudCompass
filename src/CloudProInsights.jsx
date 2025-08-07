import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, Filter, BarChart3, Users, Zap, Database, Shield, Globe, Monitor, Brain, Calculator, Star, RotateCcw } from 'lucide-react';
import CloudProInsightsLogo from './components/CloudProInsightsLogo';
import { accurateCostData } from './data/accurateCostData';
// Removed unused imports - now using NotesSection component


const CloudProInsights = () => {
  const [activeView, setActiveView] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProviders, setSelectedProviders] = useState(['aws', 'azure', 'gcp']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [compareList, setCompareList] = useState([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  // Logo components using actual logo images from GitHub repo
  const AWSLogo = () => (
    <a
      href="https://aws.amazon.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity flex items-center justify-center"
      title="Visit Amazon Web Services platform"
    >
      <img 
        src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/aws-logo.png" 
        alt="AWS" 
        className="w-16 h-12 sm:w-20 sm:h-16 object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = '<div class="w-16 h-12 sm:w-20 sm:h-16 bg-orange-500 rounded flex items-center justify-center text-white text-sm font-bold">AWS</div>';
        }}
      />
    </a>
  );

  const AzureLogo = () => (
    <a
      href="https://azure.microsoft.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity flex items-center justify-center"
      title="Visit Microsoft Azure platform"
    >
      <img 
        src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/azure-logo.png" 
        alt="Microsoft Azure" 
        className="w-16 h-12 sm:w-20 sm:h-16 object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = '<div class="w-16 h-12 sm:w-20 sm:h-16 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">Az</div>';
        }}
      />
    </a>
  );

  const GoogleCloudLogo = () => (
    <a
      href="https://cloud.google.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity flex items-center justify-center"
      title="Visit Google Cloud Platform"
    >
      <img 
        src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/gcp-logo.png" 
        alt="Google Cloud Platform" 
        className="w-16 h-12 sm:w-20 sm:h-16 object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = '<div class="w-16 h-12 sm:w-20 sm:h-16 bg-red-500 rounded flex items-center justify-center text-white text-sm font-bold">GCP</div>';
        }}
      />
    </a>
  );

  const OracleLogo = () => (
    <a
      href="https://www.oracle.com/cloud/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity flex items-center justify-center"
      title="Visit Oracle Cloud platform"
    >
      <img 
        src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/oracle-logo.png" 
        alt="Oracle Cloud" 
        className="w-16 h-12 sm:w-20 sm:h-16 object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = '<div class="w-16 h-12 sm:w-20 sm:h-16 bg-red-600 rounded flex items-center justify-center text-white text-sm font-bold">OCI</div>';
        }}
      />
    </a>
  );

  const IBMCloudLogo = () => (
    <a
      href="https://www.ibm.com/cloud/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity flex items-center justify-center"
      title="Visit IBM Cloud platform"
    >
      <img 
        src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/ibm-logo.png" 
        alt="IBM Cloud" 
        className="w-16 h-12 sm:w-20 sm:h-16 object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentNode.innerHTML = '<div class="w-16 h-12 sm:w-20 sm:h-16 bg-blue-800 rounded flex items-center justify-center text-white text-sm font-bold">IBM</div>';
        }}
      />
    </a>
  );

  // Non-clickable logo components for filter cards
  const AWSLogoFilter = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/aws-logo.png" 
      alt="AWS" 
      className="w-8 h-6 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">AWS</div>';
      }}
    />
  );

  const AzureLogoFilter = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/azure-logo.png" 
      alt="Microsoft Azure" 
      className="w-8 h-6 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">Az</div>';
      }}
    />
  );

  const GoogleCloudLogoFilter = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/gcp-logo.png" 
      alt="Google Cloud Platform" 
      className="w-8 h-6 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">GCP</div>';
      }}
    />
  );

  const OracleLogoFilter = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/oracle-logo.png" 
      alt="Oracle Cloud" 
      className="w-8 h-6 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">OCI</div>';
      }}
    />
  );

  const IBMCloudLogoFilter = () => (
    <img 
      src="https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main/public/assets/logos/ibm-logo.png" 
      alt="IBM Cloud" 
      className="w-8 h-6 object-contain"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '<div class="w-8 h-6 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">IBM</div>';
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
      logoFilter: AWSLogoFilter,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
      platformUrl: 'https://aws.amazon.com/'
    },
    { 
      id: 'azure', 
      name: 'Azure', 
      color: 'bg-blue-600', 
      fullName: 'Microsoft Azure',
      logo: AzureLogo,
      logoFilter: AzureLogoFilter,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      platformUrl: 'https://azure.microsoft.com/'
    },
    { 
      id: 'gcp', 
      name: 'GCP', 
      color: 'bg-red-500', 
      fullName: 'Google Cloud Platform',
      logo: GoogleCloudLogo,
      logoFilter: GoogleCloudLogoFilter,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      platformUrl: 'https://cloud.google.com/'
    },
    { 
      id: 'oracle', 
      name: 'Oracle', 
      color: 'bg-red-600', 
      fullName: 'Oracle Cloud',
      logo: OracleLogo,
      logoFilter: OracleLogoFilter,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      platformUrl: 'https://www.oracle.com/cloud/'
    },
    { 
      id: 'ibm', 
      name: 'IBM', 
      color: 'bg-blue-800', 
      fullName: 'IBM Cloud',
      logo: IBMCloudLogo,
      logoFilter: IBMCloudLogoFilter,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      platformUrl: 'https://www.ibm.com/cloud/'
    },
  ];

  // Service data with comprehensive comparison metrics
  const serviceData = useMemo(() => [
    {
      id: 1, category: 'compute', name: 'Virtual Machines', 
      aws: 'EC2', azure: 'Virtual Machines', gcp: 'Compute Engine', oracle: 'Compute', ibm: 'Virtual Servers',
      description: 'Scalable virtual computing instances', useCase: 'General-purpose computing, web hosting', 
      pricing: 'Pay-per-hour', maturity: 5,
      costs: { aws: '$0.0116/hour', azure: '$0.012/hour', gcp: '$0.0104/hour', oracle: '$0.011/hour', ibm: '$0.013/hour' },
      costType: 'hourly',
      security: { aws: 'AES-256 encryption, IAM, VPC', azure: 'BitLocker, Azure AD, NSG', gcp: 'AES-256, IAM, VPC', oracle: 'AES-256, IAM, VCN', ibm: 'AES-256, IAM, VPC' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', azure: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', gcp: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', oracle: 'SOC 1/2/3, PCI DSS, HIPAA', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: '99.95% SLA, 400+ instance types', azure: '99.95% SLA, 400+ instance types', gcp: '99.95% SLA, 500+ machine types', oracle: '99.95% SLA, 200+ shapes', ibm: '99.95% SLA, 100+ profiles' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 25, azure: 60, gcp: 35, oracle: 30, ibm: 20 },
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
      security: { aws: 'Pod security, network policies, RBAC', azure: 'Pod security, network policies, RBAC', gcp: 'Pod security, network policies, RBAC', oracle: 'Pod security, network policies, RBAC', ibm: 'Pod security, network policies, RBAC' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA', azure: 'SOC 1/2/3, PCI DSS, HIPAA', gcp: 'SOC 1/2/3, PCI DSS, HIPAA', oracle: 'SOC 1/2/3, PCI DSS', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: '99.95% SLA, auto-scaling', azure: '99.95% SLA, auto-scaling', gcp: '99.95% SLA, auto-scaling', oracle: '99.95% SLA, auto-scaling', ibm: '99.95% SLA, auto-scaling' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 20, azure: 50, gcp: 30, oracle: 25, ibm: 15 },
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
      security: { aws: 'IAM, VPC, encryption at rest/transit', azure: 'Azure AD, VNet, encryption', gcp: 'IAM, VPC, encryption', oracle: 'IAM, VCN, encryption', ibm: 'IAM, VPC, encryption' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA', azure: 'SOC 1/2/3, PCI DSS, HIPAA', gcp: 'SOC 1/2/3, PCI DSS, HIPAA', oracle: 'SOC 1/2/3, PCI DSS', ibm: 'SOC 1/2/3, PCI DSS' },
      performance: { aws: 'Cold start < 100ms, auto-scaling', azure: 'Cold start < 100ms, auto-scaling', gcp: 'Cold start < 100ms, auto-scaling', oracle: 'Cold start < 100ms, auto-scaling', ibm: 'Cold start < 100ms, auto-scaling' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 22, azure: 55, gcp: 32, oracle: 28, ibm: 18 },
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
      security: { aws: 'AES-256, IAM, bucket policies', azure: 'AES-256, Azure AD, RBAC', gcp: 'AES-256, IAM, bucket policies', oracle: 'AES-256, IAM, bucket policies', ibm: 'AES-256, IAM, bucket policies' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', azure: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', gcp: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', oracle: 'SOC 1/2/3, PCI DSS, HIPAA', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: '99.999999999% durability, 99.99% availability', azure: '99.999999999% durability, 99.99% availability', gcp: '99.999999999% durability, 99.99% availability', oracle: '99.999999999% durability, 99.99% availability', ibm: '99.999999999% durability, 99.99% availability' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 25, azure: 60, gcp: 35, oracle: 30, ibm: 20 },
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
      security: { aws: 'AES-256 encryption, IAM, VPC', azure: 'BitLocker, Azure AD, NSG', gcp: 'AES-256, IAM, VPC', oracle: 'AES-256, IAM, VCN', ibm: 'AES-256, IAM, VPC' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA', azure: 'SOC 1/2/3, PCI DSS, HIPAA', gcp: 'SOC 1/2/3, PCI DSS, HIPAA', oracle: 'SOC 1/2/3, PCI DSS', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: 'Up to 64,000 IOPS, 1,000 MB/s', azure: 'Up to 80,000 IOPS, 2,000 MB/s', gcp: 'Up to 64,000 IOPS, 1,000 MB/s', oracle: 'Up to 50,000 IOPS, 800 MB/s', ibm: 'Up to 60,000 IOPS, 1,000 MB/s' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 25, azure: 60, gcp: 35, oracle: 30, ibm: 20 },
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
      security: { aws: 'AES-256, IAM, VPC, SSL/TLS', azure: 'AES-256, Azure AD, VNet, SSL/TLS', gcp: 'AES-256, IAM, VPC, SSL/TLS', oracle: 'AES-256, IAM, VCN, SSL/TLS', ibm: 'AES-256, IAM, VPC, SSL/TLS' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', azure: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', gcp: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', oracle: 'SOC 1/2/3, PCI DSS, HIPAA', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: '99.95% SLA, auto-scaling, read replicas', azure: '99.995% SLA, auto-scaling, read replicas', gcp: '99.95% SLA, auto-scaling, read replicas', oracle: '99.995% SLA, auto-scaling, read replicas', ibm: '99.95% SLA, auto-scaling, read replicas' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 20, azure: 50, gcp: 30, oracle: 25, ibm: 15 },
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
      security: { aws: 'AES-256, IAM, VPC, point-in-time recovery', azure: 'AES-256, Azure AD, VNet, point-in-time recovery', gcp: 'AES-256, IAM, VPC, point-in-time recovery', oracle: 'AES-256, IAM, VCN, point-in-time recovery', ibm: 'AES-256, IAM, VPC, point-in-time recovery' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA', azure: 'SOC 1/2/3, PCI DSS, HIPAA', gcp: 'SOC 1/2/3, PCI DSS, HIPAA', oracle: 'SOC 1/2/3, PCI DSS', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: 'Single-digit ms latency, auto-scaling', azure: 'Single-digit ms latency, auto-scaling', gcp: 'Single-digit ms latency, auto-scaling', oracle: 'Single-digit ms latency, auto-scaling', ibm: 'Single-digit ms latency, auto-scaling' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 18, azure: 45, gcp: 28, oracle: 22, ibm: 12 },
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
      security: { aws: 'SSL/TLS termination, WAF integration, DDoS protection', azure: 'SSL/TLS termination, WAF integration, DDoS protection', gcp: 'SSL/TLS termination, WAF integration, DDoS protection', oracle: 'SSL/TLS termination, WAF integration, DDoS protection', ibm: 'SSL/TLS termination, WAF integration, DDoS protection' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA', azure: 'SOC 1/2/3, PCI DSS, HIPAA', gcp: 'SOC 1/2/3, PCI DSS, HIPAA', oracle: 'SOC 1/2/3, PCI DSS', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: '99.99% SLA, auto-scaling, health checks', azure: '99.99% SLA, auto-scaling, health checks', gcp: '99.99% SLA, auto-scaling, health checks', oracle: '99.99% SLA, auto-scaling, health checks', ibm: '99.99% SLA, auto-scaling, health checks' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 22, azure: 55, gcp: 32, oracle: 28, ibm: 18 },
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
      security: { aws: 'SSL/TLS, WAF, DDoS protection, geo-blocking', azure: 'SSL/TLS, WAF, DDoS protection, geo-blocking', gcp: 'SSL/TLS, WAF, DDoS protection, geo-blocking', oracle: 'SSL/TLS, WAF, DDoS protection, geo-blocking', ibm: 'SSL/TLS, WAF, DDoS protection, geo-blocking' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS', azure: 'SOC 1/2/3, PCI DSS', gcp: 'SOC 1/2/3, PCI DSS', oracle: 'SOC 1/2/3, PCI DSS', ibm: 'SOC 1/2/3, PCI DSS' },
      performance: { aws: '200+ edge locations, < 50ms latency', azure: '200+ edge locations, < 50ms latency', gcp: '200+ edge locations, < 50ms latency', oracle: '150+ edge locations, < 50ms latency', ibm: '100+ edge locations, < 50ms latency' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 200, azure: 200, gcp: 200, oracle: 150, ibm: 100 },
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
      security: { aws: 'MFA, SSO, fine-grained permissions, audit logs', azure: 'MFA, SSO, fine-grained permissions, audit logs', gcp: 'MFA, SSO, fine-grained permissions, audit logs', oracle: 'MFA, SSO, fine-grained permissions, audit logs', ibm: 'MFA, SSO, fine-grained permissions, audit logs' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', azure: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', gcp: 'SOC 1/2/3, PCI DSS, HIPAA, FedRAMP', oracle: 'SOC 1/2/3, PCI DSS, HIPAA', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: '99.9% SLA, global availability', azure: '99.9% SLA, global availability', gcp: '99.9% SLA, global availability', oracle: '99.9% SLA, global availability', ibm: '99.9% SLA, global availability' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 25, azure: 60, gcp: 35, oracle: 30, ibm: 20 },
      pricingLinks: {
        aws: 'https://aws.amazon.com/iam/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/active-directory/',
        gcp: 'https://cloud.google.com/identity/pricing',
        oracle: 'https://www.oracle.com/cloud/security/identity-management/pricing/',
        ibm: 'https://www.ibm.com/cloud/security-and-compliance/pricing'
      }
    },
    {
      id: 11, category: 'ai', name: 'Machine Learning',
      aws: 'SageMaker', azure: 'Machine Learning', gcp: 'Vertex AI', oracle: 'AI Services', ibm: 'Watson Studio',
      description: 'Managed ML platform', useCase: 'AI/ML model training and deployment',
      pricing: 'Compute + storage + API calls', maturity: 4,
      costs: { aws: '$0.046/hour training', azure: '$0.05/hour training', gcp: '$0.044/hour training', oracle: '$0.048/hour training', ibm: '$0.052/hour training' },
      costType: 'compute',
      security: { aws: 'AES-256, IAM, VPC, model encryption', azure: 'AES-256, Azure AD, VNet, model encryption', gcp: 'AES-256, IAM, VPC, model encryption', oracle: 'AES-256, IAM, VCN, model encryption', ibm: 'AES-256, IAM, VPC, model encryption' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA', azure: 'SOC 1/2/3, PCI DSS, HIPAA', gcp: 'SOC 1/2/3, PCI DSS, HIPAA', oracle: 'SOC 1/2/3, PCI DSS', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: 'Auto-scaling, distributed training, model optimization', azure: 'Auto-scaling, distributed training, model optimization', gcp: 'Auto-scaling, distributed training, model optimization', oracle: 'Auto-scaling, distributed training, model optimization', ibm: 'Auto-scaling, distributed training, model optimization' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 15, azure: 30, gcp: 20, oracle: 18, ibm: 12 },
      pricingLinks: {
        aws: 'https://aws.amazon.com/sagemaker/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/machine-learning/',
        gcp: 'https://cloud.google.com/vertex-ai/pricing',
        oracle: 'https://www.oracle.com/cloud/ai-services/pricing/',
        ibm: 'https://www.ibm.com/cloud/watson-studio/pricing'
      }
    },
    {
      id: 12, category: 'monitoring', name: 'Application Monitoring',
      aws: 'CloudWatch', azure: 'Application Insights', gcp: 'Cloud Monitoring', oracle: 'Application Performance Monitoring', ibm: 'Cloud Monitoring',
      description: 'Application performance monitoring', useCase: 'APM, observability, troubleshooting',
      pricing: 'Per metric + data ingestion', maturity: 5,
      costs: { aws: '$0.30 per metric', azure: '$0.25 per metric', gcp: '$0.28 per metric', oracle: '$0.32 per metric', ibm: '$0.35 per metric' },
      costType: 'metric',
      security: { aws: 'AES-256, IAM, VPC, data encryption', azure: 'AES-256, Azure AD, VNet, data encryption', gcp: 'AES-256, IAM, VPC, data encryption', oracle: 'AES-256, IAM, VCN, data encryption', ibm: 'AES-256, IAM, VPC, data encryption' },
      compliance: { aws: 'SOC 1/2/3, PCI DSS, HIPAA', azure: 'SOC 1/2/3, PCI DSS, HIPAA', gcp: 'SOC 1/2/3, PCI DSS, HIPAA', oracle: 'SOC 1/2/3, PCI DSS', ibm: 'SOC 1/2/3, PCI DSS, HIPAA' },
      performance: { aws: 'Real-time metrics, custom dashboards, alerting', azure: 'Real-time metrics, custom dashboards, alerting', gcp: 'Real-time metrics, custom dashboards, alerting', oracle: 'Real-time metrics, custom dashboards, alerting', ibm: 'Real-time metrics, custom dashboards, alerting' },
      support: { aws: '24/7, 4 tiers', azure: '24/7, 4 tiers', gcp: '24/7, 4 tiers', oracle: '24/7, 3 tiers', ibm: '24/7, 4 tiers' },
      regions: { aws: 20, azure: 50, gcp: 30, oracle: 25, ibm: 15 },
      pricingLinks: {
        aws: 'https://aws.amazon.com/cloudwatch/pricing/',
        azure: 'https://azure.microsoft.com/en-us/pricing/details/application-insights/',
        gcp: 'https://cloud.google.com/monitoring/pricing',
        oracle: 'https://www.oracle.com/cloud/application-performance-monitoring/pricing/',
        ibm: 'https://www.ibm.com/cloud/monitoring/pricing'
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

  const resetComparison = () => {
    setCompareList([]);
    setSelectedProviders(['aws', 'azure', 'gcp', 'oracle', 'ibm']);
    setSelectedCategory('all');
    setSearchTerm('');
  };

  const getRecommendations = () => {
    const { useCase, scale, budget } = quizAnswers;
    let recommendations = [];

    // Enhanced recommendation logic based on use case, scale, and budget
    if (useCase === 'web') {
      recommendations.push(
        {
          ...serviceData.find(s => s.category === 'compute' && s.name === 'Virtual Machines'),
          reason: 'Essential for hosting web applications',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'database' && s.name === 'Relational Database'),
          reason: 'Store user data and application state',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'storage' && s.name === 'Object Storage'),
          reason: 'Store static assets and user uploads',
          priority: 'Medium'
        },
        {
          ...serviceData.find(s => s.category === 'networking' && s.name === 'Load Balancer'),
          reason: 'Distribute traffic across multiple instances',
          priority: scale === 'large' || scale === 'enterprise' ? 'High' : 'Medium'
        }
      );
    } else if (useCase === 'mobile') {
      recommendations.push(
        {
          ...serviceData.find(s => s.category === 'compute' && s.name === 'Serverless Functions'),
          reason: 'Handle mobile app backend logic efficiently',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'database' && s.name === 'NoSQL Database'),
          reason: 'Store mobile app data with flexible schema',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'storage' && s.name === 'Object Storage'),
          reason: 'Store app assets and user content',
          priority: 'Medium'
        }
      );
    } else if (useCase === 'analytics') {
      recommendations.push(
        {
          ...serviceData.find(s => s.category === 'storage' && s.name === 'Object Storage'),
          reason: 'Store large datasets for analysis',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'compute' && s.name === 'Virtual Machines'),
          reason: 'Process analytics workloads',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'ai' && s.name === 'Machine Learning'),
          reason: 'Build and deploy ML models',
          priority: 'Medium'
        }
      );
    } else if (useCase === 'ml') {
      recommendations.push(
        {
          ...serviceData.find(s => s.category === 'ai' && s.name === 'Machine Learning'),
          reason: 'Core ML platform for model training and deployment',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'compute' && s.name === 'Virtual Machines'),
          reason: 'High-performance compute for training',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'storage' && s.name === 'Object Storage'),
          reason: 'Store training data and model artifacts',
          priority: 'High'
        }
      );
    } else if (useCase === 'enterprise') {
      recommendations.push(
        {
          ...serviceData.find(s => s.category === 'compute' && s.name === 'Virtual Machines'),
          reason: 'Core infrastructure for enterprise workloads',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'database' && s.name === 'Relational Database'),
          reason: 'Enterprise-grade data management',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'security' && s.name === 'Identity Management'),
          reason: 'Enterprise security and access control',
          priority: 'High'
        },
        {
          ...serviceData.find(s => s.category === 'networking' && s.name === 'Load Balancer'),
          reason: 'High availability and scalability',
          priority: 'High'
        }
      );
    }

    // Filter recommendations based on budget
    if (budget === 'minimal') {
      recommendations = recommendations.filter(rec => 
        rec.costs && Object.values(rec.costs).some(cost => 
          cost === 'Free' || parseFloat(cost.replace(/[^0-9.]/g, '')) < 0.05
        )
      );
    } else if (budget === 'balanced') {
      // Keep all recommendations but prioritize cost-effective options
      recommendations.sort((a, b) => {
        const aCost = Math.min(...Object.values(a.costs || {}).map(cost => 
          cost === 'Free' ? 0 : parseFloat(cost.replace(/[^0-9.]/g, '')) || 999
        ));
        const bCost = Math.min(...Object.values(b.costs || {}).map(cost => 
          cost === 'Free' ? 0 : parseFloat(cost.replace(/[^0-9.]/g, '')) || 999
        ));
        return aCost - bCost;
      });
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
                    <a
                      href={provider.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                      title={`Visit ${provider.fullName} platform`}
                    >
                      <provider.logo />
                    </a>
                    <div>
                      <a
                        href={provider.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                        title={`Visit ${provider.fullName} platform`}
                      >
                        <span className="text-sm font-medium text-gray-900">{provider.name}</span>
                        <div className="text-xs text-gray-500">{provider.fullName}</div>
                      </a>
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
                        <span className="text-xs">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : null;
            })}
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Use Case: {service.useCase}</span>
              <span>Pricing: {service.pricing}</span>
            </div>
            
            {/* Cost Comparison */}
            {service.costs && (
              <div className="bg-gray-50 rounded p-3">
                <div className="text-xs font-semibold text-gray-700 mb-2">Cost Comparison ({service.costType})</div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProviders.map(providerId => {
                    const provider = providers.find(p => p.id === providerId);
                    const cost = service.costs[providerId];
                    return cost ? (
                      <div key={providerId} className="flex items-center justify-between text-xs">
                        <a
                          href={provider.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                          title={`Visit ${provider.fullName} platform`}
                        >
                          <div className={`w-2 h-2 rounded ${provider.color}`}></div>
                          {provider.name}
                        </a>
                        <span className="font-mono font-semibold">{cost}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Security Comparison */}
            {service.security && (
              <div className="bg-blue-50 rounded p-3">
                <div className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Security Features
                </div>
                <div className="space-y-1">
                  {selectedProviders.map(providerId => {
                    const provider = providers.find(p => p.id === providerId);
                    const security = service.security[providerId];
                    return security ? (
                      <div key={providerId} className="flex items-start justify-between text-xs">
                        <a
                          href={provider.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                          title={`Visit ${provider.fullName} platform`}
                        >
                          <div className={`w-2 h-2 rounded ${provider.color}`}></div>
                          {provider.name}
                        </a>
                        <span className="text-gray-600 max-w-xs text-right">{security}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Compliance Comparison */}
            {service.compliance && (
              <div className="bg-green-50 rounded p-3">
                <div className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Compliance Certifications
                </div>
                <div className="space-y-1">
                  {selectedProviders.map(providerId => {
                    const provider = providers.find(p => p.id === providerId);
                    const compliance = service.compliance[providerId];
                    return compliance ? (
                      <div key={providerId} className="flex items-start justify-between text-xs">
                        <a
                          href={provider.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                          title={`Visit ${provider.fullName} platform`}
                        >
                          <div className={`w-2 h-2 rounded ${provider.color}`}></div>
                          {provider.name}
                        </a>
                        <span className="text-gray-600 max-w-xs text-right">{compliance}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Performance Comparison */}
            {service.performance && (
              <div className="bg-purple-50 rounded p-3">
                <div className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Performance & SLA
                </div>
                <div className="space-y-1">
                  {selectedProviders.map(providerId => {
                    const provider = providers.find(p => p.id === providerId);
                    const performance = service.performance[providerId];
                    return performance ? (
                      <div key={providerId} className="flex items-start justify-between text-xs">
                        <a
                          href={provider.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                          title={`Visit ${provider.fullName} platform`}
                        >
                          <div className={`w-2 h-2 rounded ${provider.color}`}></div>
                          {provider.name}
                        </a>
                        <span className="text-gray-600 max-w-xs text-right">{performance}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Support & Regions */}
            <div className="grid grid-cols-2 gap-3">
              {service.support && (
                <div className="bg-orange-50 rounded p-3">
                  <div className="text-xs font-semibold text-orange-700 mb-2 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Support
                  </div>
                  <div className="space-y-1">
                    {selectedProviders.map(providerId => {
                      const provider = providers.find(p => p.id === providerId);
                      const support = service.support[providerId];
                      return support ? (
                        <div key={providerId} className="flex items-center justify-between text-xs">
                          <a
                            href={provider.platformUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                            title={`Visit ${provider.fullName} platform`}
                          >
                            <div className={`w-2 h-2 rounded ${provider.color}`}></div>
                            {provider.name}
                          </a>
                          <span className="text-gray-600">{support}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {service.regions && (
                <div className="bg-indigo-50 rounded p-3">
                  <div className="text-xs font-semibold text-indigo-700 mb-2 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Global Regions
                  </div>
                  <div className="space-y-1">
                    {selectedProviders.map(providerId => {
                      const provider = providers.find(p => p.id === providerId);
                      const regions = service.regions[providerId];
                      return regions ? (
                        <div key={providerId} className="flex items-center justify-between text-xs">
                          <a
                            href={provider.platformUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                            title={`Visit ${provider.fullName} platform`}
                          >
                            <div className={`w-2 h-2 rounded ${provider.color}`}></div>
                            {provider.name}
                          </a>
                          <span className="font-mono font-semibold">{regions} regions</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-8 sm:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            CloudProInsights™
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
            Smarter Cloud Decisions Start Here.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <button
              onClick={() => setActiveView('compare')}
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Comparing Services
            </button>
            <button
              onClick={() => setActiveView('wizard')}
              className="bg-white text-blue-600 border-2 border-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Recommendations
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
            <div key={index} className="bg-white rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center">
              {/* Icon Container - Fixed height for consistent alignment */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.color} rounded-lg flex items-center justify-center mb-4 sm:mb-6`}>
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              {/* Text Content - Perfectly aligned below icon */}
              <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Providers Section */}
      <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Supported Cloud Providers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
          {providers.map(provider => (
            <div key={provider.id} className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
              {/* Logo Container - Fixed height for consistent alignment */}
              <div className="flex items-center justify-center h-16 sm:h-20 w-full">
                <provider.logo />
              </div>
              {/* Text Content - Perfectly aligned below logo */}
              <div className="text-center space-y-1 sm:space-y-2">
                <h3 className="font-bold text-sm sm:text-lg text-gray-900">{provider.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">{provider.fullName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CompareView = () => {
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

    return (
      <div className="space-y-6">
        {/* Header with Controls */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Service Comparison</h2>
              <p className="text-gray-600 mt-1">Compare cloud services across providers with detailed metrics</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Table View
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'cards' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Card View
                </button>
              </div>

              {/* Provider Filter */}
              <div className="flex gap-1">
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
                    className={`p-2 rounded-lg border-2 transition-all ${
                      selectedProviders.includes(provider.id)
                        ? `${provider.borderColor} ${provider.bgColor} ${provider.textColor} shadow-sm`
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    title={`${selectedProviders.includes(provider.id) ? 'Hide' : 'Show'} ${provider.name} in comparison`}
                  >
                    <provider.logoFilter />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search and Category Filter */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CategoryStats />
              <button
                onClick={resetComparison}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                title="Reset all filters and comparison list"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 min-w-[200px]">
                      Service
                    </th>
                    {selectedProviders.map(providerId => {
                      const provider = providers.find(p => p.id === providerId);
                      return (
                        <th key={providerId} className="px-6 py-4 text-center text-sm font-semibold text-gray-900 min-w-[150px]">
                          <div className="flex flex-col items-center gap-2">
                            <a
                              href={provider.platformUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-80 transition-opacity"
                              title={`Visit ${provider.fullName} platform`}
                            >
                              <provider.logo />
                            </a>
                            <span>{provider.name}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredServices.map(service => (
                    <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>Use Case: {service.useCase}</span>
                              <span>•</span>
                              <span>Maturity: {service.maturity}/5</span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleCompare(service)}
                            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                              compareList.find(s => s.id === service.id)
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                          >
                            {compareList.find(s => s.id === service.id) ? 'Remove' : 'Compare'}
                          </button>
                        </div>
                      </td>
                      
                      {selectedProviders.map(providerId => {
                        const serviceName = service[providerId];
                        
                        return (
                          <td key={providerId} className="px-6 py-4 text-center">
                            {serviceName ? (
                              <div className="space-y-2">
                                <div className="font-medium text-gray-900">{serviceName}</div>
                                
                                {/* Cost */}
                                {service.costs && service.costs[providerId] && (
                                  <div className="text-sm">
                                    <div className="text-gray-500">Cost</div>
                                    <div className="font-semibold text-green-600">
                                      {service.costs[providerId]}
                                    </div>
                                  </div>
                                )}

                                {/* Security */}
                                {service.security && service.security[providerId] && (
                                  <div className="text-xs">
                                    <div className="text-gray-500">Security</div>
                                    <div className="text-gray-700 line-clamp-2">
                                      {service.security[providerId]}
                                    </div>
                                  </div>
                                )}

                                {/* Performance */}
                                {service.performance && service.performance[providerId] && (
                                  <div className="text-xs">
                                    <div className="text-gray-500">Performance</div>
                                    <div className="text-gray-700">
                                      {service.performance[providerId]}
                                    </div>
                                  </div>
                                )}

                                {/* Support */}
                                {service.support && service.support[providerId] && (
                                  <div className="text-xs">
                                    <div className="text-gray-500">Support</div>
                                    <div className="text-gray-700">
                                      {service.support[providerId]}
                                    </div>
                                  </div>
                                )}

                                {/* Regions */}
                                {service.regions && service.regions[providerId] && (
                                  <div className="text-xs">
                                    <div className="text-gray-500">Regions</div>
                                    <div className="text-gray-700 font-medium">
                                      {service.regions[providerId]}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-gray-400 text-sm">Not Available</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Card View */}
        {viewMode === 'cards' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Comparison Summary */}
        {compareList.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Comparison List ({compareList.length}/3)
              </h3>
              <button
                onClick={() => setCompareList([])}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {compareList.map(service => (
                <div key={service.id} className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-900">{service.name}</span>
                  <button
                    onClick={() => toggleCompare(service)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
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
  };

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
            <h3 className="text-lg font-semibold mb-4">Your Personalized Recommendations</h3>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Based on your profile:</h4>
              <div className="text-sm text-blue-700">
                <p>• Use Case: {quizAnswers["What's your primary use case?"]}</p>
                <p>• Scale: {quizAnswers["What's your expected scale?"]}</p>
                <p>• Budget: {quizAnswers["What's your budget preference?"]}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {getRecommendations().map((service, index) => (
                <div key={service.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">{service.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      service.priority === 'High' ? 'bg-red-100 text-red-800' :
                      service.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {service.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-700 mb-1">Why this service?</p>
                    <p className="text-sm text-gray-600">{service.reason}</p>
                  </div>
                  
                  {/* Show provider options */}
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-2">Available on:</p>
                    <div className="flex gap-2">
                      {selectedProviders.map(providerId => {
                        const provider = providers.find(p => p.id === providerId);
                        const serviceName = service[providerId];
                        return serviceName ? (
                          <div key={providerId} className="flex items-center gap-1 text-xs">
                            <provider.logo />
                            <span className="text-gray-600">{serviceName}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setActiveView('compare')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Compare These Services
              </button>
              <button
                onClick={() => {
                  setQuizStep(0);
                  setQuizAnswers({});
                }}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Start Over
              </button>
            </div>
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



  // Provider constants with accurate links and brand colors
  const PROVIDERS = [
    { id: 'aws', name: 'AWS', brand: '#FF9900', url: 'https://aws.amazon.com/pricing/' },
    { id: 'azure', name: 'Azure', brand: '#0078D4', url: 'https://azure.microsoft.com/pricing/' },
    { id: 'gcp', name: 'GCP', brand: '#4285F4', url: 'https://cloud.google.com/pricing' },
    { id: 'oracle', name: 'Oracle', brand: '#F80000', url: 'https://www.oracle.com/cloud/pricing/' },
    { id: 'ibm', name: 'IBM Cloud', brand: '#0F62FE', url: 'https://www.ibm.com/cloud/pricing' }
  ];

  // Utility functions for formatting and calculations
  const currencyFmt = (n, c) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return `${symbols[c]}${n.toFixed(2)}`;
  };

  const percentDiff = (val, cheapest) => {
    return cheapest === 0 ? 0 : ((val - cheapest) / cheapest) * 100;
  };

  const formatISODate = (d) => d.toISOString().slice(0, 10);

  // NotesSection Component
  const NotesSection = ({ lastSynced, onRefreshPricing, defaultExpanded = false }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(lastSynced);

    const handleRefresh = async () => {
      setIsRefreshing(true);
      try {
        await onRefreshPricing();
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to refresh pricing:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

    const toggleExpanded = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div className="rounded-xl border bg-white p-4 md:p-6">
        {/* Header with Toggle */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Notes & Pricing References</h2>
          <button
            onClick={toggleExpanded}
            aria-expanded={isExpanded}
            aria-controls="notes-content"
            className="text-sm text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
          >
            Details
          </button>
        </div>

        {/* Collapsible Content */}
        <div 
          id="notes-content"
          className={`mt-4 grid gap-6 md:grid-cols-3 ${isExpanded ? 'block' : 'hidden md:block'}`}
        >
          {/* Column A: Important Notes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Important Notes</h3>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div>• Source: Official provider pricing; subject to change.</div>
              <div>• Region: Defaults to your selected region (fallback: US East).</div>
              <div>• Estimates: Excludes free tiers and promo credits.</div>
              <div>• Variability: Usage, discounts, and egress affect totals.</div>
            </div>
          </div>

          {/* Column B: Pricing Models */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Pricing Models</h3>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div>• <strong>On-Demand:</strong> Flexible, highest cost.</div>
              <div>• <strong>Reserved/Committed:</strong> 1–3 yrs; largest savings for steady loads.</div>
              <div>• <strong>Spot/Preemptible:</strong> Deep discounts; may be interrupted.</div>
            </div>
          </div>

          {/* Column C: Official Pricing Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Official Pricing</h3>
            <div className="mt-2 space-y-2">
              {PROVIDERS.map(provider => (
                <a
                  key={provider.id}
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1 text-sm"
                  aria-label={`Opens in new tab`}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    {(() => {
                      const LogoComponent = providers.find(p => p.id === provider.id)?.logo;
                      return LogoComponent ? <LogoComponent /> : null;
                    })()}
                  </div>
                  <span>{provider.name}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Freshness Status */}
        <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
          <span>Pricing last synced: {formatISODate(lastUpdated)}</span>
          <span>•</span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded"
          >
            {isRefreshing ? (
              <span className="inline-flex items-center gap-1">
                <span className="animate-spin">⟳</span>
                Refreshing...
              </span>
            ) : (
              'Refresh'
            )}
          </button>
        </div>
      </div>
    );
  };

  const INSTANCE_TYPES = [
    { value: 'general', label: 'General Purpose' },
    { value: 'compute', label: 'Compute Optimized' },
    { value: 'memory', label: 'Memory Optimized' },
    { value: 'gpu', label: 'GPU' },
    { value: 'storage', label: 'High Storage' },
    { value: 'burstable', label: 'Burstable' }
  ];

  const CURRENCIES = [
    { code: 'USD', symbol: '$', rate: 1 },
    { code: 'EUR', symbol: '€', rate: 0.85 },
    { code: 'GBP', symbol: '£', rate: 0.73 }
  ];

  const CalculatorView = () => {
    const [calculatorState, setCalculatorState] = useState({
      compute: { instances: 2, hours: 730, type: 'general' },
      storage: { gb: 100, type: 'standard' },
      database: { instances: 1, hours: 730, type: 'general' },
      bandwidth: { gb: 1000 },
      region: 'us-east-1'
    });

    const [selectedProviders, setSelectedProviders] = useState(['aws', 'azure', 'gcp', 'oracle', 'ibm']);
    const [monthlyCosts, setMonthlyCosts] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [sortBy, setSortBy] = useState('total');

    // Helper functions
    const getCurrencyRate = () => CURRENCIES.find(c => c.code === selectedCurrency)?.rate || 1;
    
    const convertToCurrency = (amount) => {
      const rate = getCurrencyRate();
      return amount * rate;
    };

    const findBestPrice = () => {
      const costs = Object.values(monthlyCosts);
      if (costs.length === 0) return null;
      return Math.min(...costs.map(cost => cost.total));
    };

    const getSortedProviders = () => {
      const providersWithCosts = providers.filter(provider => 
        selectedProviders.includes(provider.id) && monthlyCosts[provider.id]
      );
      
      return providersWithCosts.sort((a, b) => {
        const aCost = monthlyCosts[a.id]?.[sortBy] || 0;
        const bCost = monthlyCosts[b.id]?.[sortBy] || 0;
        return aCost - bCost;
      });
    };

    const getSortIcon = () => {
      return sortBy === 'total' ? '↑' : '↓';
    };

    const resetCalculator = () => {
      setCalculatorState({
        compute: { instances: 2, hours: 730, type: 'general' },
        storage: { gb: 100, type: 'standard' },
        database: { instances: 1, hours: 730, type: 'general' },
        bandwidth: { gb: 1000 },
        region: 'us-east-1'
      });
      setSelectedProviders(['aws', 'azure', 'gcp', 'oracle', 'ibm']);
    };

    const toggleProvider = (providerId) => {
      setSelectedProviders(prev => 
        prev.includes(providerId) 
          ? prev.filter(id => id !== providerId)
          : [...prev, providerId]
      );
    };

    const calculateCosts = useCallback(() => {
      const costs = {};
      
      providers.forEach(provider => {
        if (!selectedProviders.includes(provider.id)) return;
        
        const computeCost = accurateCostData.compute[provider.id][calculatorState.compute.type] * 
                          calculatorState.compute.instances * calculatorState.compute.hours;
        
        const storageCost = accurateCostData.storage[provider.id][calculatorState.storage.type] * 
                          calculatorState.storage.gb;
        
        const databaseCost = accurateCostData.database[provider.id][calculatorState.database.type] * 
                           calculatorState.database.instances * calculatorState.database.hours;
        
        const bandwidthCost = accurateCostData.bandwidth[provider.id] * calculatorState.bandwidth.gb;
        
        costs[provider.id] = {
          compute: computeCost,
          storage: storageCost,
          database: databaseCost,
          bandwidth: bandwidthCost,
          total: computeCost + storageCost + databaseCost + bandwidthCost
        };
      });

      setMonthlyCosts(costs);
    }, [calculatorState, selectedProviders]);

    useEffect(() => {
      calculateCosts();
    }, [calculateCosts]);

    return (
      <div className="space-y-6">
        {/* Header Section - Left Aligned */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div className="text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Cost Calculator</h2>
              <p className="text-gray-600 text-lg">Calculate estimated monthly costs for your cloud infrastructure.</p>
            </div>
            <button
              onClick={resetCalculator}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset calculator to default values"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Provider Cards - Enhanced with Accessibility */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Select Providers to Compare</h3>
            <div className="flex justify-center">
              <div className="flex overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch] space-x-3 md:flex-wrap md:gap-6 md:overflow-visible md:space-x-0">
                {providers.map(provider => {
                  const isSelected = selectedProviders.includes(provider.id);
                  const providerData = PROVIDERS.find(p => p.id === provider.id);
                  
                  return (
                    <div key={provider.id} className="snap-start shrink-0 md:flex-shrink">
                      <label
                        className={`flex items-center gap-3 rounded-xl border bg-white p-4 md:p-5 transition hover:shadow-md hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 ${
                          isSelected 
                            ? 'border-2 shadow-lg' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{
                          borderColor: isSelected ? providerData.brand : undefined,
                          boxShadow: isSelected ? `0 4px 6px -1px ${providerData.brand}20` : undefined,
                          '--tw-ring-color': providerData.brand
                        }}
                        aria-pressed={isSelected}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleProvider(provider.id)}
                          className="sr-only"
                        />
                        <a
                          href={providerData.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 flex-1"
                          title={`Go to ${providerData.name} pricing`}
                          aria-label={`Open ${providerData.name} pricing in new tab`}
                          onClick={(e) => e.preventDefault()}
                        >
                          <div className="w-12 h-12 flex items-center justify-center">
                            <provider.logo />
                          </div>
                          <span className="font-semibold text-gray-900">{providerData.name}</span>
                        </a>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Infrastructure Configuration - Refactored */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl w-full">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 text-center">Compute Instances</label>
                <input
                  type="number"
                  value={calculatorState.compute.instances}
                  onChange={(e) => setCalculatorState(prev => ({
                    ...prev,
                    compute: { ...prev.compute, instances: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg"
                  min="1"
                  max="100"
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 text-center">Instance Type</label>
                <select
                  value={calculatorState.compute.type}
                  onChange={(e) => setCalculatorState(prev => ({
                    ...prev,
                    compute: { ...prev.compute, type: e.target.value }
                  }))}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg"
                >
                  {INSTANCE_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 text-center">Storage (GB)</label>
                <input
                  type="number"
                  value={calculatorState.storage.gb}
                  onChange={(e) => setCalculatorState(prev => ({
                    ...prev,
                    storage: { ...prev.storage, gb: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg"
                  min="1"
                  max="10000"
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 text-center">
                  Data Transfer (GB)
                  <span className="ml-1 text-gray-400 cursor-help" title="Monthly data transfer out of the cloud provider's network">
                    ℹ️
                  </span>
                </label>
                <input
                  type="number"
                  value={calculatorState.bandwidth.gb}
                  onChange={(e) => setCalculatorState(prev => ({
                    ...prev,
                    bandwidth: { ...prev.bandwidth, gb: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg"
                  min="0"
                  max="10000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cost Results - Refactored */}
        {Object.keys(monthlyCosts).length > 0 && (
          <div className="bg-white rounded-lg p-8 shadow-sm" id="results">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Monthly Cost Estimate</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="total">Sort by Total</option>
                    <option value="compute">Sort by Compute</option>
                    <option value="storage">Sort by Storage</option>
                    <option value="database">Sort by Database</option>
                    <option value="bandwidth">Sort by Bandwidth</option>
                  </select>
                  <span className="text-lg font-medium text-gray-600">{getSortIcon()}</span>
                </div>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {CURRENCIES.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="flex overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch] space-x-3 md:grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-6 md:max-w-7xl md:w-full md:overflow-visible md:space-x-0">
                {getSortedProviders().map(provider => {
                  const costs = monthlyCosts[provider.id];
                  if (!costs) return null;
                  
                  const convertedTotal = convertToCurrency(costs.total);
                  const isBestPrice = costs.total === findBestPrice();
                  const percentageDiff = percentDiff(costs.total, findBestPrice());
                  const providerData = PROVIDERS.find(p => p.id === provider.id);
                  
                  return (
                    <div key={provider.id} className={`snap-start shrink-0 md:flex-shrink rounded-xl border bg-white p-4 md:p-5 flex flex-col gap-2 transition hover:shadow hover:-translate-y-0.5 min-h-[280px] ${
                      isBestPrice ? 'bg-emerald-50 border-emerald-300' : 'border-gray-200'
                    }`}>
                      {/* Provider Header with Best Price Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <a
                            href={providerData.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                            title={`Visit ${providerData.name} pricing page`}
                            aria-label={`Open ${providerData.name} pricing in new tab`}
                          >
                            <div className="w-10 h-10 flex items-center justify-center">
                              <provider.logo />
                            </div>
                          </a>
                          <span className="font-bold text-gray-900">{providerData.name}</span>
                        </div>
                        {isBestPrice && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                            Best Price
                          </span>
                        )}
                      </div>
                      
                      {/* Total Cost */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {currencyFmt(convertedTotal, selectedCurrency)}
                        </div>
                        {!isBestPrice && percentageDiff > 0 && (
                          <span className="text-sm text-gray-500">
                            +{percentageDiff.toFixed(1)}% vs cheapest
                          </span>
                        )}
                      </div>
                      
                      {/* Cost Breakdown */}
                      <div className="space-y-3 text-sm flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">💻 Compute:</span>
                          <span className="font-medium text-gray-900">{currencyFmt(convertToCurrency(costs.compute), selectedCurrency)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">💾 Storage:</span>
                          <span className="font-medium text-gray-900">{currencyFmt(convertToCurrency(costs.storage), selectedCurrency)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">🗄️ Database:</span>
                          <span className="font-medium text-gray-900">{currencyFmt(convertToCurrency(costs.database), selectedCurrency)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">🌐 Bandwidth:</span>
                          <span className="font-medium text-gray-900">{currencyFmt(convertToCurrency(costs.bandwidth), selectedCurrency)}</span>
                        </div>
                      </div>
                      
                      {/* Info Tooltip */}
                      <div className="pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="cursor-help" title="Pricing varies by region, usage patterns, and currency fluctuations">
                            ℹ️ Pricing varies by region/usage/currency
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Last updated: {formatISODate(new Date())}
            </div>
          </div>
        )}

        {/* Mobile Sticky Bottom Bar */}
        {Object.keys(monthlyCosts).length > 0 && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const cheapestProvider = getSortedProviders()[0];
                  if (!cheapestProvider) return null;
                  const costs = monthlyCosts[cheapestProvider.id];
                  const providerData = PROVIDERS.find(p => p.id === cheapestProvider.id);
                  return (
                    <>
                      <div className="w-8 h-8 flex items-center justify-center">
                        <cheapestProvider.logo />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Cheapest: {providerData.name}</div>
                        <div className="text-lg font-bold text-emerald-600">
                          {currencyFmt(convertToCurrency(costs.total), selectedCurrency)}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
              <button
                onClick={() => {
                  const resultsSection = document.querySelector('#results');
                  if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                View Details
              </button>
            </div>
          </div>
        )}

                  {/* Notes & Pricing References - Refactored */}
          <NotesSection 
            lastSynced={new Date()}
            onRefreshPricing={async () => {
              // Simulate refresh - in real app, this would fetch latest pricing
              await new Promise(resolve => setTimeout(resolve, 1000));
            }}
            defaultExpanded={window.innerWidth >= 768}
          />
      </div>
    );
  };

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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo and Brand Section */}
            <div className="flex items-center flex-1 min-w-0">
              <button 
                onClick={() => setActiveView('home')}
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
                title="Return to Home"
              >
                <CloudProInsightsLogo size="small" />
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center gap-1 sm:gap-2">
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
                    className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 font-medium text-xs sm:text-sm ${
                      activeView === nav.id
                        ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
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
      <footer className="bg-white border-t mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setActiveView('home')}
              className="hover:opacity-80 transition-opacity"
              title="Return to Home"
            >
              <CloudProInsightsLogo size="small" />
            </button>
            <div className="text-center sm:text-left">
              <div className="text-sm sm:text-base text-gray-600 font-medium">
                © 2025 by AAkinDev
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                Smarter Cloud Decisions Start Here.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CloudProInsights; 