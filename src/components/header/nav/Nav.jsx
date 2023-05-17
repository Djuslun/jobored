import { NavLink } from "react-router-dom"
import './nav.scss'

const Nav = ({ openClass, onClick }) => {
  const activeClass = ({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"

  return (
    <nav className={`nav ${openClass}`} onClick={onClick}>
      <ul className="nav__list" onClick={(e) => e.stopPropagation()}>
        <li><NavLink to={'/vacancy'} onClick={onClick} className={activeClass}>Поиск Вакансий</NavLink></li>
        <li><NavLink to={'/favorite'} onClick={onClick} className={activeClass}>Избранное</NavLink></li>
      </ul>
    </nav>
  )
}
export default Nav