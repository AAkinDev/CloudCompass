import { UseCase } from '@/types/provider';
import { Globe, Smartphone, BarChart3, Brain, Truck, Settings } from 'lucide-react';

export const useCases: UseCase[] = [
  {
    id: 'web-app',
    name: 'Web Application',
    description: 'Modern web applications with scalable infrastructure',
    icon: Globe
  },
  {
    id: 'mobile-backend',
    name: 'Mobile Backend',
    description: 'API-driven backends for mobile applications',
    icon: Smartphone
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    description: 'Big data processing and business intelligence',
    icon: BarChart3
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'AI/ML workloads and model training',
    icon: Brain
  },
  {
    id: 'enterprise-migration',
    name: 'Enterprise Migration',
    description: 'Legacy system migration and hybrid cloud',
    icon: Truck
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Custom workloads and specialized requirements',
    icon: Settings
  }
];

export const getSuggestedStack = (providerId: string, useCase: string | null): string => {
  const stacks = {
    'web-app': {
      aws: 'ALB + ECS Fargate + RDS + CloudFront',
      azure: 'Application Gateway + App Service + Azure SQL + CDN',
      gcp: 'Load Balancer + Cloud Run + Cloud SQL + Cloud CDN',
      oracle: 'Load Balancer + Container Engine + Autonomous DB + CDN',
      ibm: 'Load Balancer + Code Engine + Db2 + CDN'
    },
    'mobile-backend': {
      aws: 'API Gateway + Lambda + DynamoDB + S3',
      azure: 'API Management + Functions + Cosmos DB + Blob Storage',
      gcp: 'Cloud Endpoints + Cloud Functions + Firestore + Cloud Storage',
      oracle: 'API Gateway + Functions + NoSQL + Object Storage',
      ibm: 'API Connect + Cloud Functions + Cloudant + Object Storage'
    },
    'data-analytics': {
      aws: 'EMR + Redshift + S3 + QuickSight',
      azure: 'HDInsight + Synapse + Data Lake + Power BI',
      gcp: 'Dataproc + BigQuery + Cloud Storage + Looker',
      oracle: 'Big Data Service + Autonomous Data Warehouse + Object Storage + Analytics Cloud',
      ibm: 'Cloud Pak for Data + Db2 Warehouse + Object Storage + Cognos'
    },
    'machine-learning': {
      aws: 'SageMaker + ECS + RDS + S3',
      azure: 'Machine Learning + Container Instances + Azure SQL + Blob Storage',
      gcp: 'Vertex AI + Cloud Run + Cloud SQL + Cloud Storage',
      oracle: 'Data Science + Container Engine + Autonomous DB + Object Storage',
      ibm: 'Watson Studio + Code Engine + Db2 + Object Storage'
    },
    'enterprise-migration': {
      aws: 'Migration Hub + EC2 + RDS + Direct Connect',
      azure: 'Azure Migrate + Virtual Machines + Azure SQL + ExpressRoute',
      gcp: 'Migrate for Compute + Compute Engine + Cloud SQL + Cloud Interconnect',
      oracle: 'Cloud Migrations + Compute + Autonomous DB + FastConnect',
      ibm: 'Cloud Migration + Virtual Servers + Db2 + Direct Link'
    },
    'other': {
      aws: 'EC2 + VPC + S3 + CloudWatch',
      azure: 'Virtual Machines + Virtual Network + Blob Storage + Monitor',
      gcp: 'Compute Engine + VPC + Cloud Storage + Monitoring',
      oracle: 'Compute + VCN + Object Storage + Monitoring',
      ibm: 'Virtual Servers + VPC + Object Storage + Monitoring'
    }
  } as const;

  if (!useCase || !(useCase in stacks)) {
    return stacks.other[providerId as keyof typeof stacks.other] || 'Custom infrastructure stack';
  }

  const useCaseStacks = stacks[useCase as keyof typeof stacks];
  return useCaseStacks[providerId as keyof typeof useCaseStacks] || 'Custom infrastructure stack';
};
