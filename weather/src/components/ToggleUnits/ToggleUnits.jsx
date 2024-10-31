import { useDispatch } from "react-redux"
import { setUnits } from "../../store/actions"
import { useSelector } from "react-redux"

import "./ToggleUnits.scss"

const ToggleUnits = () => {
  const selectedUnit = useSelector((state) => state.currentWeather.units)

  const dispatch = useDispatch()

  return (
    <div className='unit-toggle'>
      <button
        className={selectedUnit === "metric" ? "active" : ""}
        onClick={() => dispatch(setUnits("metric"))}
      >
        °C
      </button>
      <button
        className={selectedUnit === "imperial" ? "active" : ""}
        onClick={() => dispatch(setUnits("imperial"))}
      >
        °F
      </button>
    </div>
  )
}

export default ToggleUnits
