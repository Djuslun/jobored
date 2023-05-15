export const getCatalogues = () => {

  const request = async () => {
    const BASE_URL = 'https://startup-summer-2023-proxy.onrender.com/2.0/'

    try {
      const response = await fetch(`${BASE_URL}catalogues/`, { headers: { 'x-secret-key': 'GEU4nvd3rej*jeh.eqp' } });

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