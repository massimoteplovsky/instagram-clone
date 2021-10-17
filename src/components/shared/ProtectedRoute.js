import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Path, RouteProtection } from '../../consts';

const ProtectedRoute = ({ isAuth, protectionType, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(history) => {
        if (isAuth && RouteProtection.SEMI_PROTECTED === protectionType) {
          return <Redirect to={Path.DASHBOARD} />;
        }

        if (!isAuth && RouteProtection.PROTECTED === protectionType) {
          return (
            <Redirect
              to={{
                pathname: Path.LOGIN,
                state: { from: history.location },
              }}
            />
          );
        }

        return React.cloneElement(children, { history });
      }}
    />
  );
};

export default ProtectedRoute;
