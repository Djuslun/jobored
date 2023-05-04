import { useState, useEffect } from "react"
import { getVacancies } from "../../servises/getVacancies"
import VacancyItem from "../vacancyItem/VacancyItem"
import './vacancyList.scss'

const VacancyList = ({ }) => {
  const [vacancies, setVacancies] = useState([]);
  useEffect(() => {
    getVacancies().then(data => setVacancies(data))
  }, [])

  const elems = vacancies.map(item => {
    const { id } = item
    return <VacancyItem key={id} {...item} />
  })

  return (
    <ul className="vacancy-list">
      {/* <VacancyItem className='vacancy-list__item' />
      <VacancyItem className='vacancy-list__item' />
      <VacancyItem className='vacancy-list__item' />
      <VacancyItem className='vacancy-list__item' /> */}
      {elems}
    </ul>
  )
}

export default VacancyList