import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ForgotPassword as api} from "../../API/apiClient";
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
import { ForgotPasswordValues } from "../../interface/Interface";
import Input from "../../components/layout/form/Input";



export const ForgotPassword = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  

  const initialValues: ForgotPasswordValues = {
    email: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
   
  });

  const loginHandler = async (values: ForgotPasswordValues) => {
    const result = await api(values);
  };

  return (
    <Container>
      <ToastContainer />
      <LeftContainer>
        <img src={logo} alt="logo" className="logo" />
        <MainContainer>
          <Subject
            title1="Whoops"
            title2="Forgot Your Password"
            text1="Don't have account?"
            text2="Remember it?"
            navigateTo="/login"
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
                 <div>We'll send you instructions by email</div>
                <button type="submit">Send</button>
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