import FilterForm from "../../components/filterForm/FilterForm"
import VacancyList from "../../components/vacancyList/VacancyList"
import CustomInput from "../../components/customInput/CustomInput"
import { Pagination } from '@mantine/core';
import './vacancySearch.scss'

const VacancySearch = () => {
  return (
    <div className="vacancy-search">
      <FilterForm />
      <div className="vacancy-search__body">
        <CustomInput />
        <VacancyList />
        <Pagination
          total={20}
          position="center"
        />
      </div>
    </div>
  )
}

export default VacancySearch