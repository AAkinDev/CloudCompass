export const formatISO = (d: string | Date) => (typeof d === 'string' ? d : d.toISOString()).slice(0, 10);


