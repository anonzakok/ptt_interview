import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../Context";

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !userDetails.authToken ? (
          <Redirect
            to={{ pathname: userDetails.userType === "admin" ? "/admin" :  "/" }}
          />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;
