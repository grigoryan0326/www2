import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  filteredProducts: [],
  sortedProducts: [],
  searchQuery: "",
  selectedCategories: [],
  selectedBrands: [],
  selectedRating: false,
  minPrice: 0,
  maxPrice: 1000,
  sortOption: "default",
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload
    },
    setSortedProducts: (state, action) => {
      state.sortedProducts = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload
    },
    setSelectedBrands: (state, action) => {
      state.selectedBrands = action.payload
    },
    setSelectedRating: (state, action) => {
      state.selectedRating = action.payload
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload
    },
  },
})

export const {
  setFilteredProducts,
  setSortedProducts,
  setSearchQuery,
  setSelectedCategories,
  setSelectedBrands,
  setSelectedRating,
  setMinPrice,
  setMaxPrice,
  setSortOption,
} = filtersSlice.actions

export default filtersSlice.reducer
