import VacancyItem from "../vacancyItem/VacancyItem"

import './vacancyList.scss'


const VacancyList = ({ vacancies }) => {
  const elems = vacancies.map(item => <VacancyItem key={item.id} {...item} />)

  return (
    <ul className="vacancy-list">
      {elems.length ? elems : ''}
    </ul>
  )
}

export default VacancyList