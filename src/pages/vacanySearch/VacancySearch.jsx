import { useState, useEffect } from "react"
import FilterForm from "../../components/filterForm/FilterForm"
import VacancyList from "../../components/vacancyList/VacancyList"
import CustomInput from "../../components/customInput/CustomInput"
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../../components/spinner/Spinner";
import Vacancies from "../../components/vacancies/Vacancies";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { fetchVacancies, vacanciesSelector } from "../../redux/vacanciesSlice";
import './vacancySearch.scss'

const VacancySearch = () => {
  const dispatch = useDispatch()

  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)

  const { payment_to, payment_from, profession, keywords } = useSelector(state => state.filter.filter)
  const total = useSelector(state => state.vacancies.total)
  const loadingStatus = useSelector(state => state.vacancies.loadingStatus)
  const vacancies = useSelector(vacanciesSelector)

  useEffect(() => {
    setCurrentPage(1)
    setUpdate(v => !v)
  }, [payment_from, payment_to, profession, keywords])

  useEffect(() => {
    dispatch(fetchVacancies({ currentPage, payment_from, payment_to, profession, keywords }))
  }, [currentPage, update])

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