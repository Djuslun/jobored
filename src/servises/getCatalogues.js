import authParams from '../utils/variable'
const { BASE_URL, client_secret, x_secret_key } = authParams

export const getCatalogues = () => {

  const request = async () => {
    try {
      const response = await fetch(`${BASE_URL}catalogues/`,
        {
          headers: {
            'x-secret-key': `${x_secret_key}`,
            'x-api-app-id': `${client_secret}`
          }
        });

      if (!response.ok) {
        throw new Error(`Could not fetch , status: ${response.status}`);
      }

      const data = await response.json();

      return data.map(item => ({ label: item.title_trimmed, value: item.key }));
    } catch (e) {
      throw e;
    }
  };

  return { request }
}