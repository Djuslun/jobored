import VacancyList from "../components/vacancyList/VacancyList"
import { useEffect, useState } from "react"
import { Spinner } from "../components/spinner/Spinner";
import FavoriteEmptyState from "../components/favoriteEmptyState/FavoriteEmptyState";
import Vacancies from "../components/vacancies/Vacancies";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import { fetchFavorites } from "../redux/favoriteSlice";
import { useSelector, useDispatch } from "react-redux";
import { favoriteVacanciesSelector } from "../redux/favoriteSlice";

const Favorite = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [update, setUpdate] = useState(false)

  const favoriteItems = useSelector(favoriteVacanciesSelector)
  const total = useSelector(state => Math.ceil(state.favorites.total / 4))

  const loadingStatus = useSelector(state => state.favorites.loadingStatus)
  const errorStatus = useSelector(state => state.favorites.errorStatus)
  const isReady = !(loadingStatus || errorStatus)

  useEffect(() => {
    dispatch(fetchFavorites(currentPage))
  }, [currentPage, update])

  const handlePageChange = (page) => {
    const favoriteIDs = JSON.parse(localStorage.getItem('favorites')) || []
    const totalPages = Math.ceil(favoriteIDs.length / 4)
    const validPage = Math.max(1, Math.min(totalPages, page))

    if (currentPage === totalPages) {
      setUpdate(v => !v)
    }

    setCurrentPage(validPage)
  }

  return (
    <Vacancies currentPage={currentPage} total={total} setCurrentPage={handlePageChange}>
      {loadingStatus && <Spinner />}
      {errorStatus && <ErrorMessage />}
      {isReady && <View favoriteItems={favoriteItems} />}
    </Vacancies>
  )
}

export default Favorite

const View = ({ favoriteItems }) => {
  return (
    favoriteItems.length
      ? <VacancyList vacancies={favoriteItems} />
      : <FavoriteEmptyState />
  )
}