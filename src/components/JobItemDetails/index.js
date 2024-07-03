import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import EachJobItem from '../EachJobItem'

import './index.css'

class JobItemDetails extends Component {
  state = {jobDetailsList: []}

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
    const data = await response.json()
    console.log(data)

    const updatedData = data.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
      packagePerAnnum: eachJob.package_per_annum,
    }))
    this.setState({jobDetailsList: updatedData})
  }

  render() {
    const {jobDetailsList} = this.state
    console.log(jobDetailsList)
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
        <ul className="each-job-container">
          {jobDetailsList.map(eachJobItem => (
            <EachJobItem key={eachJobItem.id} eachJobDetails={eachJobItem} />
          ))}
        </ul>
      </div>
    )
  }
}

export default JobItemDetails
