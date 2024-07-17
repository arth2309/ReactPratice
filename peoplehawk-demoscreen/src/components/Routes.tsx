import { BrowserRouter,Route, Routes as Main } from "react-router-dom";
import Resumeupload from "./resumeupload/Resumeupload";
import Useranalysis from "./interest-analysis/Useranalysis";

const Routes = (props : any) => {

    const {courseInterest, chartData} = props;

    return(

        <BrowserRouter>
        <Main>
            <Route path = "/" element = {<Useranalysis courseInterest = {courseInterest} chartData = {chartData} />}></Route>
            <Route path="/Resume" element = {<Resumeupload />}></Route>
        </Main>
        </BrowserRouter>

    );

}

export default Routes