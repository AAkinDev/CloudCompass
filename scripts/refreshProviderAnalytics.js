import fs from 'fs/promises';
import path from 'path';
import { getAnalytics } from './fetchProviderAnalytics.js';

const OUT = path.join(process.cwd(), 'public/data/provider-analytics.json');

export async function refreshAnalytics() {
  try {
    const data = await getAnalytics();
    
    await fs.mkdir(path.dirname(OUT), { recursive: true });
    await fs.writeFile(OUT, JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  refreshAnalytics().catch(e => {
    process.exit(1);
  });
}
