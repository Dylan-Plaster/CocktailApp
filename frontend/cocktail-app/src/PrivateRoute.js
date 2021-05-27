import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "./UserContext";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const { setErrors, currUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (currUser) {
          return <Component {...rest} {...props} />;
        } else {
          setErrors("You must be logged in to view that page!");
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
