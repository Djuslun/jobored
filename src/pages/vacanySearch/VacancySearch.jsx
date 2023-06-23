import FilterForm from "../../components/filterForm/FilterForm"
import VacancyList from "../../components/vacancyList/VacancyList"
import CustomInput from "../../components/customInput/CustomInput"
import { Spinner } from "../../components/spinner/Spinner";
import Vacancies from "../../components/vacancies/Vacancies";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import useVacancies from '../../hooks/useVacansies';

import './vacancySearch.scss'

const VacancySearch = () => {
  const {
    currentPage,
    setCurrentPage,
    isLoading,
    isError,
    vacancies,
    isLoaded,
    total
  } = useVacancies()

  return (
    <>
      <div className="vacancy-search">
        <FilterForm />
        <div className="vacancy-search__body">
          <CustomInput />
          {isLoading && <Spinner />}
          {isError && <ErrorMessage />}
          {isLoaded &&
            <Vacancies
              currentPage={currentPage}
              total={total}
              setCurrentPage={setCurrentPage}>
              <VacancyList vacancies={vacancies} />
            </Vacancies>}
        </div>
      </div>
    </>
  )
}

export default VacancySearch