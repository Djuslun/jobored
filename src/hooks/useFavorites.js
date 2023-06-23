import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForceUpdate } from "./useForceUpdate"
import { favoriteLoadingStatusSelector, fetchFavorites } from "../redux/favoriteSlice"

const useFavorites = (currentPage) => {
  const [update, forceUpdate] = useForceUpdate()

  const dispatch = useDispatch()

  const { isLoading, isError, isLoaded } = useSelector(favoriteLoadingStatusSelector)

  useEffect(() => {
    dispatch(fetchFavorites(currentPage))
  }, [currentPage, update])

  return { isLoading, isError, isLoaded, forceUpdate }
}

export default useFavorites