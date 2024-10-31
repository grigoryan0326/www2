import {
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  FETCH_WEATHER_REQUEST,
  SET_CITY,
  SET_UNITS,
} from "./actions"

const initialState = {
  city: "Yerevan",
  loading: false,
  data: null,
  error: null,
  units: "metric",
}

const currentWeatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UNITS:
      return { ...state, units: action.payload }
    case SET_CITY:
      return { ...state, city: action.payload }
    case FETCH_WEATHER_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_WEATHER_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case FETCH_WEATHER_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default currentWeatherReducer
