import { Formik, Form, ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";
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
import { ClientGeneratePasswordProps } from "../../interface/Interface";
import Input from "../../components/layout/form/Input";
import { ROUTES } from "../../constants/routes";
import { styled } from "styled-components";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyToken, clientRegister } from "../../services/AdminService";

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

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, use upper-case and lower-case letters, and include both digits and special characters."
    )
    .required("Please enter a password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match")
    .required("Please repeat a password"),
});

const intialValues: ClientGeneratePasswordProps = {
  userId: 1,
  password: "",
  confirmPassword: "",
};

export const ClientPasswordGenerate = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [location]);

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const token = params.get("token");

  const fetchData = async () => {
    if (email && token) {
      // Call your function with email and token
      const response = await verifyToken(email, token);
      !response && navigate(ROUTES.LINK_EXPIRE);
    } else {
      navigate(ROUTES.LINK_EXPIRE);
    }
  };

  return (
    <Container>
      <ToastComponent />
      <LeftContainer>
        <img src={logo} alt="logo" className="logo" />
        <MainContainer>
          <Subject
            title1="Welcome"
            title2="Teacher"
            text1="Let's set a password to stay secure"
            text2=""
            navigateTo={ROUTES.REGISTER}
          />
          <Formik
            initialValues={intialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              if (email) {
                const response = await clientRegister({
                  email: email,
                  password: values.password,
                });
                response && navigate(ROUTES.LOGIN);
              }
            }}
            validateOnBlur={false}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="form-group">
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    required
                    onChange={(e) => setFieldValue("password", e.target.value)}
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <PasswordContainer>
                    <Input
                      label="Repeat Password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      className="password"
                      required
                      onChange={(e) =>
                        setFieldValue("confirmPassword", e.target.value)
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
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <div>
                    <Field type="checkbox" name="termsAccepted" />I accept the
                    terms and conditions
                  </div>
                  <ErrorMessage
                    name="termsAccepted"
                    component="div"
                    className="error"
                  />
                </div>
                <button type="submit">
                  <strong>Confirm</strong>
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
