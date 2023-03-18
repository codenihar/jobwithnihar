import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const HomeRoute = props => (
  <>
    <Header />
    <div className="home-bg-container">
      <div className="home-content-container">
        <h1 className="home-main-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default HomeRoute