import Header from "../analysis/header/Header";
import Banner from "../analysis/Banner/Banner";
import "./Memberinterestanalysis.css";
import Memberinterestanalysis from "./Memberinterestanalysis";
import Testinterestanalysis from "./Testinterestanalysis";

const Useranalysis = (props : any) => {

    const {courseInterest, chartData} = props;

   return(
    <div>
        <Header />
     <Banner />
     <Memberinterestanalysis courseInterest = {courseInterest} chartData = {chartData} />
     <Testinterestanalysis courseInterest = {courseInterest} chartData = {chartData} />
    </div>
   )
}

export default Useranalysis