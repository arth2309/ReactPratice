
import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard.';
import {BrowserRouter} from 'react-router-dom'
import  CountContext from './store/count-context'
import Dataform from './Components/Form/formdata';
import { Count } from './Type';
import { useEffect } from 'react';

function App() {




  // localStorage.setItem('participantsarray',JSON.stringify([]));
  return (
    <div >

       {/* responsive form using formik,yup and media query
            <Dataform /> */}

            


      <BrowserRouter>
    <CountContext.Provider value={{
      count :  JSON.parse(localStorage.getItem('participantsarray') || '[]').length
    }}>
          <Dashboard />
    </CountContext.Provider>
     </BrowserRouter>
    </div>
  );
}

export default App;
