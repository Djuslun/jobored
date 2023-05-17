import { useEffect } from "react"
import { Link } from "react-router-dom"
import Logo from "./logo/Logo"
import Nav from "./nav/Nav"
import { Burger } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';
import classNames from "classnames";
import './header.scss'

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const openClass = classNames({ 'nav__active': opened })

  useEffect(() => {
    document.body.style.overflow = opened ? "hidden" : 'visible';
  }, [opened])

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to={'/vacancy'} onClick={close}>
          <Logo />
        </Link>
        <Nav openClass={openClass} onClick={(close)} />
        <Burger opened={opened} onClick={toggle}></Burger>
      </div>
    </header>
  )
}
export default Header