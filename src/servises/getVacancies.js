
export const getVacancies = async () => {
  const response = await fetch('https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?published=1&count=4&page=2&payment_from=400000&payment_to=100000000000000000000&no_agreement=1/', {
    headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      'x-api-app-id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
    },
  })
  const data = await response.json();
  console.log(data)
  return data.objects.map(item => ({
    profession: item.profession,
    firm_name: item.firm_name,
    town: item.town.title,
    catalogues: item.catalogues[0].title,
    type_of_work: item.type_of_work.title,
    payment_to: item.payment_to,
    payment_from: item.payment_from,
    currency: item.currency,
    id: item.id,
  }
  ))
}