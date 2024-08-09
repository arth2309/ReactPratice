import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Login as api } from "../../services/AuthService";
import AuthContext from "../../store/AuthContext";
import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/obviously-font.css";
import "./Login.css";
import logo from "../../assests/img/logo@2x.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastComponent } from "../../components/layout/ToastComponent/Toastcomponent";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Bottom,
  Subject,
  RightContainer,
} from "../../components/layout/authentication/authentication";
import { Container, LeftContainer, MainContainer } from "./styled";
import { LoginFormValues } from "../../interface/Interface";
import Input from "../../components/layout/form/Input";

export const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const[showPassword,setShowPassword] = useState<boolean>(false);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string().required("Password is required"),
  });

  const loginHandler = async (values: LoginFormValues) => {
    const result = await api(values);
    result && authCtx.login(result);
    result && navigate("/home");
  };

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Container>
     <ToastComponent />
      <LeftContainer>
        <img src={logo} alt="logo" className="logo" />
        <MainContainer>
          <Subject
            title1="Welcome  to"
            title2="PeopleHawk"
            text1="Don't have account?"
            text2="Register Here"
            navigateTo="/Register"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              loginHandler(values);
            }}
            validateOnBlur={false}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="form-group">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    required
                    onChange={(e) => setFieldValue("email", e.target.value)}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group" >
                 
                    <div style={{position : 'relative',display : 'flex', marginBottom : '38px'}}>
                  <Input
                    label="Password"
                    name="password"
                    type= {showPassword ? 'text' : 'password'}
                    className="password"
                    required
                    onChange={(e) => setFieldValue("password", e.target.value)}
                  />
                 
                  <div style={{position : 'absolute' , top : '31px' , right : '13px'}} onClick={passwordHandler}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> } 
                  </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <button type="submit">
                  <strong>Log In</strong>
                </button>
              </Form>
            )}
          </Formik>
          <Bottom />
        </MainContainer>
      </LeftContainer>
      <RightContainer />
    </Container>
  );
};
