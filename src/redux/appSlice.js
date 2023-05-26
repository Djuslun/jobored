import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import useVacanciesService from "../servises/vacanciesServise";
import { useAccsesKey } from "../servises/getAccsesKey";

const appAdapter = createEntityAdapter()

export const fetchToken = createAsyncThunk(
  'app/fetchToken',
  () => useAccsesKey()
)

export const fetchCatalogues = createAsyncThunk(
  'app/fetchCatalogues',
  async () => {
    const { getCatalogues } = useVacanciesService()
    return getCatalogues()
  }
)

const initialState = appAdapter.getInitialState({
  tokenLoadingStatus: true,
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
        state.tokenErrorStatus = false
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
        state.cataloguesErrorStatus = false
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

export const appLoadingStatusSelector = createSelector(
  (state) => state.appReducer.tokenErrorStatus,
  (state) => state.appReducer.cataloguesErrorStatus,
  (state) => state.appReducer.tokenLoadingStatus,
  (state) => state.appReducer.cataloguesLoadingStatus,
  (tokenError, cataloguesError, tokenLoading, cataloguesLoading) => {
    const isLoading = tokenLoading || cataloguesLoading
    const isError = tokenError || cataloguesError
    const isLoaded = !(isLoading || isError)

    return { isLoading, isError, isLoaded }
  }
)

export default appReducer