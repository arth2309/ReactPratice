import Header from "../../components/layout/header/Header";
import Banner from "./Banner";
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