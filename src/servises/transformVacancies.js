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

export const _transformVacancy = (vacancy) => {
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