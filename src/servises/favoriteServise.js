import { useHttp } from '../hooks/useHttp'
import authParams from '../utils/variable'
const { _baseCount, BASE_URL, client_secret, x_secret_key } = authParams

const useFavoritesService = () => {
  const request = useHttp()
  const token = JSON.parse(localStorage.getItem('token'))
  const headers = {
    'x-secret-key': `${x_secret_key}`,
    'x-api-app-id': `${client_secret}`,
    'Authorization': `${token.token_type} ${token.access_token}`,
    'Content-Type': 'application/json'
  }

  const getFavoriteVacacies = async (page) => {
    const favoriteIDs = JSON.parse(localStorage.getItem('favorites')) || []
    const ids = favoriteIDs.map(item => `ids[]=${item}`).join('&') || `ids[]=`
    const params = {
      page: `${page - 1}`,
      count: `${_baseCount}`
    }

    return request(`${BASE_URL}vacancies/?${ids}`, headers, params)
  }

  return { getFavoriteVacacies }
}

export default useFavoritesService