import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { getAccsesKey } from "../servises/getAccsesKey";
import { getCatalogues } from "../servises/getCatalogues";

const vacanciesAdapter = createEntityAdapter()

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

const initialState = vacanciesAdapter.getInitialState({
  tokenLoadingStatus: 'idle',
  favoriteIDs: [],
  filters: {
    profession: '',
    payment_from: '',
    payment_to: '',
    keywords: ''
  },
  catalogues: []
})

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    // favoriteVacancyToggle: (state, action) => {
    //   if (state.favoriteIDs.includes(action.payload)) {
    //     state.favoriteIDs = state.favoriteIDs.filter(id => id !== action.payload)
    //   } else {
    //     state.favoriteIDs.push(action.payload)
    //   }
    //   localStorage.setItem('favorites', JSON.stringify(state.favoriteIDs))
    // },
    // favoriteVacanciesSet: (state) => {
    //   const favorites = JSON.parse(localStorage.getItem('favorites'))
    //   if (favorites) {
    //     state.favoriteIDs = favorites
    //   }
    // },
    filtersSet: (state, action) => {
      const { profession, payment_from, payment_to } = action.payload
      state.filters = { ...state.filters, profession, payment_from, payment_to }
    },
    keywordsSet: (state, action) => {
      state.filters.keywords = action.payload
    },
    filtersReset: (state) => {
      state.filters = {
        profession: '',
        payment_from: '',
        payment_to: '',
        keywords: ''
      }
    }
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

const { actions, reducer } = vacanciesSlice

export default reducer

export const { selectAll, selectById } = vacanciesAdapter.getSelectors(state => state.vacancies)

export const { pageChange, filtersSet, keywordsSet, filtersReset } = actions