import axios from 'axios';

export const useHttp = () => {
  const request = async (url, headers, params) => {
    try {
      const response = await axios.get(url, { headers, params });

      return response.data;
    } catch (e) {
      throw e;
    }
  };

  return request
}