import { useHttp } from "../hooks/useHttp";
import authParams from '../utils/variable'
const { _baseCount, BASE_URL, client_secret, x_secret_key } = authParams

const useVacanciesService = () => {
  const request = useHttp()
  const token = JSON.parse(localStorage.getItem('token'))
  const headers = {
    'x-secret-key': `${x_secret_key}`,
    'x-api-app-id': `${client_secret}`,
    'Authorization': `${token.token_type} ${token.access_token}`,
    'Content-Type': 'application/json'
  }

  const getVacancies = async (page = 1, payment_from = '', payment_to = '', profession = '', keywords = '') => {
    const no_agreement = (payment_from || payment_to) ? '1' : ''

    const params = {
      published: 1,
      page: `${page - 1}`,
      count: `${_baseCount}`,
      payment_from: `${payment_from}`,
      payment_to: `${payment_to}`,
      keyword: `${keywords}`,
      catalogues: `${profession}`,
      no_agreement: `${no_agreement}`
    }

    return await request(`${BASE_URL}vacancies/`, headers, params)
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

  const getVacancy = async (id) => request(`${BASE_URL}vacancies/${id}/`, headers)

  return { getVacancies, getVacancy, getFavoriteVacacies }
}

export default useVacanciesService