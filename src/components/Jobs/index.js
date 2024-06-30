import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

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
        </div>
      </div>
    )
  }
}

export default Jobs
