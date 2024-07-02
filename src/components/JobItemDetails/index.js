import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import './index.css'

class JobItemDetails extends Component {
  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(await response.json())
  }

  render() {
    return (
      <div className="job-item-details-container">
        <div className="search-input-container">
          <input type="search" className="search-input" />
          <button
            type="button"
            data-testid="searchButton"
            label="true"
            className="search-button"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
