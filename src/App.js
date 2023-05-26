import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { useDispatch, useSelector } from "react-redux";
import { favoritesVacanciesSet } from './redux/favoriteSlice';
import { useEffect } from 'react';
import { Spinner } from './components/spinner/Spinner';
import ErrorMessage from './components/errorMessage/ErrorMessage';
import './styles/_app.scss';
import { fetchToken, fetchCatalogues, appLoadingStatusSelector } from './redux/appSlice';

function App() {
  const dispatch = useDispatch()
  const { isLoading, isError, isLoaded } = useSelector(appLoadingStatusSelector)

  useEffect(() => {
    dispatch(favoritesVacanciesSet())
    dispatch(fetchToken())
    dispatch(fetchCatalogues())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        {isLoading && <Spinner />}
        {isError && <ErrorMessage />}
        {isLoaded && <View />}
      </div>
    </BrowserRouter >
  );
}

export default App;

const View = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  )
}