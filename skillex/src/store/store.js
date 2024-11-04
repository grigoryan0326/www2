import { configureStore } from "@reduxjs/toolkit"
import filtersReducer from "./filtersSlice"
import { loadState, saveState } from "../utils/localStorage"

const persistedState = loadState()

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
  preloadedState: {
    filters: persistedState || undefined,
  },
})

store.subscribe(() => {
  saveState(store.getState().filters)
})

export default store
