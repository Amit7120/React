import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from "./index.js"

const PrivateRoutes = ({ Component: Component, ...rest }) => {
      return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );

};

export default PrivateRoutes;
