import { BrowserRouter,Route, Routes as Main, Navigate } from "react-router-dom";
import Resumeupload from "../pages/Resume/Resumeupload";
import Useranalysis from "../pages/IdealCoursesAnalysis/Useranalysis";
import { Login } from "../pages/Authentication/Login";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
import { Register } from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
const Routes = (props : any) => {

    const {courseInterest, chartData} = props;
    const authCtx = useContext(AuthContext);
    const token = localStorage.getItem("token");

    return(

        
        <BrowserRouter>
        <Main>

            <Route path = "/" element = {!token ?<Navigate to = "/login" /> :  <Navigate to = "/home" />}></Route>
            <Route path="/home" element = {authCtx.isLoggedIn ?<Dashboard /> : <Navigate to="/login"/>}></Route>
           <Route path = "/Analysis" element = {authCtx.isLoggedIn ?<Useranalysis courseInterest = {courseInterest} chartData = {chartData} /> : <Navigate to="/login"/>}></Route>  
            <Route path="/Resume" element = {authCtx.isLoggedIn ?<Resumeupload /> : <Navigate to="/login"/>}></Route>
            <Route path = "/login" element = {<Login />}></Route>
            <Route path = "/register" element = {<Register />}></Route>
            <Route path = "*" element = {!token ?<Navigate to = "/login" /> :  <Navigate to = "/home" />}></Route>

        </Main>
        </BrowserRouter>
    );

}

export default Routes