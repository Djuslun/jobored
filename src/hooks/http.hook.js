import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loadingStatus, setLoadingStatus] = useState('');

  const request = useCallback(async (url, headers) => {
    setLoadingStatus('loading');

    try {
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      setLoadingStatus('ok');

      return data;
    } catch (e) {
      setLoadingStatus('error');
      throw e;
    }
  }, []);

  return { loadingStatus, request }
}