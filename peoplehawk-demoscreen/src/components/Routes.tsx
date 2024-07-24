import { BrowserRouter,Route, Routes as Main, Navigate } from "react-router-dom";
import Resumeupload from "./resumeupload/Resumeupload";
import Useranalysis from "./interest-analysis/Useranalysis";
import { Login } from "./login/Login";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
import { Register } from "./login/Register";

const Routes = (props : any) => {

    const {courseInterest, chartData} = props;
    const authCtx = useContext(AuthContext);
    const token = localStorage.getItem("token");

    return(

        
        <BrowserRouter>
        <Main>

            <Route path = "/" element = {!token ?<Navigate to = "/login" /> :  <Navigate to = "/Analysis" />}></Route>
           <Route path = "/Analysis" element = {authCtx.isLoggedIn ?<Useranalysis courseInterest = {courseInterest} chartData = {chartData} /> : <Navigate to="/login"/>}></Route>  
            <Route path="/Resume" element = {authCtx.isLoggedIn ?<Resumeupload /> : <Navigate to="/login"/>}></Route>
            <Route path = "/login" element = {<Login />}></Route>
            <Route path = "/register" element = {<Register />}></Route>
            <Route path = "*" element = {!token ?<Navigate to = "/login" /> :  <Navigate to = "/Analysis" />}></Route>

        </Main>
        </BrowserRouter>
    );

}

export default Routes