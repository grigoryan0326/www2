import { createStore, compose, combineReducers } from "redux"
import currentWeatherReducer from "./currentWeatherReducer.js"
import weatherByTimeReducer from "./weatherByTimeReducer.js"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  currentWeather: currentWeatherReducer,
  weatherByTime: weatherByTimeReducer,
})

const store = createStore(rootReducer, composeEnhancers())

export default store
