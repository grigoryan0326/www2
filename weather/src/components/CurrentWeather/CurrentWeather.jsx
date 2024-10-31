import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../../store/actions"
import { API_KEY, API_CURRENT_WEATHER } from "../../constants"

import "./CurrentWeather.scss"
import WeatherByTime from "../WeatherByTime/WeatherByTime"

const WeatherComponent = () => {
  const dispatch = useDispatch()
  const weather = useSelector((state) => state.currentWeather.data)
  const city = useSelector((state) => state.currentWeather.city)
  const error = useSelector((state) => state.currentWeather.error)
  const loading = useSelector((state) => state.currentWeather.loading)
  const units = useSelector((state) => state.currentWeather.units)
  const icon = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`

  useEffect(() => {
    const fetchWeather = async () => {
      dispatch(fetchWeatherRequest())
      try {
        const response = await fetch(
          `${API_CURRENT_WEATHER}?q=${city}&appid=${API_KEY}&units=${units}`
        )
        const data = await response.json()

        if (response.ok) {
          dispatch(fetchWeatherSuccess(data))
        } else {
          dispatch(fetchWeatherFailure(data.message))
        }
      } catch (error) {
        dispatch(fetchWeatherFailure(error.message))
      }
    }

    fetchWeather()
  }, [dispatch, city, units])

  return (
    <div className='current-weather'>
      {loading ? (
        <p className='loading'>Loading...</p>
      ) : error ? (
        <p className='error'>Error: {error}</p>
      ) : (
        <div className='current-weather__container'>
          <div className='current-weather__info'>
            <h1 className='current-weather__title'>{weather?.name}</h1>
            <p className='current-weather__temp'>
              {weather?.main.temp} {units === "metric" ? "°C" : "°F"}
            </p>
            <img
              src={icon}
              alt='icon'
            />
            <p className='current-weather__desc'>{weather?.weather[0].main}</p>
          </div>
          <WeatherByTime />
        </div>
      )}
    </div>
  )
}

export default WeatherComponent
