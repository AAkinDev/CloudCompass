// Cache-busting utility for ensuring latest assets are loaded
const getCacheBuster = () => {
  // Use build time or fallback to current timestamp
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME || Date.now();
  return `?v=${buildTime}`;
};

export const getAssetUrl = (path: string): string => {
  // Use basePath for the base path, fallback to empty string for local development
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path}${getCacheBuster()}`;
};

export const getLocalAssetUrl = (path: string): string => {
  return `${process.env.NEXT_PUBLIC_BASE_PATH}${path}${getCacheBuster()}`;
};
