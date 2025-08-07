// Date utility functions

export const formatISODate = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};
