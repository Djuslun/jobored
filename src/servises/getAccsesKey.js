import authParams, { headers } from '../utils/variable'
import { useHttp } from "../hooks/useHttp";
const { login, BASE_URL, client_secret, password, client_id, hr } = authParams

export const useAccsesKey = async () => {
  const request = useHttp()

  const params = {
    login: `${login}`,
    password: `${password}`,
    client_id: `${client_id}`,
    client_secret: `${client_secret}`,
    hr: `${hr}`,
  }
  try {
    let accsessKey = localStorage.getItem('token')

    if (!accsessKey || accsessKey.ttl < (Date.now() / 1000)) {
      const response = await request(`${BASE_URL}oauth2/password/`, headers, params)

      localStorage.setItem('token', JSON.stringify(response))
      return response
    }
  } catch (e) {
    throw e
  }
}
