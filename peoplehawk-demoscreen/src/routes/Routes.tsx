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
import { useContext } from "react";
import { Register } from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Personalitytest from "../pages/PersonalityTest/Personalitytest";
import { ROUTES } from "../constants/routes";
import Memberanalytics from "../pages/MemberAnalytics/Memberanalytics";
import { getToken } from "../utils/manageAccessToken";
import Candidateprofile from "../pages/CandidateProfile/Candidateprofile";
import MemberShortlist from "../pages/Shortlist/MemberShortlist";

const Routes = () => {
  const authCtx = useContext(AuthContext);
  const token = getToken();

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
          element={
            authCtx.isLoggedIn ? (
              authCtx.userData && authCtx.userData.RoleId === 1 ? (
                <Dashboard />
              ) : (
                <Memberanalytics />
              )
            ) : (
              <Navigate to={ROUTES.LOGIN} />
            )
          }
        ></Route>
        <Route
          path={ROUTES.IDEAL_COURSES}
          element={
            authCtx.isLoggedIn ? (
              <Useranalysis />
            ) : (
              <Navigate to={ROUTES.LOGIN} />
            )
          }
        ></Route>
        <Route
          path={ROUTES.RESUME}
          element={
            authCtx.isLoggedIn ? (
              <Resumeupload />
            ) : (
              <Navigate to={ROUTES.LOGIN} />
            )
          }
        ></Route>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route
          path={ROUTES.PERSONALITY_TEST}
          element={
            authCtx.isLoggedIn ? (
              <Personalitytest />
            ) : (
              <Navigate to={ROUTES.LOGIN} />
            )
          }
        ></Route>
        <Route path={ROUTES.REGISTER} element={<Register />}></Route>
        <Route
          path={ROUTES.MEMBER_ANALYTICS}
          element={<Memberanalytics />}
        ></Route>
        <Route
          path={ROUTES.OTHERS}
          element={
            !token ? (
              <Navigate to={ROUTES.LOGIN} />
            ) : (
              <Navigate to={ROUTES.HOME} />
            )
          }
        ></Route>
        <Route path={ROUTES.PROFILE} element={<Candidateprofile />}></Route>
        <Route path={ROUTES.SHORTLIST} element={<MemberShortlist />}></Route>
        <Route
          path={ROUTES.TOKEN_PROFILE}
          element={<Candidateprofile />}
        ></Route>
        <Route
          path={ROUTES.DEFAULT_SHORTLIST}
          element={<MemberShortlist />}
        ></Route>
      </Main>
    </BrowserRouter>
  );
};

export default Routes;
