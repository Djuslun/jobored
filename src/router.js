import { Routes, Route } from 'react-router-dom';

import Favorite from './pages/Favorite';
import Vacancy from './pages/vacancy/Vacancy';
import VacancySearch from './pages/vacanySearch/VacancySearch';
import NotFoundPage from './pages/NotFoundPage';

const AppRouter = () => {

  return (
    <Routes>
      <Route path='/' element={<VacancySearch />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/vacancy/:id' element={<Vacancy />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter