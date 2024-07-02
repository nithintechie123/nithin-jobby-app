import {Component} from 'react'

import Cookies from 'js-cookie'

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

class Jobs extends Component {
  state = {profileData: {}}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedProfileData = {
      profileImageUrl: data.profile_details.profile_image_url,
      name: data.profile_details.name,
      shortBio: data.profile_details.short_bio,
    }

    this.setState({profileData: updatedProfileData})
  }

  render() {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="jobs-container">
        <div className="profile-and-filters-container">
          <div className="profile-container">
            <img src={profileImageUrl} alt={name} className="profile-image" />
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
      </div>
    )
  }
}

export default Jobs
