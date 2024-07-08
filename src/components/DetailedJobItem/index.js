import {Component} from 'react'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'

import './index.css'

class DetailedJobItem extends Component {
  state = {
    eachJobDetailsList: [],
    similarJobs: [],
    lifeAtCompanyList: [],
    skillsList: [],
  }

  componentDidMount() {
    this.getDetailedJobData()
  }

  getDetailedJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    console.log(data)

    const updatedJobDetailsList = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      rating: data.job_details.rating,
      title: data.job_details.title,
      packagePerAnnum: data.job_details.package_per_annum,
    }

    const updatedLifeAtCompanyList = {
      description: data.job_details.life_at_company.description,
      imageUrl: data.job_details.life_at_company.image_url,
    }

    const updatedSkillsList = data.job_details.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))

    const updatedSimilarJobsList = data.similar_jobs.map(eachSimilarJob => ({
      companyLogoUrl: eachSimilarJob.company_logo_url,
      id: eachSimilarJob.id,
      employmentType: eachSimilarJob.employment_type,
      jobDescription: eachSimilarJob.job_description,
      location: eachSimilarJob.location,
      rating: eachSimilarJob.rating,
      title: eachSimilarJob.title,
    }))

    this.setState({
      similarJobs: updatedSimilarJobsList,
      eachJobDetailsList: updatedJobDetailsList,
      lifeAtCompanyList: updatedLifeAtCompanyList,
      skillsList: updatedSkillsList,
    })
  }

  render() {
    const {
      similarJobs,
      eachJobDetailsList,
      lifeAtCompanyList,
      skillsList,
    } = this.state

    console.log(similarJobs)
    console.log(eachJobDetailsList)
    console.log(lifeAtCompanyList)
    console.log(skillsList)

    return (
      <>
        <Header />
        <div className="detailed-job-container">
          <div className="detailed-job-item-container">
            <div className="logo-title-rating-container">
              <img
                src={eachJobDetailsList.companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="company-name">{eachJobDetailsList.title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating-number">{eachJobDetailsList.rating}</p>
                </div>
              </div>
            </div>
            <div className="location-emp-type-salary-container">
              <div className="location-emp-type-container">
                <div className="icon-label-container">
                  <MdLocationOn color="#ffffff" />
                  <p className="location-emp-type-text">
                    {eachJobDetailsList.location}
                  </p>
                </div>
                <div className="icon-label-container">
                  <BsFillBriefcaseFill color="#ffffff" />
                  <p className="location-emp-type-text">
                    {eachJobDetailsList.employmentType}
                  </p>
                </div>
              </div>
              <p className="salary-text">
                {eachJobDetailsList.packagePerAnnum}
              </p>
            </div>
            <hr className="hr-line" />
            <div className="heading-link-container">
              <h1 className="description-heading">Description</h1>
              <a
                href={eachJobDetailsList.companyWebsiteUrl}
                className="visit-link"
              >
                Visit
                <FiExternalLink />
              </a>
            </div>

            <p className="description">{eachJobDetailsList.jobDescription}</p>
          </div>
        </div>
      </>
    )
  }
}

export default DetailedJobItem
