import React, { Fragment } from 'react';
import './App.css';

//components
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Fragment>
      <div>
        <Signup />
        <Login />
      </div>
    </Fragment>
  );
}

export default App;
