import { NavLink } from 'react-router-dom'
import Nav from './Nav'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" className="logo">
          <img src="/images/logo.png" alt="logo" />
        </NavLink>
        <Nav />
      </div>
    </header>
  )
}

export default Header
