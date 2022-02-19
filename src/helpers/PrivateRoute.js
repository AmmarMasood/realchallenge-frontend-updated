//this route will be used as a component for protected tourtes
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, userInfo, role, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userInfo.authenticated === true && role.includes(userInfo.role) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
