import {
  FETCH_WEATHER_BY_TIME_SUCCESS,
  FETCH_WEATHER_BY_TIME_FAILURE,
  FETCH_WEATHER_BY_TIME_REQUEST,
} from "./actions"

const initialState = {
  loading: false,
  data: null,
  error: null,
}

const weatherByTimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_BY_TIME_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_WEATHER_BY_TIME_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case FETCH_WEATHER_BY_TIME_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default weatherByTimeReducer
