import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="not-found-image"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
