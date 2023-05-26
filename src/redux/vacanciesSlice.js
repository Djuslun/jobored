import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import useVacanciesService from "../servises/vacanciesServise";
import { _transformVacancies } from "../servises/transformVacancies";

const vacanciesAdapter = createEntityAdapter()

export const fetchVacancies = createAsyncThunk(
  'vacancies/fetchVacancies',
  async ({ currentPage, payment_from, payment_to, profession, keywords }) => {
    const { getVacancies } = useVacanciesService()

    return await getVacancies(currentPage, payment_from, payment_to, profession, keywords)
  }
)

const initialState = vacanciesAdapter.getInitialState({
  loadingStatus: false,
  errorStatus: false,
  total: 0,
})

const favoritesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.total = 0
        state.loadingStatus = true
        state.errorStatus = false
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        const { objects, total } = action.payload
        const data = _transformVacancies(objects)
        vacanciesAdapter.setAll(state, data)
        state.loadingStatus = false
        state.total = total > 500 ? 125 : Math.ceil(total / 4)
      })
      .addCase(fetchVacancies.rejected, (state) => {
        state.loadingStatus = false
        state.errorStatus = true
      })
      .addDefaultCase(() => { })
  }
})

const { reducer: vacancies } = favoritesSlice

export default vacancies

export const { selectAll } = vacanciesAdapter.getSelectors(state => state.vacancies)

export const vacanciesSelector = createSelector(
  selectAll,
  (state) => state.vacancies.total,
  (vacancies, total) => ({ vacancies, total })
)

export const vacanciesLoadingStatusSelector = createSelector(
  (state) => state.vacancies.loadingStatus,
  (state) => state.vacancies.errorStatus,
  (isLoading, isError) => {
    const isLoaded = !(isLoading || isError)
    return { isLoading, isError, isLoaded }
  }
)