export const _transformVacancies = (data) => {
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