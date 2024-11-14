import './App.css'
import Redirect from './components/redirect/redirect'
import RedirectUser from './components/redirect-user/redirect-user'
import Identify from './components/identify/identify'
import Login from './components/login/login'
import SignUp from './components/signup/signup'
import List from './components/list/list'
import UserLogin from './components/user-login/user-login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Identify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/identify" element={<Identify />} />
          <Route path="/list" element={<List />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/redirect-user" element={<RedirectUser />} />
          <Route path="/user-login" element={<UserLogin />} />
        </Routes>
      </Router>
  )
}

export default App
