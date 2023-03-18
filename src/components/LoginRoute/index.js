import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

class LoginRoute extends Component {
  state = {username: '', password: '', showErrMsg: false, errorMsg: ''}

  onSubmitFailure = errorMsg => {
    this.setState({showErrMsg: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
    this.setState({showErrMsg: false})
  }

  onClickSubmit = async () => {
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  submitLoginForm = event => {
    event.preventDefault()
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="login-form-label">
          USERNAME
        </label>
        <input
          type="text"
          className="login-form-input"
          id="username"
          value={username}
          onChange={this.changeUsername}
          placeholder=" Username"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="login-form-label">
          PASSWORD
        </label>
        <input
          type="password"
          className="login-form-input"
          id="password"
          value={password}
          placeholder=" Password"
          onChange={this.changePassword}
        />
      </>
    )
  }

  render() {
    const {showErrMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="login-form" onSubmit={this.submitLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-form-logo"
          />
          {this.renderUsername()}
          {this.renderPassword()}
          <button
            type="submit"
            className="login-form-button"
            onClick={this.onClickSubmit}
          >
            Login
          </button>
          {showErrMsg ? <p className="error_msg">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default LoginRoute
