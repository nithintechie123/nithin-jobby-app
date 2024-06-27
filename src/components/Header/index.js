import {Component} from 'react'

import {Link} from 'react-router-dom'

import {FaHome, FaBriefcase, FaSignOutAlt} from 'react-icons/fa'

import './index.css'

class Header extends Component {
  onClickLogoutButton = () => {
    const {history} = this.props
    console.log(history)
    history.replace('/login')
  }

  render() {
    return (
      <nav className="nav-container">
        <img
          src=" https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="navbar-website-logo"
        />
        <ul className="nav-links">
          <Link to="/">
            <li className="link-item">Home</li>
          </Link>

          <Link to="/jobs">
            <li className="link-item">Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-button"
          onClick={this.onClickLogoutButton}
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
}

export default Header
