/**
 * useQueueData - Custom hook for ClinicQ queue state
 * Purpose: Fetches tokens + stats, exposes loading, error, refetch
 * Methodology: Custom React hook (useState, useEffect, useCallback)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchQueue, fetchQueueStats } from '../api/tokenApi.js';

export function useQueueData() {
  const [tokens, setTokens] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [queueData, statsData] = await Promise.all([
        fetchQueue(),
        fetchQueueStats(),
      ]);
      if (isMounted.current) {
        setTokens(queueData);
        setStats(statsData);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || 'Failed to load queue');
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    load();
    return () => {
      isMounted.current = false;
    };
  }, [load]);

  return { tokens, stats, loading, error, refetch: load };
}
