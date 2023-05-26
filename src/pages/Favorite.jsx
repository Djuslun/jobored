import VacancyList from "../components/vacancyList/VacancyList"
import { useEffect, useState } from "react"
import { Spinner } from "../components/spinner/Spinner";
import FavoriteEmptyState from "../components/favoriteEmptyState/FavoriteEmptyState";
import Vacancies from "../components/vacancies/Vacancies";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import { fetchFavorites } from "../redux/favoriteSlice";
import { useSelector, useDispatch } from "react-redux";
import { favoriteVacanciesSelector, favoriteLoadingStatusSelector } from "../redux/favoriteSlice";
import { useForceUpdate } from "../hooks/useForceUpdate";

const Favorite = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [update, forceUpdate] = useForceUpdate()

  const favoriteItems = useSelector(favoriteVacanciesSelector)
  const total = useSelector(state => Math.ceil(state.favorites.total / 4))

  const { isLoading, isError, isLoaded } = useSelector(favoriteLoadingStatusSelector)

  useEffect(() => {
    dispatch(fetchFavorites(currentPage))
  }, [currentPage, update])

  const handlePageChange = (page) => {
    const favoriteIDs = JSON.parse(localStorage.getItem('favorites')) || []
    const totalPages = Math.ceil(favoriteIDs.length / 4)
    const validPage = Math.max(1, Math.min(totalPages, page))

    if (currentPage === totalPages) {
      forceUpdate()
    }

    setCurrentPage(validPage)
  }

  return (
    <Vacancies currentPage={currentPage} total={total} setCurrentPage={handlePageChange}>
      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}
      {isLoaded && <View favoriteItems={favoriteItems} />}
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