import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { vacancyLoadingStatusSelector, fetchVacancy } from "../redux/vacancySlice"
import parse from 'html-react-parser';

const useVacancy = () => {
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

  return { isLoading, isError, isLoaded, vacancy, vacancyItem }
}

export default useVacancy