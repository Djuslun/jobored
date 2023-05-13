import { useState, useEffect } from "react"
import FilterForm from "../../components/filterForm/FilterForm"
import VacancyList from "../../components/vacancyList/VacancyList"
import CustomInput from "../../components/customInput/CustomInput"
import { useSelector } from "react-redux";
import { Spinner } from "../../components/spinner/Spinner";
import useVacanciesService from "../../servises/vacanciesServise";
import Vacancies from "../../components/vacancies/Vacancies";
import ErrorMessage from "../../components/errorBoundary/ErrorMessage";
import './vacancySearch.scss'

const VacancySearch = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [vacancies, setVacancies] = useState([])
  const [total, setTotal] = useState(0)
  const { loadingStatus, getVacancies } = useVacanciesService()
  const { payment_to, payment_from, profession, keywords } = useSelector(state => state.vacancies.filters)

  useEffect(() => {
    getVacancies(currentPage, payment_from, payment_to, profession, keywords)
      .then(data => {
        setVacancies(data.vacancies)
        setTotal(data.total > 500 ? 125 : Math.ceil(data.total / 4))
      })
  }, [currentPage, payment_to, payment_from, profession, keywords])

  // useEffect(() => {
  //   setCurrentPage(1)
  // }, [payment_from, payment_to, profession, keywords])

  return (
    <div className="vacancy-search">
      <FilterForm />
      <div className="vacancy-search__body">
        <CustomInput />
        <Vacancies
          currentPage={currentPage}
          total={total}
          setCurrentPage={setCurrentPage}>
          <View
            loadingStatus={loadingStatus}
            vacancies={vacancies} />
        </Vacancies>
      </div>
    </div>
  )
}

export default VacancySearch

const View = ({ loadingStatus, vacancies }) => {
  switch (loadingStatus) {
    case 'loading': return <Spinner />
    case 'error': return <ErrorMessage />
    case 'ok': return <VacancyList vacancies={vacancies} />
    default: return <></>
  }
}