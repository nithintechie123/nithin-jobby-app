import {Component} from 'react'

import {FaHome, FaBriefcase, FaSignOutAlt} from 'react-icons/fa'

import './index.css'

class Home extends Component {
  onClickLogoutButton = () => {
    const {history} = this.props
    console.log(history)
    history.replace('/login')
  }

  render() {
    return (
      <div className="home-container">
        <nav className="nav-container">
          <img
            src=" https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="navbar-website-logo"
          />
          <ul className="nav-links">
            <li className="link-item">Home</li>
            <li className="link-item">Jobs</li>
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
        <div className="home-description-container">
          <h1 className="main-heading">Find The Job That Fits Your Life</h1>
          <p className="description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits your abilities and potential.
          </p>
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
