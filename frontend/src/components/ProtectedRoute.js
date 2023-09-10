import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  if (props.isLogged === false) {
    return (<Navigate to="/sign-in" replace/>)
  } else {
    return (<Component {...props} />)
  }
}

export default ProtectedRoute;
