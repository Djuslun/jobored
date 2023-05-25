import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import VacancyItem from '../../components/vacancyItem/VacancyItem';
import { useEffect, useState } from 'react';
import { Spinner } from '../../components/spinner/Spinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import { fetchVacancy } from '../../redux/vacancySlice';
import { useDispatch, useSelector } from 'react-redux';
import './vacancy.scss'

const Vacancy = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const vacancyItem = useSelector(state => state.vacancy.vacancy)
  const loadingStatus = useSelector(state => state.vacancy.loadingStatus)
  const [vacancy, setVacancy] = useState('')

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
      <View
        loadingStatus={loadingStatus}
        vacancyItem={vacancyItem}
        vacancy={vacancy} />
    </>
  )
}

export default Vacancy

const View = ({ loadingStatus, vacancyItem, vacancy }) => {
  switch (loadingStatus) {
    case 'loading': return <Spinner />
    case 'error': return <ErrorMessage />
    case 'ok': {
      return (
        <div className='vacancy-page'>
          <VacancyItem {...vacancyItem} isSingleVacancy={true} />
          <div className='vacancy-page__body'>
            {vacancy}
          </div>
        </div>)
    }
    default: return <></>
  }
}