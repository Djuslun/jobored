import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import VacancyItem from '../../components/vacancyItem/VacancyItem';
import { useEffect, useState } from 'react';
import { Spinner } from '../../components/spinner/Spinner';
import useVacanciesService from '../../servises/vacanciesServise';
import { parseOptions } from '../../utils/variable';
import './vacancy.scss'

const Vacancy = () => {
  const { getVacancy, loadingStatus } = useVacanciesService()
  const params = useParams()
  const [vacancyItem, setVacancyItem] = useState({});
  const [vacancy, setVacancy] = useState('')

  useEffect(() => {
    getVacancy(params.id)
      .then(data => setVacancyItem(data))
  }, [])

  useEffect(() => {
    if (vacancyItem.vacancyRichText) {
      setVacancy(parse(vacancyItem.vacancyRichText, parseOptions))
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
    case 'error': return 'Error'
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