import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { useDispatch, useSelector } from "react-redux";
import { favoritesVacanciesSet } from './redux/favoriteSlice';
import { useEffect } from 'react';
import { Spinner } from './components/spinner/Spinner';
import ErrorMessage from './components/errorMessage/ErrorMessage';
import './styles/_app.scss';
import { fetchToken, fetchCatalogues } from './redux/appSlice';

function App() {
  const dispatch = useDispatch()
  const tokenLoadingStatus = useSelector(store => store.appReducer.tokenLoadingStatus)
  const tokenErrorStatus = useSelector(store => store.appReducer.tokenErrorStatus)
  const cataloguesLoadingStatus = useSelector(store => store.appReducer.cataloguesLoadingStatus)
  const cataloguesErrorStatus = useSelector(store => store.appReducer.cataloguesErrorStatus)

  const isLoading = tokenLoadingStatus || cataloguesLoadingStatus
  const isError = tokenErrorStatus || cataloguesErrorStatus
  const isReady = !(isLoading || isError)

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
        {isReady && <View />}
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