import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import useVacanciesService from "../servises/vacanciesServise";
import { _transformVacancies } from "../servises/transformVacancies";

const favoritesAdapter = createEntityAdapter()

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (page = 1) => {
    const { getFavoriteVacacies } = useVacanciesService()

    return await getFavoriteVacacies(page)
  }
)

const initialState = favoritesAdapter.getInitialState({
  loadingStatus: false,
  errorStatus: false,
  favoriteIDs: [],
  total: 0
})

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    favoritesVacancyToggle: (state, action) => {
      if (state.favoriteIDs.includes(action.payload)) {
        state.favoriteIDs = state.favoriteIDs.filter(id => id !== action.payload)
      } else {
        state.favoriteIDs.push(action.payload)
      }
      localStorage.setItem('favorites', JSON.stringify(state.favoriteIDs))
    },
    favoritesVacanciesSet: (state) => {
      const favorites = JSON.parse(localStorage.getItem('favorites'))
      if (favorites) {
        state.favoriteIDs = favorites
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.total = 0
        state.loadingStatus = true
        state.errorStatus = false
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        const { objects, total } = action.payload
        const data = _transformVacancies(objects)

        favoritesAdapter.setAll(state, data)
        state.loadingStatus = false
        state.total = total
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.loadingStatus = false
        state.errorStatus = true
      })
      .addDefaultCase(() => { })
  }
})

const { actions, reducer: favorites } = favoritesSlice

export default favorites

export const { selectAll } = favoritesAdapter.getSelectors(state => state.favorites)

export const favoriteVacanciesSelector = createSelector(
  selectAll,
  (state) => state.favorites.total,
  (favorites, total) => ({ favorites, total: Math.ceil(total / 4) })
)

export const favoriteLoadingStatusSelector = createSelector(
  (state) => state.favorites.loadingStatus,
  (state) => state.favorites.errorStatus,
  (isLoading, isError) => {
    const isLoaded = !(isLoading || isError)
    return { isLoading, isError, isLoaded }
  }
)

export const { favoritesVacancyToggle, favoritesVacanciesSet } = actions