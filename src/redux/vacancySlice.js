import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import useVacanciesService from "../servises/vacanciesServise";
import { _transformVacancy } from "../servises/transformVacancies";

const vacancyAdapter = createEntityAdapter()

export const fetchVacancy = createAsyncThunk(
  'vacancy/fetchVacancy',
  async (id) => {
    const { getVacancy } = useVacanciesService()

    return await getVacancy(id)
  }
)

const initialState = vacancyAdapter.getInitialState({
  loadingStatus: false,
  errorStatus: false,
  vacancy: {},
})

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancy.pending, (state) => {
        state.loadingStatus = true
        state.errorStatus = false
      })
      .addCase(fetchVacancy.fulfilled, (state, action) => {
        const data = _transformVacancy(action.payload)
        state.vacancy = data
        state.loadingStatus = false
      })
      .addCase(fetchVacancy.rejected, (state) => {
        state.loadingStatus = false
        state.errorStatus = true
      })
      .addDefaultCase(() => { })
  }
})

const { reducer: vacancy } = vacancySlice

export const vacancyLoadingStatusSelector = createSelector(
  (state) => state.vacancy.loadingStatus,
  (state) => state.vacancy.errorStatus,
  (isLoading, isError) => {
    const isLoaded = !(isLoading || isError)
    return { isLoading, isError, isLoaded }
  }
)


export default vacancy

