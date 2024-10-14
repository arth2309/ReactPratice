// ProtectedRoute.tsx
import { FC, useContext, ComponentType, Fragment } from "react";
import { Route, PathRouteProps, Navigate } from "react-router-dom";
import AuthContext from "../../../store/AuthContext";

interface ProtectedRouteProps extends PathRouteProps {
  Component: ComponentType;
  allowedRole: string;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  allowedRole,
  Component,
  ...rest
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Fragment>
      <Route
        {...rest}
        element={
          isLoggedIn ? (
            allowedRole === "" ? (
              <Component />
            ) : (
              <Navigate to="/access-denied" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Fragment>
  );
};

export default ProtectedRoute;
