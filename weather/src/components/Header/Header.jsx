import { useState } from "react"
import { useDispatch } from "react-redux"
import { setCity } from "../../store/actions"
import ToggleUnits from "../ToggleUnits/ToggleUnits"
import "./Header.scss"

const Header = () => {
  const [currentCity, setCurrentCity] = useState("Yerevan")
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (currentCity.trim()) {
      dispatch(setCity(currentCity))
      setCurrentCity("")
    }
  }

  return (
    <header className='header'>
      <form
        className='header__form'
        onSubmit={handleSearch}
      >
        <input
          type='text'
          className='header__input'
          value={currentCity}
          onChange={(e) => setCurrentCity(e.target.value)}
          placeholder='Enter city name'
        />
        <button
          type='submit'
          className='header__btn'
        >
          Search
        </button>
      </form>
      <ToggleUnits />
    </header>
  )
}
export default Header
