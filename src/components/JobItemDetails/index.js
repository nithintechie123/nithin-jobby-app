import {Component} from 'react'

import Cookies from 'js-cookie'

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

    return (
      <>
        {jobDetailsList.map(eachJobItem => (
          <EachJobItem key={eachJobItem.id} eachJobDetails={eachJobItem} />
        ))}
      </>
    )
  }
}

export default JobItemDetails
