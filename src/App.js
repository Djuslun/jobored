import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { useDispatch, useSelector } from "react-redux";
import { fetchToken, favoriteVacanciesSet, fetchCatalogues } from './redux/vacanciesSlice';
import { useEffect } from 'react';
import { Spinner } from './components/spinner/Spinner';
import ErrorMessage from './components/errorMessage/ErrorMessage';
import './styles/_app.scss';


function App() {
  const dispatch = useDispatch()
  const { tokenLoadingStatus } = useSelector(store => store.vacancies)

  useEffect(() => {
    dispatch(fetchCatalogues())
    dispatch(favoriteVacanciesSet())
    dispatch(fetchToken())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        {view[tokenLoadingStatus]}
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