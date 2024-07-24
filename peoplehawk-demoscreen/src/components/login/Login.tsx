import { Formik, Field,Form,ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Login as api } from "../../API/apiClient";
import AuthContext from "../../store/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../stylesheets/obviously-font.css';
import './Login.css';
import logo from "../../assests/img/logo@2x.png";
import utility from "../../assests/img/utility-page.svg"
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";





export const Login = () => {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();


    interface LoginFormValues {
        email: string;
        password: string;
      }
      
      const initialValues: LoginFormValues = {
        email: '',
        password: '',
      };

      const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is Required'),
        password: Yup.string().required('Password is required'),
      });

      const loginHandler = async(values : LoginFormValues) => {
           
               const result = await api(values.email,values.password);
                result && authCtx.login(result);
                result && navigate('/Analysis');
               
                
      }


      
return (
<div className="container">
   
<ToastContainer  />
    <div className="left-container">
    <img src={logo} alt = 'logo' className="logo" />
    <div className="main-container">
    <div className="sub">
    <div className="obviously text-darkblue">Welcome  to</div>
    <div className="obviously text-orange">PeopleHawk</div>
    <div style={{marginTop : '40px', marginBottom : '30px'}}>Don't have account?<span className="text-orange" onClick={() => {navigate("/Register")}}>Register Here</span></div>
    </div>
    
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {loginHandler(values)}}
    validateOnBlur = {false}
  >
    <Form>
      <div className="form-group">
        <label>Email*</label>
        <Field type="email" id="email" name="email" className = "form-control" />
        <ErrorMessage name="email" component="div" className="error" />
      </div>

      <div className="form-group">
        <label>Password*</label> 
        <Field type="password" id="password" name="password"  className = "form-control" />
        <ErrorMessage name="password" component="div" className="error" />
      </div>
      <button type="submit">Login</button>
    </Form>
  </Formik>
  <div className="border-bottom"></div>
  <div className="sub">
  <div>All use of PeopleHawk is subject to our <span className="text-lightblue">Terms and Conditions</span></div>
  <div className="text-aliceblue">What is PeopleHawk?</div>
  </div>
  </div>
  </div>
  <div className="right-container">
    <div className="empty"></div>
   <div className="card12">
    <img src={utility} alt = "utility" />
    <div className="obviously text-darkblue">Prepare for an <span className="text-orange">Epic</span> Career</div>
    <div style={{marginTop : '10px'}}>
    <div className="card13-container">
        <div className="card13">Explore</div>
        <div className="card13">Prepare</div>
    </div>
    <div className="card13-container">
        <div className="card13">Inspire</div>
        <div className="card13">Connect</div>
    </div>
    </div>
   </div>
  </div>
  </div>
);

}

