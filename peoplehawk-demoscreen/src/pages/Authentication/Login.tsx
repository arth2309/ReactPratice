import { Formik, Form, ErrorMessage } from "formik";
import { Login as api } from "../../services/AuthService";
import AuthContext from "../../store/AuthContext";
import { useContext, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import "../../stylesheets/obviously-font.css";
import "./Login.css";
import logo from "../../assests/img/logo@2x.png";
import { ToastComponent } from "../../components/layout/ToastComponent/Toastcomponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Bottom,
  Subject,
  RightContainer,
} from "../../components/layout/authentication/authentication";
import { Container, LeftContainer, MainContainer } from "./styled";
import { LoginFormValues } from "../../interface/Interface";
import Input from "../../components/layout/form/Input";
import { ROUTES } from "../../constants/routes";
import { LOGIN_FORM } from "../../constants/formConstants";
import { styled } from "styled-components";

const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 38px;
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 31px;
  right: 13px;
`;

export const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginHandler = async (values: LoginFormValues) => {
    const result = await api(values);
    result && authCtx.login(result);
    result &&
      navigate(
        generatePath(ROUTES.HOME, {
          userId: authCtx.userData ? authCtx.userData.Id.toString() : "",
        })
      );
  };

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

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
            navigateTo={ROUTES.REGISTER}
          />
          <Formik
            initialValues={LOGIN_FORM.INTIAL_VALUES}
            validationSchema={LOGIN_FORM.VALIDATION_SCHEMA}
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
                <div className="form-group">
                  <PasswordContainer>
                    <Input
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="password"
                      required
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
                    />

                    <EyeIcon onClick={passwordHandler}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </EyeIcon>
                  </PasswordContainer>
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
