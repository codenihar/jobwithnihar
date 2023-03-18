import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

const loadingStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class jobDetailsRoute extends Component {
  state = {jobDetailsData: {}, isLoading: loadingStatus.loading}

  componentDidMount() {
    this.getJobCompleteDetails()
  }

  getJobCompleteDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        title: data.job_details.title,
      }

      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetailsData: {jobDetails, similarJobs},
        isLoading: loadingStatus.success,
      })
    } else if (response.status === 400 || response.status === 401) {
      this.setState({isLoading: loadingStatus.failure})
    }
  }

  renderJobCompleteDetails = () => {
    const {jobDetailsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetailsData.jobDetails
    return (
      <div className="job-complete-details-container">
        <div className="job-complete-details-company-logo-container">
          <img
            src={companyLogoUrl}
            className="job-complete-details-company-logo"
            alt="job details company logo"
          />
          <div className="job-complete-details-designation-container">
            <h1 className="job-complete-details-designation">{title}</h1>
            <div className="job-complete-details-rating-container">
              <AiFillStar className="jobs-complete-details-star" />
              <p className="job-complete-details-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-complete-details-package-container">
          <div className="job-complete-details-icon-container">
            <MdLocationOn className="job-complete-details-icon" />
            <p className="job-complete-details-icon-label">{location}</p>
          </div>
          <div className="job-complete-details-icon-container">
            <BsFillBriefcaseFill className="job-card-icon" />
            <p className="job-complete-details-icon-label">{employmentType}</p>
          </div>
          <p className="job-complete-details-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-complete-details-horizontal-line" />
        <div className="job-complete-details-website-link-container">
          <h1 className="jobs-complete-details-description-heading">
            Description
          </h1>
          <a
            className="website-link"
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
          >
            Visit <FiExternalLink className="visit-icon" />
          </a>
        </div>
        <p className="jobs-complete-details-description">{jobDescription}</p>
        <h1 className="jobs-complete-details-skills-heading">Skills</h1>
        <ul className="jobs-complete-details-skills-list">
          {skills.map(eachSkill => (
            <li className="jobs-complete-details-skill" key={eachSkill.name}>
              <img
                src={eachSkill.imageUrl}
                className="skill-image"
                alt={eachSkill.name}
              />
              <p className="skill-name">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="jobs-complete-details-skills-heading">
          Life at Company
        </h1>
        <div className="jobs-complete-details-life-at-company-container">
          <p className="jobs-complete-details-description">
            {lifeAtCompany.description}
          </p>
          <img
            src={lifeAtCompany.imageUrl}
            className="jobs-complete-details-life-at-company-image"
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {jobDetailsData} = this.state
    const {similarJobs} = jobDetailsData
    return (
      <>
        <h1 className="jobs-complete-details-description-heading">
          Similar Jobs
        </h1>
        <ul className="similar-jobs-cards-list">
          {similarJobs.map(eachJob => (
            <SimilarJobCard similarJobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  onJobDetailsRetry = () => {
    this.setState({isLoading: loadingStatus.loading})

    this.getJobCompleteDetails()
  }

  renderJobDetailsFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobs-list-failure-image"
        alt="failure view"
      />
      <h1 className="jobs-list-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-list-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onJobDetailsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailedView = () => {
    const {isLoading} = this.state
    return isLoading === loadingStatus.success ? (
      <>
        {this.renderJobCompleteDetails()} {this.renderSimilarJobs()}
      </>
    ) : (
      this.renderJobDetailsFailureView()
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />
        <div className="job-complete-details">
          {isLoading === loadingStatus.loading ? (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          ) : (
            this.renderJobDetailedView()
          )}
        </div>
      </>
    )
  }
}

export default jobDetailsRoute
