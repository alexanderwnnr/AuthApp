import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import { useRoutes } from './routes';
import {AuthContext} from '../src/context/AuthContext'
import { useAuth } from '../src/hooks/authHook'
import {Navbar} from '../src/component/Navbar'


import 'materialize-css'




function App() {
  const {login, logout, token, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
    <Router>
      {isAuthenticated && <Navbar/>}
    <div className='container'>
      {routes}
    </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
