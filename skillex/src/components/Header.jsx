import logo from "../assets/skillexLogo.svg"

const Header = () => {
  return (
    <header className='header'>
      <div className="header__container container">
        <img
          src={logo}
          alt='logo'
          className="header__logo"
        />
        <h1 className="header__title">Testing Task</h1>
      </div>
    </header>
  )
}
export default Header
