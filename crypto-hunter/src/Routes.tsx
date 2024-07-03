import { BrowserRouter as Router,Route, Routes as Main} from "react-router-dom";
import Dashboard from "./components/Main-screen/Dashboard";
import Coindetails from "./components/CoinDetails-screen/Coindetails";



const Routes  = () => {

    return (
        <Router>
            <Main>
            <Route path="/" element = {<Dashboard />} />
            <Route path="/Coindetails/:id" element = {<Coindetails />} />
            </Main>
        </Router>

    );

}

export default Routes;