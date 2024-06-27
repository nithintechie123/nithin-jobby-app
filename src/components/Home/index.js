import {Component} from 'react'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
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
