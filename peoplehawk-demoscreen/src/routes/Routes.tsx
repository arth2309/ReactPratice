import {
  BrowserRouter,
  Route,
  Routes as Main,
  Navigate,
} from "react-router-dom";
import Resumeupload from "../pages/Resume/Resumeupload";
import Useranalysis from "../pages/IdealCoursesAnalysis/Useranalysis";
import { Login } from "../pages/Authentication/Login";
import AuthContext from "../store/AuthContext";
import { ComponentType, useContext } from "react";
import { Register } from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Personalitytest from "../pages/PersonalityTest/Personalitytest";
import { ROUTES } from "../constants/routes";
import Memberanalytics from "../pages/MemberAnalytics/Memberanalytics";
import { getToken } from "../utils/manageAccessToken";
import Candidateprofile from "../pages/CandidateProfile/Candidateprofile";
import MemberShortlist from "../pages/Shortlist/MemberShortlist";
import LinkExpire from "../pages/Error/LinkExpire";
import MyClient from "../pages/Client/MyClient";
import ClientCreate from "../pages/Client/ClientCreate";

const Routes = () => {
  const authCtx = useContext(AuthContext);
  const token = getToken();

  const routesManager = (roleId: number): JSX.Element => {
    if (roleId === 1) {
      return <Navigate to={ROUTES.HOME} />;
    } else if (roleId === 2) {
      return <Navigate to={ROUTES.MEMBER_ANALYTICS} />;
    } else {
      return <Navigate to={ROUTES.LOGIN} />;
    }
  };

  const protectRoutes = (
    isLoggedIn: boolean,
    roleId: number,
    Component: ComponentType
  ): JSX.Element => {
    return isLoggedIn ? (
      authCtx.userData && authCtx.userData.RoleId === roleId ? (
        <Component />
      ) : (
        routesManager(authCtx.userData ? authCtx.userData.RoleId : 0)
      )
    ) : (
      <Navigate to={ROUTES.LOGIN} />
    );
  };
  return (
    <BrowserRouter>
      <Main>
        <Route
          path={ROUTES.BASE}
          element={
            !token ? (
              <Navigate to={ROUTES.LOGIN} />
            ) : (
              <Navigate
                to={
                  authCtx.userData && authCtx.userData.RoleId === 1
                    ? ROUTES.HOME
                    : ROUTES.MEMBER_ANALYTICS
                }
              />
            )
          }
        ></Route>
        <Route
          path={ROUTES.HOME}
          element={protectRoutes(authCtx.isLoggedIn, 1, Dashboard)}
        ></Route>
        <Route
          path={ROUTES.IDEAL_COURSES}
          element={protectRoutes(authCtx.isLoggedIn, 1, Useranalysis)}
        ></Route>

        <Route
          path={ROUTES.RESUME}
          element={protectRoutes(authCtx.isLoggedIn, 1, Resumeupload)}
        ></Route>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route
          path={ROUTES.PERSONALITY_TEST}
          element={protectRoutes(authCtx.isLoggedIn, 1, Personalitytest)}
        ></Route>
        <Route path={ROUTES.REGISTER} element={<Register />}></Route>
        <Route
          path={ROUTES.MEMBER_ANALYTICS}
          element={protectRoutes(authCtx.isLoggedIn, 2, Memberanalytics)}
        ></Route>
        <Route
          path={ROUTES.OTHERS}
          element={
            !token ? (
              <Navigate to={ROUTES.LOGIN} />
            ) : (
              <Navigate
                to={
                  authCtx.userData && authCtx.userData.RoleId === 1
                    ? ROUTES.HOME
                    : ROUTES.MEMBER_ANALYTICS
                }
              />
            )
          }
        ></Route>
        <Route path={ROUTES.PROFILE} element={<Candidateprofile />}></Route>
        <Route
          path={ROUTES.SHORTLIST}
          element={protectRoutes(authCtx.isLoggedIn, 2, MemberShortlist)}
        ></Route>
        <Route path={ROUTES.LINK_EXPIRE} element={<LinkExpire />}></Route>
        <Route
          path={ROUTES.TOKEN_PROFILE}
          element={<Candidateprofile />}
        ></Route>
        <Route
          path={ROUTES.DEFAULT_SHORTLIST}
          element={protectRoutes(authCtx.isLoggedIn, 2, MemberShortlist)}
        ></Route>
        <Route path={ROUTES.CLIENT_LIST} element={<MyClient />}></Route>
        <Route path={ROUTES.CLIENT_CREATE} element={<ClientCreate />}></Route>
      </Main>
    </BrowserRouter>
  );
};

export default Routes;
