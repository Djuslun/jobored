import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const vacanciesAdapter = createEntityAdapter()

const initialState = vacanciesAdapter.getInitialState({
  filter: {
    profession: '',
    payment_from: '',
    payment_to: '',
    keywords: ''
  },
})

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersSet: (state, action) => {
      const { profession, payment_from, payment_to } = action.payload
      state.filter = { ...state.filter, profession, payment_from, payment_to }
    },
    keywordsSet: (state, action) => {
      state.filter.keywords = action.payload
    },
    filtersReset: (state) => {
      state.filter = {
        profession: '',
        payment_from: '',
        payment_to: '',
        keywords: ''
      }
    }
  },
})

const { actions, reducer: filter } = filtersSlice

export default filter

export const { filtersSet, keywordsSet, filtersReset } = actions