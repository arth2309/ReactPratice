import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Login as api } from "../../API/apiClient";
import AuthContext from "../../store/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/obviously-font.css";
import "./Login.css";
import logo from "../../assests/img/logo@2x.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Bottom,Subject,RightContainer } from "../../components/layout/authentication/authentication";
import { Container, FormControl, LeftContainer, MainContainer } from "./styled";
import { LoginFormValues } from "../../interface/Interface";
import Input from "../../components/layout/form/Input";



export const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  
  }
console.log(inputValue);
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

  return (
    <Container>
      <ToastContainer />
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
             {(props) => (
                <Form>
             
                <div className="form-group">
                <Input label="Email" type="email" name="email" required  />
                </div>
  
                <div className="form-group">
                  <Input label="Password" name = "password" type="password" required />
                </div>
                <button type="submit">Login</button>
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
