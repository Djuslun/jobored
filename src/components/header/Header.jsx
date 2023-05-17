import { Link } from "react-router-dom"
import Logo from "./logo/Logo"
import Nav from "./nav/Nav"
import { Burger } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';
import './header.scss'

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to={'/vacancy'}>
          <Logo />
        </Link>
        <Nav />
        <Burger opened={opened} onClick={toggle}></Burger>
      </div>
    </header>
  )
}
export default Header