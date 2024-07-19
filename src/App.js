import {Switch, Route} from 'react-router-dom'

import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import DetailedJobItem from './components/DetailedJobItem'
import ProtectedRoute from './components/ProtectedRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={DetailedJobItem} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
