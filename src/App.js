import {Switch, Route} from 'react-router-dom'

import './App.css'

import Header from './components/Header'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/jobs" component={Jobs} />
    </Switch>
  </>
)

export default App
