import VacancyItem from "../vacancyItem/VacancyItem"
import { useLocation } from "react-router-dom"
import classNames from "classnames"
import './vacancyList.scss'


const VacancyList = ({ vacancies }) => {
  const location = useLocation()
  const url = location.pathname
  const listClass = classNames('vacancy-list', { 'vacancy-list--favorite-page': url === '/favorite' })

  const elems = vacancies.map(item => <VacancyItem key={item.id} {...item} />)

  return (
    <ul className={listClass}>
      {elems.length ? elems : <div className="vacancy-list__empty">Нет вакансий по вашему запросу</div>}
    </ul>
  )
}

export default VacancyList