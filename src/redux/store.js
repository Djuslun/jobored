import { configureStore } from '@reduxjs/toolkit';
import filter from './filtersSlice'
import favorites from './favoriteSlice';
import appReducer from './appSlice';
import vacancies from './vacanciesSlice';
import vacancy from './vacancySlice';

const store = configureStore({
  reducer: {
    appReducer,
    vacancies,
    filter,
    favorites,
    vacancy,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;