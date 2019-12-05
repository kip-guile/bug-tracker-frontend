import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const WithAuthCheck = ({component: Component, ...rest}) => (
    <Route
    {...rest}
    render={props => 
      localStorage.getItem('token') ? (
        <Component {...props}/>
      ) : (
        <Redirect to = '/' />
      )}/>
  )
  
  export default WithAuthCheck