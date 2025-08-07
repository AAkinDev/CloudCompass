// Provider service data fetchers
// Load service catalogs from local JSON files (can be swapped for API calls later)

import { Service, ProviderId } from './catalog';

// Mock delay to simulate API calls
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAwsServices = async (): Promise<Service[]> => {
  await mockDelay(100); // Simulate network delay
  const response = await fetch('/src/data/providers/aws-services.json');
  if (!response.ok) {
    throw new Error('Failed to fetch AWS services');
  }
  return response.json();
};

export const fetchAzureServices = async (): Promise<Service[]> => {
  await mockDelay(100);
  const response = await fetch('/src/data/providers/azure-services.json');
  if (!response.ok) {
    throw new Error('Failed to fetch Azure services');
  }
  return response.json();
};

export const fetchGcpServices = async (): Promise<Service[]> => {
  await mockDelay(100);
  const response = await fetch('/src/data/providers/gcp-services.json');
  if (!response.ok) {
    throw new Error('Failed to fetch GCP services');
  }
  return response.json();
};

export const fetchOracleServices = async (): Promise<Service[]> => {
  await mockDelay(100);
  const response = await fetch('/src/data/providers/oracle-services.json');
  if (!response.ok) {
    throw new Error('Failed to fetch Oracle services');
  }
  return response.json();
};

export const fetchIbmServices = async (): Promise<Service[]> => {
  await mockDelay(100);
  const response = await fetch('/src/data/providers/ibm-services.json');
  if (!response.ok) {
    throw new Error('Failed to fetch IBM services');
  }
  return response.json();
};

// Fetch all provider services
export const fetchAllServices = async (): Promise<Record<ProviderId, Service[]>> => {
  const [aws, azure, gcp, oracle, ibm] = await Promise.all([
    fetchAwsServices(),
    fetchAzureServices(),
    fetchGcpServices(),
    fetchOracleServices(),
    fetchIbmServices()
  ]);

  return {
    aws,
    azure,
    gcp,
    oracle,
    ibm
  };
};
