import { configureStore } from '@reduxjs/toolkit';
import reducer from './vacanciesSlice'
import favorites from './favoriteSlice';

const stringMiddleWare = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action)
}

const store = configureStore({
  reducer: {
    vacancies: reducer,
    favorites
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;