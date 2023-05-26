import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import VacancyItem from '../../components/vacancyItem/VacancyItem';
import { useEffect, useState } from 'react';
import { Spinner } from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { fetchVacancy, vacancyLoadingStatusSelector } from '../../redux/vacancySlice';
import { useDispatch, useSelector } from 'react-redux';
import './vacancy.scss'

const Vacancy = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const [vacancy, setVacancy] = useState('')

  const vacancyItem = useSelector(state => state.vacancy.vacancy)
  const { isLoading, isError, isLoaded } = useSelector(vacancyLoadingStatusSelector)


  useEffect(() => {
    dispatch(fetchVacancy(params.id))
  }, [])

  useEffect(() => {
    if (vacancyItem.vacancyRichText) {
      setVacancy(parse(vacancyItem.vacancyRichText))
    }
  }, [vacancyItem])

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