import { useHttp } from "../hooks/http.hook";

const useVacanciesService = () => {
  const _baseCount = 4
  const { loadingStatus, request } = useHttp()
  const token = JSON.parse(localStorage.getItem('token'))
  const BASE_URL = 'https://startup-summer-2023-proxy.onrender.com/2.0/'
  const headers = {
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    'x-api-app-id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    'Authorization': `${token.token_type} ${token.access_token}`,
    'Content-Type': 'application/json'
  }

  const getVacancies = async (page, payment_from = '', payment_to = '', profession = '', keyword = '') => {
    const no_agreement = (payment_from || payment_to) ? '1' : ''
    const res = await request(
      `${BASE_URL}vacancies/?published=1&page=${page - 1}&count=${_baseCount}&payment_from=${payment_from}&payment_to=${payment_to}&keyword=${keyword}&catalogues=${profession}&no_agreement=${no_agreement}/`,
      headers)
    const vacancies = _transformVacancies(res.objects)

    return { vacancies, total: res.total }
  }

  const getVacancy = async (id) => {
    const res = await request(`${BASE_URL}vacancies/${id}/`, headers)

    return _transformVacancy(res)
  }

  const getFavoriteVacacies = async (page) => {
    const favoriteIDs = JSON.parse(localStorage.getItem('favorites'))
    const ids = favoriteIDs.map(item => `ids[]=${item}`).join('&') || `ids[]=`
    const res = await request(`${BASE_URL}vacancies/?${ids}&page=${page - 1}&count=4`, headers)
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