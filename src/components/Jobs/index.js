import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import JobItemDetails from '../JobItemDetails'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileData()
  }

  onClickSearchButton = () => {}

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedProfileData = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {searchInput} = this.state
    return (
      <ul className="each-job-container">
        <JobItemDetails searchInputValue={searchInput} />
      </ul>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {profileData, searchInput} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    console.log(searchInput)
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-and-filters-container">
            <div className="profile-container">
              <img
                src={profileImageUrl}
                alt="profile"
                className="profile-image"
              />
              <h1 className="profile-name">{name}</h1>
              <p className="profile-short-bio">{shortBio}</p>
            </div>
            <hr className="horizontal-line" />
            <ul className="filters-container">
              <h1 className="filter-heading">Type of Employment</h1>
              {employmentTypesList.map(eachEmployeeType => (
                <li
                  key={eachEmployeeType.employmentTypeId}
                  className="each-filter-item"
                >
                  <input type="checkbox" id={eachEmployeeType.label} />
                  <label
                    htmlFor={eachEmployeeType.label}
                    className="each-filter-label"
                  >
                    {eachEmployeeType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="horizontal-line" />
            <ul className="filters-container">
              <h1 className="filter-heading">Salary Range</h1>
              {salaryRangesList.map(eachSalaryRange => (
                <li
                  key={eachSalaryRange.salaryRangeId}
                  className="each-filter-item"
                >
                  <input type="checkbox" id={eachSalaryRange.label} />
                  <label
                    htmlFor={eachSalaryRange.label}
                    className="each-filter-label"
                  >
                    {eachSalaryRange.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-item-details-container">
            <div className="search-input-container">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                label="true"
                className="search-button"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderContent()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
