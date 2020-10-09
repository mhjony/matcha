import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

//components
import Nav from './components/Nav'
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
