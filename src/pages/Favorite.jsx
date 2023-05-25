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

  useEffect(() => {
    dispatch(fetchFavorites(currentPage))
  }, [currentPage, update])

  const handlePageChange = (page) => {
    console.log(currentPage, 'curr')
    console.log(page, 'page')
    const favoriteIDs = JSON.parse(localStorage.getItem('favorites')) || []
    console.log(Math.ceil(favoriteIDs.length / 4), 'total')

    if (currentPage === Math.ceil(favoriteIDs.length / 4)) {
      setUpdate(v => !v)
    }
    if (page > Math.ceil(favoriteIDs.length / 4)) {
      setCurrentPage(Math.ceil(favoriteIDs.length / 4))
    } else {
      setCurrentPage(page)
    }
  }

  return (
    <Vacancies currentPage={currentPage} total={total} setCurrentPage={handlePageChange}>
      <View
        loadingStatus={loadingStatus}
        favoriteItems={favoriteItems} />
    </Vacancies>
  )
}

export default Favorite

const View = ({ loadingStatus, favoriteItems }) => {
  switch (loadingStatus) {
    case 'loading': return <Spinner />
    case 'error': return <ErrorMessage />
    case 'ok': {
      return favoriteItems.length
        ? <VacancyList vacancies={favoriteItems} />
        : <FavoriteEmptyState
        />
    }
    default: return <></>
  }
}