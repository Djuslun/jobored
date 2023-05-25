import { useState, useCallback } from "react";
import axios from 'axios';

export const useHttp = () => {
  const [loadingStatus, setLoadingStatus] = useState('');

  const request = useCallback(async (url, headers, params) => {
    setLoadingStatus('loading');

    try {
      const response = await axios.get(url, { headers, params });

      setLoadingStatus('ok');

      return response.data;
    } catch (e) {
      setLoadingStatus('error');
      throw e;
    }
  }, []);

  return { loadingStatus, request }
}