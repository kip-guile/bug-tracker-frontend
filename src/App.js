import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Counter from './components/Counter';
import RegistrationForm from './components/Register/index'
import NormalLoginForm from './components/Login/index'
import WithAuthCheck from './AuthCheck'
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Switch>
      <WithAuthCheck path='/dashboard' component={Dashboard}/>
      <Route exact path={["/", "/login"]} component={NormalLoginForm} />
      <Route exact path="/register" component={RegistrationForm} />
      <Route exact path="/counter" component={Counter} />
    </Switch>
  );
}

export default App;
