export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS"
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE"
export const FETCH_WEATHER_REQUEST = "FETCH_WEATHER_REQUEST"
export const FETCH_WEATHER_BY_TIME_REQUEST = "FETCH_WEATHER_BY_TIME_REQUEST"
export const FETCH_WEATHER_BY_TIME_SUCCESS = "FETCH_WEATHER_BY_TIME_SUCCESS"
export const FETCH_WEATHER_BY_TIME_FAILURE = "FETCH_WEATHER_BY_TIME_FAILURE"
export const SET_CITY = "SET_CITY"
export const SET_UNITS = "SET_UNITS"

export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
})

export const fetchWeatherSuccess = (data) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: data,
})

export const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
})

export const setCity = (city) => ({
  type: "SET_CITY",
  payload: city,
})

export const setUnits = (units) => ({
  type: SET_UNITS,
  payload: units,
})

export const fetchWeatherByTimeRequest = () => ({
  type: FETCH_WEATHER_BY_TIME_REQUEST,
})

export const fetchWeatherByTimeSuccess = (data) => ({
  type: FETCH_WEATHER_BY_TIME_SUCCESS,
  payload: data,
})

export const fetchWeatherByTimeFailure = (error) => ({
  type: FETCH_WEATHER_BY_TIME_FAILURE,
  payload: error,
})
