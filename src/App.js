import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import './App.css'
import HomeRoute from './components/HomeRoute'
import NotFound from './components/NotFound'
import JobsRoute from './components/JobsRoute'
import jobDetailsRoute from './components/jobDetailsRoute'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute
      exact
      path="/jobs"
      render={() => (
        <JobsRoute
          salaryRangesList={salaryRangesList}
          employmentTypesList={employmentTypesList}
        />
      )}
    />
    <ProtectedRoute exact path="/jobs/:id" component={jobDetailsRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
