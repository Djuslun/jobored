import authParams from '../utils/variable'
const { login, BASE_URL, client_secret, x_secret_key, password, client_id, hr } = authParams

export const getAccsesKey = async () => {
  try {
    let accsessKey = localStorage.getItem('token')

    if (!accsessKey || accsessKey.ttl < (Date.now() / 1000)) {
      const response = await fetch(`${BASE_URL}oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}&hr=${hr}`, {
        headers: {
          'x-secret-key': `${x_secret_key}`,
          'x-api-app-id': `${client_secret}`,
        },
      })

      accsessKey = await response.json()
      localStorage.setItem('token', JSON.stringify(accsessKey))
    }

    return accsessKey
  } catch (e) {
    throw e
  }
}
