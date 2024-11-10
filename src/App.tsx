import './App.css'
import Redirect from './components/redirect/redirect'
import Identify from './components/identify/identify'
import Login from './components/login/login'
import SignUp from './components/signup/signup'
import List from './components/list/list'
import React from 'react';
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
        </Routes>
      </Router>
  )
}

export default App
