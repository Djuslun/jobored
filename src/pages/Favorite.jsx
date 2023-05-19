import VacancyList from "../components/vacancyList/VacancyList"
import { useEffect, useState } from "react"
import { Spinner } from "../components/spinner/Spinner";
import useVacanciesService from "../servises/vacanciesServise";
import FavoriteEmptyState from "../components/favoriteEmptyState/FavoriteEmptyState";
import Vacancies from "../components/vacancies/Vacancies";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const Favorite = () => {
  const { loadingStatus, getFavoriteVacacies } = useVacanciesService()
  const [currentPage, setCurrentPage] = useState(1)
  const [favoriteItems, setFavoriteItems] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getFavoriteVacacies(currentPage)
      .then(data => {
        setFavoriteItems(data.vacancies)
        setTotal(Math.ceil(data.total / 4))
      })
  }, [currentPage])

  return (
    <Vacancies currentPage={currentPage} total={total} setCurrentPage={setCurrentPage}>
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