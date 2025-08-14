export type ProviderId = 'aws' | 'azure' | 'gcp' | 'oracle' | 'ibm';

export type AnalyticsMap = {
  aws: { services: number; regions: string[]; lastSynced: string };
  azure: { services: number; regions: string[]; lastSynced: string };
  gcp: { services: number; regions: string[]; lastSynced: string };
  oracle: { services: number; regions: string[]; lastSynced: string };
  ibm: { services: number; regions: string[]; lastSynced: string };
};

export type Weights = {
  cost: number;
  performance: number;
  availability: number;
  compliance: number;
};

export type Constraints = {
  regions: string[];
  compliance: string[];
  db: 'rdbms' | 'nosql' | 'both';
  gpu?: boolean;
  serverless?: boolean;
  budget?: number;
  scale: {
    monthlyRequests: number;
    storedGB: number;
  };
};

export type ProviderFacts = {
  id: ProviderId;
  priceIndex: number; // 0..1 (lower = cheaper)
  perfIndex: number; // 0..1
  serverlessMaturity: number; // 0..1
  gpuSupport: boolean;
  managedRdbms: boolean;
  managedNosql: boolean;
  compliance: string[];
  regions: string[]; // Will be populated from analytics
  catalogs: {
    docs: string;
    pricing: string;
  };
};

export type ScoreOut = {
  id: ProviderId;
  score: number;
  reasons: string[];
  confidence: 'High' | 'Medium' | 'Low';
};

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
};
