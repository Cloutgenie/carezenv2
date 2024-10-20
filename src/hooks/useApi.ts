import { useState, useCallback, useRef, useEffect } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simulated database
const medications = [
  { id: '1', name: 'Aspirin', dosage: '81mg' },
  { id: '2', name: 'Lisinopril', dosage: '10mg' },
  { id: '3', name: 'Metformin', dosage: '500mg' },
  { id: '4', name: 'Simvastatin', dosage: '20mg' },
  { id: '5', name: 'Oxycodone', dosage: '5mg' },
];

const narcotics = ['5']; // IDs of narcotic medications

export function useApi<T>(cacheKey?: string) {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const cache = useRef<Map<string, CacheItem<T>>>(new Map());

  useEffect(() => {
    return () => {
      cache.current.clear();
    };
  }, []);

  const execute = useCallback(async (url: string, options?: RequestInit): Promise<T> => {
    const cacheKeyToUse = cacheKey || url;

    if (cacheKeyToUse && typeof cacheKeyToUse === 'string') {
      const cachedItem = cache.current.get(cacheKeyToUse);
      if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
        setState({ data: cachedItem.data, error: null, loading: false });
        return cachedItem.data;
      }
    }

    setState({ data: null, error: null, loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      let data: T;

      if (typeof url === 'string' && url.startsWith('/api/medications/search')) {
        const searchTerm = new URL(url, 'http://example.com').searchParams.get('term')?.toLowerCase();
        data = medications.filter(med => med.name.toLowerCase().includes(searchTerm || '')) as unknown as T;
      } else if (url === '/api/medications/interactions') {
        const body = JSON.parse(options?.body as string);
        const selectedMeds = medications.filter(med => body.medications.includes(med.id));
        data = [
          { severity: 'moderate', description: `Potential interaction between ${selectedMeds[0].name} and ${selectedMeds[1].name}` }
        ] as unknown as T;
      } else if (typeof url === 'string' && url.startsWith('/api/medications/narcotic/')) {
        const medicationId = url.split('/').pop();
        data = narcotics.includes(medicationId || '') as unknown as T;
      } else if (url === '/api/prescriptions') {
        // Simulate prescription sending
        data = undefined as unknown as T;
      } else {
        throw new Error('Unknown API endpoint');
      }

      setState({ data, error: null, loading: false });
      if (cacheKeyToUse && typeof cacheKeyToUse === 'string') {
        cache.current.set(cacheKeyToUse, { data, timestamp: Date.now() });
      }
      return data;
    } catch (error) {
      setState({ data: null, error: error as Error, loading: false });
      throw error;
    }
  }, [cacheKey]);

  const invalidateCache = useCallback((key?: string) => {
    const cacheKeyToUse = key || cacheKey;
    if (cacheKeyToUse && typeof cacheKeyToUse === 'string') {
      cache.current.delete(cacheKeyToUse);
    }
  }, [cacheKey]);

  return { ...state, execute, invalidateCache };
}