import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-details-route-link">
      <div className="job-card-container">
        <div className="job-card-company-logo-container">
          <img
            src={companyLogoUrl}
            className="job-card-company-logo"
            alt="company logo"
          />
          <div className="job-card-designation-container">
            <h1 className="job-card-designation">{title}</h1>
            <div className="job-card-rating-container">
              <AiFillStar className="jobs-card-star" />
              <p className="job-card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-package-container">
          <div className="job-card-icon-container">
            <MdLocationOn className="job-card-icon" />
            <p className="job-card-icon-label">{location}</p>
          </div>
          <div className="job-card-icon-container">
            <BsFillBriefcaseFill className="job-card-icon" />
            <p className="job-card-icon-label">{employmentType}</p>
          </div>
          <p className="job-card-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-card-horizontal-line" />
        <h1 className="jobs-card-description-heading">Description</h1>
        <p className="jobs-card-description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
