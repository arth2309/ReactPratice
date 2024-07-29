import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Login as api } from "../../API/apiClient";
import AuthContext from "../../store/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/obviously-font.css";
import "./Login.css";
import logo from "../../assests/img/logo@2x.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Bottom,Subject,RightContainer } from "../../components/layout/authentication/authentication";
import { Container, FormControl, LeftContainer, MainContainer } from "./styled";
import { LoginFormValues } from "../../interface/Interface";


export const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

 

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
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <Field
                  type="email"
                  name="email"
                  as= {FormControl}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Password*</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  as= {FormControl}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <button type="submit">Login</button>
            </Form>
          </Formik>
          <Bottom />
          </MainContainer>
      </LeftContainer>
      <RightContainer />
    </Container>
  );
};
