import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import Filters from '../Filters'
import JobCard from '../JobCard'

const loadingStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobsRoute extends Component {
  state = {
    jobsDataList: [],
    profileDetails: '',
    employmentType: [],
    minimumPackage: '',
    search: '',
    isProfileLoading: loadingStatus.loading,
    isJobListLoading: loadingStatus.loading,
  }

  componentDidMount() {
    this.getJobsData()
    this.getProfileDetails()
  }

  getJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, minimumPackage, search} = this.state
    let empTypeString
    if (employmentType.length === 0) {
      empTypeString = ''
    } else if (employmentType.length === 1) {
      empTypeString = employmentType.join('')
    } else {
      empTypeString = employmentType.join()
    }
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypeString}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      if (data.jobs.length === 0) {
        this.setState({jobsDataList: []})
      } else {
        const formattedData = data.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        }))
        this.setState({
          jobsDataList: formattedData,
          isJobListLoading: loadingStatus.success,
        })
      }
    } else if (response.status === 401) {
      this.setState({isJobListLoading: loadingStatus.failure})
    }
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formattedData,
        isProfileLoading: loadingStatus.success,
      })
    } else if (response.status === 401) {
      this.setState({isProfileLoading: loadingStatus.failure})
    }
  }

  onChangeSalaryRange = minPackage => {
    this.setState({minimumPackage: minPackage}, this.getJobsData)
  }

  onSelectEmploymentType = arr => {
    this.setState({employmentType: arr}, this.getJobsData)
  }

  changeJobs = event => {
    this.setState({search: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsData()
  }

  onClickProfileRetry = () => {
    this.setState({isProfileLoading: loadingStatus.loading})
    this.getProfileDetails()
  }

  renderProfileFailureView = () => (
    <div className="jobs-profile-card-bg-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickProfileRetry}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileDetails, isProfileLoading} = this.state
    return (
      <ProfileCard
        profileDetails={profileDetails}
        isProfileLoading={isProfileLoading}
      />
    )
  }

  renderProfileView = () => {
    const {isProfileLoading} = this.state
    return isProfileLoading === loadingStatus.success
      ? this.renderProfileSuccessView()
      : this.renderProfileFailureView()
  }

  renderSearchInput = () => {
    const {search} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={search}
          onChange={this.changeJobs}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-input-button"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onClickJobsListRetry = () => {
    this.setState({isJobListLoading: loadingStatus.loading})
    this.getJobsData()
  }

  renderJobsListSuccess = () => {
    const {jobsDataList} = this.state
    if (jobsDataList.length === 0) {
      return (
        <div className="failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            className="jobs-list-failure-image"
            alt="no jobs"
          />
          <h1 className="jobs-list-failure-heading">No Jobs Found</h1>
          <p className="jobs-list-failure-description">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list">
        {jobsDataList.map(eachJob => (
          <JobCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderJobsListFailureView = () => (
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
        onClick={this.onClickJobsListRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {isJobListLoading} = this.state
    return isJobListLoading === loadingStatus.success
      ? this.renderJobsListSuccess()
      : this.renderJobsListFailureView()
  }

  render() {
    const {employmentType} = this.state
    const {employmentTypesList, salaryRangesList} = this.props
    const {isProfileLoading, isJobListLoading} = this.state

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-filters-container">
            {isProfileLoading === loadingStatus.loading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              this.renderProfileView()
            )}
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeSalaryRange={this.onChangeSalaryRange}
              onSelectEmploymentType={this.onSelectEmploymentType}
              employmentType={employmentType}
            />
          </div>
          <div className="jobs-list-container">
            {this.renderSearchInput()}
            {isJobListLoading === loadingStatus.loading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              this.renderJobsList()
            )}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
