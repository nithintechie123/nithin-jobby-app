import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaHome, FaBriefcase, FaSignOutAlt} from 'react-icons/fa'

import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <img
        src=" https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="navbar-website-logo"
      />
      <ul className="nav-links">
        <Link to="/" className="link-item">
          <li>Home</li>
        </Link>

        <Link to="/jobs" className="link-item">
          <li>Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        className="logout-button"
        onClick={onClickLogoutButton}
      >
        Logout
      </button>
      <ul className="link-icons-container">
        <FaHome className="link-icon" />
        <FaBriefcase className="link-icon" />
        <FaSignOutAlt className="link-icon" />
      </ul>
    </nav>
  )
}

export default withRouter(Header)
