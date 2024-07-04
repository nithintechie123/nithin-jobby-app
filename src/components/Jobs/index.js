import {Component} from 'react'
import Cookies from 'js-cookie'

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
  INITIAL: 'initial',
  SUCCESS: 'success',
  FAILURE: 'failure',
  INPROGESS: 'inprogress',
}

class Jobs extends Component {
  state = {profileData: [], apiStatus: apiStatusConstants.INITIAL}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.INPROGESS})
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
        apiStatus: apiStatusConstants.SUCCESS,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.FAILURE})
    }
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
      />
      <h1>Oops!Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button">Retry</button>
    </div>
  )

  render() {
    const {profileData, apiStatus} = this.state

    const {name, profileImageUrl, shortBio} = profileData
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
          {apiStatus ? this.renderFailureView() : null}
        </div>
      </>
    )
  }
}

export default Jobs
