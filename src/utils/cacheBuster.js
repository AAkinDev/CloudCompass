// Cache-busting utility for ensuring latest assets are loaded
const getCacheBuster = () => {
  // Use build time or fallback to current timestamp
  const buildTime = process.env.REACT_APP_BUILD_TIME || Date.now();
  return `?v=${buildTime}`;
};

export const getAssetUrl = (path) => {
  const baseUrl = 'https://raw.githubusercontent.com/AAkinDev/CloudProInsights/main';
  return `${baseUrl}${path}${getCacheBuster()}`;
};

export const getLocalAssetUrl = (path) => {
  return `${process.env.PUBLIC_URL}${path}${getCacheBuster()}`;
};
