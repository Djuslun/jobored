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
  tokenLoadingStatus: false,
  tokenErrorStatus: false,
  cataloguesLoadingStatus: false,
  cataloguesErrorStatus: false,
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
        state.tokenLoadingStatus = true
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.tokenLoadingStatus = false
      })
      .addCase(fetchToken.rejected, (state) => {
        state.tokenLoadingStatus = false
        state.tokenErrorStatus = true
      })
      .addCase(fetchCatalogues.pending, (state) => {
        state.cataloguesLoadingStatus = true
      })
      .addCase(fetchCatalogues.fulfilled, (state, action) => {
        const catalogues = action.payload.map(item => ({ label: item.title_trimmed, value: item.key }))
        state.catalogues = catalogues
        state.cataloguesLoadingStatus = false
      })
      .addCase(fetchCatalogues.rejected, (state) => {
        console.log('Coudn`t fetch catalogues')
        state.cataloguesLoadingStatus = false
        state.cataloguesErrorStatus = true
      })
      .addDefaultCase(() => { })
  }
})

const { reducer: appReducer } = appSlice

export default appReducer