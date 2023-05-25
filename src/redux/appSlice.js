import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { getAccsesKey } from "../servises/getAccsesKey";
import { getCatalogues } from "../servises/getCatalogues";

const appAdapter = createEntityAdapter()

export const fetchToken = createAsyncThunk(
  'vacancies/fetchToken',
  () => getAccsesKey()
)

export const fetchCatalogues = createAsyncThunk(
  'vacancies/fetchCatalogues',
  async () => {
    const { request } = getCatalogues()
    return await request()
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
      .addCase(fetchToken.fulfilled, (state) => {
        state.tokenLoadingStatus = 'ok'
      })
      .addCase(fetchToken.rejected, (state) => {
        state.tokenLoadingStatus = 'error'
      })
      .addCase(fetchCatalogues.fulfilled, (state, action) => {
        state.catalogues = action.payload
      })
      .addCase(fetchCatalogues.rejected, () => {
        console.log('Coudn`t fetch catalogues')
      })
      .addDefaultCase(() => { })
  }
})

const { reducer: appReducer } = appSlice

export default appReducer