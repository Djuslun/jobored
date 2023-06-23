import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLoadingStatusSelector, fetchToken, fetchCatalogues } from '../redux/appSlice';
import { favoritesVacanciesSet } from '../redux/favoriteSlice';

const useAppLoadingStatus = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isLoaded } = useSelector(appLoadingStatusSelector);

  useEffect(() => {
    dispatch(favoritesVacanciesSet());
    dispatch(fetchToken());
    dispatch(fetchCatalogues());
  }, []);

  return { isLoading, isError, isLoaded };
};

export default useAppLoadingStatus;