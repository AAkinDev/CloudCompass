// Cache-busting utility for ensuring latest assets are loaded
const getCacheBuster = () => {
  // Use build time or fallback to current timestamp
  const buildTime = process.env.REACT_APP_BUILD_TIME || Date.now();
  return `?v=${buildTime}`;
};

export const getAssetUrl = (path) => {
  // Use PUBLIC_URL for the base path, fallback to empty string for local development
  const baseUrl = process.env.PUBLIC_URL || '';
  return `${baseUrl}${path}${getCacheBuster()}`;
};

export const getLocalAssetUrl = (path) => {
  return `${process.env.PUBLIC_URL}${path}${getCacheBuster()}`;
};

