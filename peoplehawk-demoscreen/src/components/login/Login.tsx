import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Login as api } from "../../API/apiClient";
import AuthContext from "../../store/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/obviously-font.css";
import "./Login.css";
import logo from "../../assests/img/logo@2x.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Bottom, RightContainer, Subject } from "./Utilities";
import { Container, FormControl, LeftContainer, MainContainer } from "./styled";

export const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  interface LoginFormValues {
    email: string;
    password: string;
  }

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
    const result = await api(values.email, values.password);
    result && authCtx.login(result);
    result && navigate("/Analysis");
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
