import { Link } from "react-router-dom"
import Logo from "../logo/Logo"
import Nav from "../nav/Nav"
import './header.scss'

const Header = () => {

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to={'/'}>
          <Logo />
        </Link>
        <Nav />
      </div>
    </header>
  )
}
export default Header