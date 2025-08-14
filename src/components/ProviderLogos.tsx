import React from 'react';
import { ProviderId } from '@/types/provider';
import { getAssetUrl } from '@/lib/cacheBuster';

interface ProviderLogoProps {
  providerId: ProviderId;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showFallback?: boolean;
}

const providerLogos = {
  aws: '/assets/logos/aws-logo.png',
  azure: '/assets/logos/azure-logo.png',
  gcp: '/assets/logos/gcp-logo.png',
  oracle: '/assets/logos/oracle-logo.png',
  ibm: '/assets/logos/ibm-logo.png'
};

const providerNames = {
  aws: 'AWS',
  azure: 'Azure',
  gcp: 'GCP',
  oracle: 'Oracle',
  ibm: 'IBM'
};

const providerColors = {
  aws: 'bg-orange-500',
  azure: 'bg-blue-600',
  gcp: 'bg-red-500',
  oracle: 'bg-red-600',
  ibm: 'bg-blue-800'
};

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-10'
};

export const ProviderLogo: React.FC<ProviderLogoProps> = ({
  providerId,
  size = 'md',
  className = '',
  showFallback = true
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (showFallback) {
      e.currentTarget.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.className = `${sizeClasses[size]} ${providerColors[providerId]} rounded flex items-center justify-center text-white text-xs font-bold`;
      fallback.textContent = providerNames[providerId];
      e.currentTarget.parentNode?.appendChild(fallback);
    }
  };

  return (
    <img
      src={getAssetUrl(providerLogos[providerId])}
      alt={providerNames[providerId]}
      className={`${sizeClasses[size]} object-contain ${className}`}
      onError={handleError}
    />
  );
};

export default ProviderLogo;
