import { useHttp } from "../hooks/http.hook";
import authParams from '../utils/variable'
const { _baseCount, BASE_URL, client_secret, x_secret_key } = authParams


const useVacanciesService = () => {
  const { loadingStatus, request } = useHttp()
  const token = JSON.parse(localStorage.getItem('token'))
  const headers = {
    'x-secret-key': `${x_secret_key}`,
    'x-api-app-id': `${client_secret}`,
    'Authorization': `${token.token_type} ${token.access_token}`,
    'Content-Type': 'application/json'
  }

  const getVacancies = async (page, payment_from = '', payment_to = '', profession = '', keyword = '') => {
    const no_agreement = (payment_from || payment_to) ? '1' : ''

    const params = {
      published: 1,
      page: `${page - 1}`,
      count: `${_baseCount}`,
      payment_from: `${payment_from}`,
      payment_to: `${payment_to}`,
      keyword: `${keyword}`,
      catalogues: `${profession}`,
      no_agreement: `${no_agreement}`
    }

    const res = await request(`${BASE_URL}vacancies/`, headers, params)
    const vacancies = _transformVacancies(res.objects)

    return { vacancies, total: res.total }
  }

  const getVacancy = async (id) => {
    const res = await request(`${BASE_URL}vacancies/${id}/`, headers)

    return _transformVacancy(res)
  }

  const getFavoriteVacacies = async (page) => {
    const favoriteIDs = JSON.parse(localStorage.getItem('favorites')) || []
    const ids = favoriteIDs.map(item => `ids[]=${item}`).join('&') || `ids[]=`
    const params = {
      page: `${page - 1}`,
      count: `${_baseCount}`
    }

    const res = await request(`${BASE_URL}vacancies/?${ids}`, headers, params)
    console.log(res)
    const vacancies = _transformVacancies(res.objects)

    return { vacancies, total: res.total }
  }

  const _transformVacancies = (data) => {
    return data.map(item => ({
      profession: item.profession,
      firm_name: item.firm_name,
      town: item.town.title,
      catalogues: item.catalogues[0].title,
      type_of_work: item.type_of_work.title,
      payment_to: item.payment_to,
      payment_from: item.payment_from,
      currency: item.currency,
      id: item.id,
      vacancyRichText: item.vacancyRichText
    }
    ))
  }

  const _transformVacancy = (vacancy) => {
    return {
      vacancyRichText: vacancy.vacancyRichText,
      currency: vacancy.currency,
      payment_from: vacancy.payment_from,
      payment_to: vacancy.payment_to,
      profession: vacancy.profession,
      type_of_work: vacancy.type_of_work.title,
      town: vacancy.town.title,
      id: vacancy.id
    }
  }

  return { loadingStatus, getVacancies, getVacancy, getFavoriteVacacies }
}

export default useVacanciesService