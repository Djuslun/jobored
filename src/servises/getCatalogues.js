export const getCatalogues = () => {

  const request = async () => {
    const BASE_URL = 'https://startup-summer-2023-proxy.onrender.com/2.0/'

    try {
      const response = await fetch(`${BASE_URL}catalogues/`,
        {
          headers: {
            'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
            'x-api-app-id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
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