import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVacancies } from '../redux/vacanciesSlice'
import { useForceUpdate } from '../hooks/useForceUpdate'
import { vacanciesSelector } from '../redux/vacanciesSlice'
import { vacanciesLoadingStatusSelector } from '../redux/vacanciesSlice'

const useVacancies = () => {
  const dispatch = useDispatch()
  const [update, forceUpdate] = useForceUpdate()
  const [currentPage, setCurrentPage] = useState(1)

  const { payment_to, payment_from, profession, keywords } = useSelector(state => state.filter.filter)
  const { vacancies, total } = useSelector(vacanciesSelector)
  const { isLoading, isError, isLoaded } = useSelector(vacanciesLoadingStatusSelector)

  useEffect(() => {
    setCurrentPage(1)
    forceUpdate()
  }, [payment_from, payment_to, profession, keywords])

  useEffect(() => {
    dispatch(fetchVacancies({ currentPage, payment_from, payment_to, profession, keywords }))
  }, [currentPage, update])

  return {
    currentPage,
    setCurrentPage,
    isLoading,
    isError,
    isLoaded,
    vacancies,
    total
  }
}

export default useVacancies
