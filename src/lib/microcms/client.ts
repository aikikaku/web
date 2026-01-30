import { createClient } from 'microcms-js-sdk';
import { isMockMode } from '@/lib/env';

if (!isMockMode) {
  if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error('MICROCMS_SERVICE_DOMAIN is required');
  }
  if (!process.env.MICROCMS_API_KEY) {
    throw new Error('MICROCMS_API_KEY is required');
  }
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || 'mock',
  apiKey: process.env.MICROCMS_API_KEY || 'mock',
});
