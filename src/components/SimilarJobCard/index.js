import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <div className="similar-job-card-container">
      <div className="similar-job-card-company-logo-container">
        <img
          src={companyLogoUrl}
          className="similar-job-card-company-logo"
          alt="similar job company logo"
        />
        <div className="similar-job-card-designation-container">
          <h1 className="similar-job-card-designation">{title}</h1>
          <div className="similar-job-card-rating-container">
            <AiFillStar className="similar-job-card-star" />
            <p className="similar-job-card-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-jobs-card-description-heading">Description</h1>
      <p className="similar-jobs-card-description">{jobDescription}</p>
      <div className="similar-job-card-package-container">
        <div className="similar-job-card-icon-container">
          <MdLocationOn className="similar-job-card-icon" />
          <p className="similar-job-card-icon-label">{location}</p>
        </div>
        <div className="similar-job-card-icon-container">
          <BsFillBriefcaseFill className="similar-job-card-icon" />
          <p className="similar-job-card-icon-label">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobCard
