import { NavLink } from "react-router-dom"
import './nav.scss'

const Nav = ({ }) => {
  const activeClass = ({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li><NavLink to={'/'} className={activeClass}>Поиск Вакансий</NavLink></li>
        <li><NavLink to={'/favorite'} className={activeClass}>Избранное</NavLink></li>
      </ul>
    </nav>
  )
}
export default Nav