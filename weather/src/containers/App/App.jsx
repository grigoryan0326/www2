import { Provider } from "react-redux"
import store from "../../store/store"
import Header from "../../components/Header/Header"
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather"
import WeatherByDays from "../WeatherByDays/WeatherByDays"
import "./App.scss"

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <CurrentWeather />
        <WeatherByDays />
      </div>
    </Provider>
  )
}

export default App
