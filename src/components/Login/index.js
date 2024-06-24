import {Component} from 'react'

import './index.css'

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <form className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label className="label-element" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="input-element"
            />
          </div>
          <div className="input-container">
            <label className="label-element" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input-element"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
