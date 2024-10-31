import { useEffect, useState } from "react"
import { API_FORECAST, API_KEY } from "../../constants"
import {
  fetchWeatherByTimeFailure,
  fetchWeatherByTimeRequest,
  fetchWeatherByTimeSuccess,
} from "../../store/actions"
import { getTime } from "../../utils"
import { useDispatch, useSelector } from "react-redux"
import "./WeatherByTime.scss"

const WeatherByTime = () => {
  const [times, setTimes] = useState([])
  const dispatch = useDispatch()

  const city = useSelector((state) => state.currentWeather.city)
  const units = useSelector((state) => state.currentWeather.units)

  const weather = useSelector((state) => state.weatherByTime.data)
  const error = useSelector((state) => state.weatherByTime.error)
  const loading = useSelector((state) => state.weatherByTime.loading)

  useEffect(() => {
    setTimes(weather?.list.slice(0, 5))
  }, [weather?.list])

  useEffect(() => {
    const fetchWeather = async () => {
      dispatch(fetchWeatherByTimeRequest())
      try {
        const response = await fetch(
          `${API_FORECAST}?q=${city}&appid=${API_KEY}&units=${units}`
        )
        const data = await response.json()

        if (response.ok) {
          dispatch(fetchWeatherByTimeSuccess(data))
        } else {
          dispatch(fetchWeatherByTimeFailure(data.message))
        }
      } catch (error) {
        dispatch(fetchWeatherByTimeFailure(error.message))
      }
    }

    fetchWeather()
  }, [dispatch, city, units])

  return (
    <div className='weatherByTime'>
      {loading && <div className='loading'>Loading...</div>}
      {error && <div className='error'>Error: {error}</div>}
      {city && (
        <div>
          <h2 className='weatherByTime__title'>Closest hours in {city}</h2>
          <ul className='weatherByTime__list'>
            {times?.map((item, index) => (
              <li
                key={index}
                className='weatherByTime__item'
              >
                <p className='weatherByTime__time'>{getTime(item.dt_txt)}</p>
                <p className='weatherByTime__temp'>
                  {item?.main?.temp} {units === "metric" ? "°C" : "°F"}
                </p>
                <p className='weatherByTime__desc'>{item?.weather[0]?.main}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`}
                  alt='Weather'
                  className='weatherByTime__icon'
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default WeatherByTime
