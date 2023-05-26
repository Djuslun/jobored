import VacancyList from "../components/vacancyList/VacancyList"
import { useState } from "react"
import { Spinner } from "../components/spinner/Spinner";
import FavoriteEmptyState from "../components/favoriteEmptyState/FavoriteEmptyState";
import Vacancies from "../components/vacancies/Vacancies";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import { useSelector } from "react-redux";
import { favoriteVacanciesSelector } from "../redux/favoriteSlice";
import useFavorites from "../hooks/useFavorites";

const Favorite = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { favorites: favoriteItems, total } = useSelector(favoriteVacanciesSelector)

  const { isLoading, isError, isLoaded, forceUpdate } = useFavorites(currentPage)

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