
export const getAccsesKey = async () => {
  try {
    let accsessKey = localStorage.getItem('token')

    if (!accsessKey) {
      const response = await fetch('https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0', {
        headers: {
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        },
      })

      accsessKey = await response.json()
      localStorage.setItem('token', JSON.stringify(accsessKey.access_token))
    }

    return accsessKey
  } catch (e) {
    throw e
  }

}
