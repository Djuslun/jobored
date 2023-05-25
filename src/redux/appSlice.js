import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import useVacanciesService from "../servises/vacanciesServise";
import { useAccsesKey } from "../servises/getAccsesKey";

const appAdapter = createEntityAdapter()

export const fetchToken = createAsyncThunk(
  'vacancies/fetchToken',
  () => useAccsesKey()
)

export const fetchCatalogues = createAsyncThunk(
  'vacancies/fetchCatalogues',
  async () => {
    const { getCatalogues } = useVacanciesService()
    return getCatalogues()
  }
)

const initialState = appAdapter.getInitialState({
  tokenLoadingStatus: 'idle',
  catalogues: []
})

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.tokenLoadingStatus = 'loading'
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.tokenLoadingStatus = 'ok'
      })
      .addCase(fetchToken.rejected, (state) => {
        state.tokenLoadingStatus = 'error'
      })
      .addCase(fetchCatalogues.fulfilled, (state, action) => {
        const catalogues = action.payload.map(item => ({ label: item.title_trimmed, value: item.key }))
        state.catalogues = catalogues;
      })
      .addCase(fetchCatalogues.rejected, () => {
        console.log('Coudn`t fetch catalogues')
      })
      .addDefaultCase(() => { })
  }
})

const { reducer: appReducer } = appSlice

export default appReducer