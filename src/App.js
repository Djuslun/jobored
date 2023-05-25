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
  const cataloguesLoadingStatus = useSelector(store => store.appReducer.cataloguesLoadingStatus)

  const getAppLoadingStatus = () => {
    const isLoading = tokenLoadingStatus === 'loading' || cataloguesLoadingStatus === 'loading'
    const isError = tokenLoadingStatus === 'error' || cataloguesLoadingStatus === 'error'
    const isOk = tokenLoadingStatus === 'ok' && cataloguesLoadingStatus === 'ok'

    return isLoading ? 'loading' : isError ? 'error' : isOk ? 'ok' : ''
  }

  const appStatus = getAppLoadingStatus()


  useEffect(() => {
    dispatch(fetchCatalogues())
    dispatch(favoritesVacanciesSet())
    dispatch(fetchToken())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        {view[appStatus]}
      </div>
    </BrowserRouter >
  );
}

export default App;

const view = {
  'ok':
    <>
      <Header />
      <Main />
    </>,
  'loading': <Spinner />,
  'error': <ErrorMessage />
}