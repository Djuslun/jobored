import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import { Spinner } from './components/spinner/Spinner';
import ErrorMessage from './components/errorMessage/ErrorMessage';
import { Favorite, Vacancy, VacancySearch, NotFoundPage } from './pages'
import useAppLoadingStatus from './hooks/useAppLoadingStatus';
import './styles/_app.scss';

function App() {
  const { isLoading, isError, isLoaded } = useAppLoadingStatus()

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
      <main className='main'>
        <div className="main__container">
          <Routes>
            <Route path='/' element={<Navigate to={'/vacancy'} />} />
            <Route path='/vacancy' element={<VacancySearch />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/vacancy/:id' element={<Vacancy />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </>
  )
}