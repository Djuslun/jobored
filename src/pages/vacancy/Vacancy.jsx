import VacancyItem from '../../components/vacancyItem/VacancyItem';
import { Spinner } from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import useVacancy from '../../hooks/useVacancy';
import './vacancy.scss'

const Vacancy = () => {

  const { isLoading, isError, isLoaded, vacancy, vacancyItem } = useVacancy()

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}
      {isLoaded && <View vacancyItem={vacancyItem} vacancy={vacancy} />}
    </>
  )
}

export default Vacancy

const View = ({ vacancyItem, vacancy }) => {
  return (
    <div className='vacancy-page'>
      <VacancyItem {...vacancyItem} isSingleVacancy={true} />
      <div className='vacancy-page__body'>
        {vacancy}
      </div>
    </div>)
}