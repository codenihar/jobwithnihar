import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-bg-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <div>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/jobs" className="nav-link">
          Jobs
        </Link>
      </div>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
