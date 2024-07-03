import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const EachJobItem = props => {
  const {eachJobDetails} = props
  const {
    companyLogoUrl,
    title,
    salaryPerAnnum,
    location,
    rating,
    jobDescription,
  } = eachJobDetails
  return (
    <li className="job-item-container">
      <div className="logo-title-rating-container">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div className="title-rating-container">
          <h1 className="company-name">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating-number">{rating}</p>
          </div>
        </div>
      </div>
      <hr className="horizontal-line" />
    </li>
  )
}

export default EachJobItem
