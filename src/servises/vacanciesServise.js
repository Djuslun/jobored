import { useHttp } from "../hooks/useHttp";
import authParams from '../utils/variable'
import { headers } from "../utils/variable";

const { _baseCount, BASE_URL } = authParams

const useVacanciesService = () => {
  const request = useHttp()
  const token = JSON.parse(localStorage.getItem('token')) || ''

  const authHeader = {
    'Authorization': `${token.token_type} ${token.access_token}`,
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

    return await request(`${BASE_URL}vacancies/`, { ...headers, ...authHeader }, params)
  }

  const getFavoriteVacacies = async (page) => {
    const favoriteIDs = JSON.parse(localStorage.getItem('favorites')) || []
    const ids = favoriteIDs.map(item => `ids[]=${item}`).join('&') || `ids[]=`
    const params = {
      page: `${page - 1}`,
      count: `${_baseCount}`
    }

    return request(`${BASE_URL}vacancies/?${ids}`, { ...headers, ...authHeader }, params)
  }

  const getCatalogues = async () => await request(`${BASE_URL}catalogues/`, headers)

  const getVacancy = async (id) => request(`${BASE_URL}vacancies/${id}/`, { ...headers, ...authHeader })

  return { getVacancies, getVacancy, getFavoriteVacacies, getCatalogues }
}

export default useVacanciesService