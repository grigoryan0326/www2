import { Link, NavLink } from "react-router-dom"
import Favorite from "../Favorite/Favorite"

import {
  useTheme,
  THEME_LIGHT,
  THEME_DARK,
  THEME_NEUTRAL,
} from "@context/ThemeProvider"

import imgDroid from "./img/droid.svg"
import imgLightSaber from "./img/lightsaber.svg"
import imgSpaceStation from "./img/space-station.svg"

import styles from "./Header.module.scss"
import { useEffect, useState } from "react"

const Header = () => {
  const [icon, setIcon] = useState(imgDroid)
  const isTheme = useTheme()

  useEffect(() => {
    switch (isTheme.theme) {
      case THEME_LIGHT:
        setIcon(imgLightSaber)
        break
      case THEME_DARK:
        setIcon(imgSpaceStation)
        break
      case THEME_NEUTRAL:
        setIcon(imgDroid)
        break
      default:
        setIcon(imgDroid)
    }
  }, [isTheme])

  return (
    <header className={styles.container}>
      <Link to='/'>
        <img
          src={icon}
          className={styles.logo}
          alt='Star Wars'
        />
      </Link>
      <ul className={styles.list__container}>
        <li className={styles.list__item}>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink to='/people/?page=1'>People</NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink to='/search'>Search</NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink to='/fail'>Fail</NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink to='/not-found'>Not Found</NavLink>
        </li>
      </ul>
      <Favorite />
    </header>
  )
}
export default Header
