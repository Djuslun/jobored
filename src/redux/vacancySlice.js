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
  loadingStatus: 'idle',
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
        state.loadingStatus = 'loading'
      })
      .addCase(fetchVacancy.fulfilled, (state, action) => {
        const data = _transformVacancy(action.payload)
        state.vacancy = data
        state.loadingStatus = 'ok'
      })
      .addCase(fetchVacancy.rejected, (state) => {
        state.loadingStatus = 'error'
      })
      .addDefaultCase(() => { })
  }
})

const { reducer: vacancy } = vacancySlice

export default vacancy

