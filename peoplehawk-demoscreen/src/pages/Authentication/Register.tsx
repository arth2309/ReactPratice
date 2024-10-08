import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/obviously-font.css";
import "./Login.css";
import logo from "../../assests/img/logo@2x.png";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import arrow from "../../assests/img/next-step-arrow.png";
import { Container, LeftContainer, MainContainer, FormControl } from "./styled";
import {
  Bottom,
  Subject,
  RightContainer,
} from "../../components/layout/authentication/authentication";
import {
  Register as api,
  CountryList,

} from "../../services/AuthService";
import { CountryList as list, OptionTypes } from "../../interface/Interface";
import { ReactSelect } from "../../components/layout/form/Select";
import {ROUTES} from '../../constants/routes';
import {REGISTER_FORM} from "../../constants/formConstants";
import { ToastComponent } from "../../components/layout/ToastComponent/Toastcomponent";


export const Register = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<OptionTypes[] | null>(null);

  useEffect(() => {
    fetchCountryList();
    // eslint-disable-next-line
  }, []);

  const convertApiToOptions = (apiData: list[]): OptionTypes[] => {
    return apiData.map((item) => ({
      value: item.id,
      label: item.countryName,
    }));
  };

  const fetchCountryList = async () => {
    const response = await CountryList();
    if (response) {
      const transformedoptions = convertApiToOptions(response);
      setOptions(transformedoptions);
    }
  };

  interface RegisterFormvalues {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    memberType: string;
    countryId: number;
    organisationCode: string | null;
    roleId: number;
  }



  interface Form1Values {
    firstname: string;
    lastname: string;
    email: string;
  }

  interface Form2Values {
    membertype: string;
    countryId: number;
    code: string | null;
  }


  interface Form3Values {
    password: string;
    cpassword: string;
    termsAccepted: boolean;
  }

  interface FormData {
    step1: Form1Values;
    step2: Form2Values;
    step3: Form3Values;
  }

  const [formData, setFormData] = useState<FormData>({
    step1: REGISTER_FORM.STEP_1_INTIAL_VALUES,
    step2: REGISTER_FORM.STEP_2_INTIAL_VALUES,
    step3: REGISTER_FORM.STEP_3_INTIAL_VALUES,
  });
  const [Registervalues, setRegisterValues] = useState<RegisterFormvalues>(REGISTER_FORM.INTIAL_VALUES);
  const [step, setStep] = useState<number>(1);
  const [isForm1Submitted, setIsForm1Submitted] = useState<boolean>(false);
  const [isForm2Submitted, setIsForm2Submitted] = useState<boolean>(false);

  const handleMemberType = (
    value: string,
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue("membertype", value);
  };

  return (
    <Container>
      <ToastComponent />
      <LeftContainer>
        <img src={logo} alt="logo" className="logo" />
        <MainContainer>
          <Subject
            title1="Register"
            title2="For Free"
            text1="Already have an account?"
            text2="Log in here"
            navigateTo={ROUTES.LOGIN}
          />
          {step === 1 && (
            <Formik
              initialValues={formData.step1}
              validationSchema={REGISTER_FORM.STEP_1_VALIDATION_SCHEMA}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={(values) => {
                setFormData((prevstate) => ({ ...prevstate, step1: values }));
                setRegisterValues((prevState) => ({
                  ...prevState,
                  email: values.email,
                  firstName: values.firstname,
                  lastName: values.lastname,
                }));
                setIsForm1Submitted(true);
                setStep((s) => s + 1);
              }}
            >
              {({ dirty }) => (
                <Form>
                  <div className="verification-list">
                    <div className="verification-item">
                      <div
                        className="verification-step"
                        style={{ backgroundColor: "black" }}
                      >
                        1
                      </div>
                      <div
                        className="verification-button"
                        style={{ color: "black" }}
                        onClick={() => setStep(1)}
                      >
                        Basics <img src={arrow} alt="arrow" />
                      </div>
                    </div>

                    <div className="verification-item">
                      <div className="verification-step">2</div>
                      <button
                        className="verification-button"
                        disabled={dirty || !isForm1Submitted}
                        onClick={() => setStep(2)}
                      >
                        Member Type
                        <img src={arrow} alt="arrow" />
                      </button>
                    </div>

                    <div className="verification-item">
                      <div className="verification-step">3</div>
                      <button
                        className="verification-button"
                        disabled={
                          dirty || !isForm1Submitted || !isForm2Submitted
                        }
                        onClick={() => setStep(3)}
                      >
                        Security
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>First Name*</label>
                    <Field type="text" name="firstname" as={FormControl} />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name*</label>
                    <Field type="text" name="lastname" as={FormControl} />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email (UserName / Login)*</label>
                    <Field type="text" name="email" as={FormControl} />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>

                  <button type="submit">Continue</button>
                </Form>
              )}
            </Formik>
          )}

          {step === 2 && (
            <Formik
              initialValues={formData.step2}
              validationSchema={REGISTER_FORM.STEP_2_VALIDATION_SCHEMA}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={(values) => {
                setFormData((prevState) => ({ ...prevState, step2: values }));
                setRegisterValues((prevState) => ({
                  ...prevState,
                  memberType: values.membertype,
                  countryId: values.countryId,
                  organisationCode: values.code,
                }));
                setIsForm2Submitted(true);

                setStep((c) => c + 1);
              }}
            >
              {({ dirty, setFieldValue, values }) => (
                <Form>
                  <div className="verification-list">
                    <div className="verification-item">
                      <div className="verification-step">1</div>
                      <div
                        className="verification-button"
                        onClick={() => setStep(1)}
                      >
                        Basics <img src={arrow} alt="arrow" />
                      </div>
                    </div>

                    <div className="verification-item">
                      <div
                        className="verification-step"
                        style={{ backgroundColor: "black" }}
                      >
                        2
                      </div>
                      <button
                        className="verification-button"
                        style={{ color: "black" }}
                        onClick={() => setStep(2)}
                      >
                        Member Type <img src={arrow} alt="arrow" />
                      </button>
                    </div>

                    <div className="verification-item">
                      <div className="verification-step">3</div>
                      <button
                        className="verification-button"
                        disabled={dirty || !isForm2Submitted}
                        onClick={() => setStep(3)}
                      >
                        Security
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Member Type*</label>
                    <div
                      className="verification-list"
                      style={{ marginTop: "10px" }}
                    >
                      <div
                        className="member-type"
                        style={{
                          borderColor:
                            values.membertype === "High School/College Student"
                              ? "#F96332"
                              : "currentcolor",
                        }}
                        onClick={() =>
                          handleMemberType(
                            "High School/College Student",
                            setFieldValue
                          )
                        }
                      >
                        High School/College Student
                      </div>
                      <div
                        className="member-type"
                        style={{
                          borderColor:
                            values.membertype === "Undergraduate"
                              ? "#F96332"
                              : "currentcolor",
                        }}
                        onClick={() =>
                          handleMemberType("Undergraduate", setFieldValue)
                        }
                      >
                        Undergraduate
                      </div>
                    </div>
                    <div
                      className="verification-list"
                      style={{ marginTop: "10px", marginBottom: "15px" }}
                    >
                      <div
                        className="member-type"
                        style={{
                          borderColor:
                            values.membertype === "Graduate"
                              ? "#F96332"
                              : "currentcolor",
                        }}
                        onClick={() =>
                          handleMemberType("Graduate", setFieldValue)
                        }
                      >
                        Graduate
                      </div>
                      <div
                        className="member-type"
                        style={{
                          borderColor:
                            values.membertype === "Experienced Hire"
                              ? "#F96332"
                              : "currentcolor",
                        }}
                        onClick={() =>
                          handleMemberType("Experienced Hire", setFieldValue)
                        }
                      >
                        Experienced Hire
                      </div>
                    </div>
                    <ErrorMessage
                      name="membertype"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label>Base Country*</label>
                    

                    {options && (
                      <ReactSelect
                        
                      
                        options={options}
                        showDropdownIndicator
                        name="countryId"
                        onChange={(e, value) => {
                          if (value === null) {
                            setFieldValue("countryId", 0);
                          } else {
                            setFieldValue("countryId", value.value);
                          }
                        }}
                        defaultValue={options.filter((item)=> item.value === formData.step2.countryId)}
                      />
                    )}
                    <ErrorMessage
                      name="countryId"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-group">
                    <label>Organisation Code</label>
                    <Field type="text" name="code" as={FormControl} />
                    <div>(only applicable if joining via an organisation)</div>
                  </div>
                 
                  <button type="submit">Continue</button>
                </Form>
              )}
            </Formik>
          )}

          {step === 3 && (
            <Formik
              initialValues={formData.step3}
              validationSchema={REGISTER_FORM.STEP_3_VALIDATION_SCHEMA}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (values) => {
                setFormData((prevState) => ({ ...prevState, step3: values }));
                setRegisterValues((prevState) => ({
                  ...prevState,
                  password: values.password,
                }));
                const val = { ...Registervalues, password: values.password };
    
                // eslint-disable-next-line
                const response = await api(val);
                response &&  navigate(ROUTES.LOGIN);
              }}
            >
              <Form>
                <div className="verification-list">
                  <div className="verification-item">
                    <div className="verification-step">1</div>
                    <div
                      className="verification-button"
                      onClick={() => setStep(1)}
                    >
                      Basics <img src={arrow} alt="arrow" />
                    </div>
                  </div>

                  <div className="verification-item">
                    <div className="verification-step">2</div>
                    <button
                      className="verification-button"
                      onClick={() => setStep(2)}
                    >
                      Member Type <img src={arrow} alt="arrow" />
                    </button>
                  </div>

                  <div className="verification-item">
                    <div
                      className="verification-step"
                      style={{ backgroundColor: "black" }}
                    >
                      3
                    </div>
                    <button
                      className="verification-button"
                      style={{ color: "black" }}
                      onClick={() => setStep(3)}
                    >
                      Security
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Set a Password*</label>

                  <Field type="password" name="password" as={FormControl} />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password*</label>
                  <div>
                    <Field type="password" name="cpassword" as={FormControl} />
                  </div>
                  <ErrorMessage
                    name="cpassword"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label>Terms & Conditions*</label>
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
                <button type="submit">Register</button>
              </Form>
            </Formik>
          )}

          <Bottom />
        </MainContainer>
      </LeftContainer>
      <RightContainer />
    </Container>
  );
};
