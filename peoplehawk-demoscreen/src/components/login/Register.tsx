import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../stylesheets/obviously-font.css";
import "./Login.css";
import logo from "../../assests/img/logo@2x.png";
import utility from "../../assests/img/utility-page.svg";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import arrow from "../../assests/img/next-step-arrow.png";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();

  interface Form1Values {
    firstname: string;
    lastname: string;
    email: string;
  }

  const validationSchema1 = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  interface Form2Values {
    membertype: string;
    country: string;
    code: string;
  }

  const validationSchema2 = Yup.object({
    membertype : Yup.string().required("Please select a Member Type"),
    country: Yup.string().required("Please select a Country"),
  });

  interface Form3Values {
    password: string;
    cpassword : string;
    termsAccepted : boolean;
  }

  const validationSchema3 = Yup.object({
    password: Yup.string()
     .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must be at least 8 characters long, use upper-case and lower-case letters, and include both digits and special characters.").required("Please enter a password"),
    cpassword: Yup.string().oneOf([Yup.ref('password')],"Password does not match").required("Please repeat a password"),
    termsAccepted : Yup.boolean().oneOf([true],'Please accept Terms and Conditions').required('Please accept Terms and Conditions')
  });

  interface FormData {
    step1: Form1Values;
    step2: Form2Values;
    step3: Form3Values;
  }

  const [formData, setFormData] = useState<FormData>({
    step1: { firstname: "", lastname: "", email: "" },
    step2: { country: "" , code : '', membertype : ""},
    step3: { password: "" , cpassword : "" , termsAccepted : false},
  });
  const [step, setStep] = useState<number>(1);

  const[isForm1Submitted,setIsForm1Submitted] = useState<boolean>(false);
  const[isForm2Submitted,setIsForm2Submitted] = useState<boolean>(false);

  const handleMemberType = (value : string,setFieldValue : (field : string,value : any) => void) => 
  {
            setFieldValue("membertype",value);
  }

  return (
    <div className="container">
      <div className="left-container">
        <img src={logo} alt="logo" className="logo" />
        <div className="main-container">
          <div className="sub">
            <div className="obviously text-darkblue">Register</div>
            <div className="obviously text-orange">For Free</div>
            <div style={{ marginTop: "40px", marginBottom: "30px" }}>
              Already have an account?
              <span className="text-orange" onClick={() => {navigate("/login")}}>log in Here</span>
            </div>
          </div>

          

          {step === 1 && (
            <Formik
              initialValues={formData.step1}
              validationSchema={validationSchema1}
              validateOnBlur = {false}
              validateOnChange = {false}
              onSubmit={(values) => {
                setFormData((prevstate) => ({ ...prevstate, step1: values }));
                setIsForm1Submitted(true);
                setStep((s) => s + 1);
    
              }}
            >
              {({ dirty }) => (
                
                <Form>

                <div className="verification-list">
            <div className="verification-item">
              <div className="verification-step" style = {{backgroundColor :  'black' }} >1</div>
              <div className="verification-button" style = {{color :  'black' }} onClick={() => setStep(1)}>
                Basics <img src={arrow} alt="arrow"  />
              </div>
            </div>

             <div className="verification-item">
              <div className="verification-step">2</div>
             <button className="verification-button" disabled = {dirty || !isForm1Submitted} onClick={() => setStep(2)}>
                Member Type<img src={arrow} alt="arrow" />
              </button>
            </div> 
            

            <div className="verification-item">
              <div className="verification-step">3</div>
              <button className="verification-button" disabled = {dirty || !isForm1Submitted || !isForm2Submitted} onClick={() => setStep(3)}>
                Security
              </button>
            </div>
          </div>
                  <div className="form-group">
                    <label>First Name*</label>
                    <Field
                      type="text"
                      name="firstname"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name*</label>
                    <Field
                      type="text"
                      name="lastname"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email(UserName / Login)*</label>
                    <Field type="text" name="email" className="form-control" />
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
              validationSchema={validationSchema2}
              validateOnBlur = {false}
              validateOnChange = {false}
              onSubmit={(values) => {
                setFormData((prevState) => ({ ...prevState, step2: values }));
                setIsForm2Submitted(true);
                console.log(values);
                setStep((c) => c + 1);
              }}
            >
              {({ dirty,setFieldValue,values }) => (
                
                <Form>

                <div className="verification-list">
            <div className="verification-item">
              <div className="verification-step">1</div>
              <div className="verification-button" onClick={() => setStep(1)}>
                Basics <img src={arrow} alt="arrow"  />
              </div>
            </div>

             <div className="verification-item">
              <div className="verification-step"  style = {{backgroundColor :  'black' }}>2</div>
             <button className="verification-button" style = {{color :  'black' }}  onClick={() => setStep(2)}>
                Member Type <img src={arrow} alt="arrow" />
              </button>
            </div> 
            

            <div className="verification-item">
              <div className="verification-step">3</div>
              <button className="verification-button" disabled = {dirty ||  !isForm2Submitted} onClick={() => setStep(3)}>
                Security 
              </button>
            </div>
          </div>
          <div className="form-group">
          <label>Member Type*</label>
          <div className="verification-list" style={{marginTop : '10px'}}>
            <div className="member-type" style={{borderColor : values.membertype === "High School/College Student" ? "#F96332" : "currentcolor"}} onClick={() => handleMemberType('High School/College Student',setFieldValue)}>High School/College Student</div>
            <div className="member-type" style={{borderColor : values.membertype === "Undergraduate" ? "#F96332" : "currentcolor"}} onClick={() => handleMemberType('Undergraduate',setFieldValue)}>Undergraduate</div>
          </div>
          <div className="verification-list" style={{marginTop : '10px', marginBottom : '15px'}}>
            <div className="member-type" style={{borderColor : values.membertype === "Graduate" ? "#F96332" : "currentcolor"}} onClick={() => handleMemberType('Graduate',setFieldValue)}>Graduate</div>
            <div className="member-type" style={{borderColor : values.membertype === "Experienced Hire" ? "#F96332" : "currentcolor"}} onClick={() => handleMemberType('Experienced Hire',setFieldValue)}>Experienced Hire</div>
          </div>
          <ErrorMessage
                    name="membertype"
                    component="div"
                    className="error"
                  />
          </div>
                <div className="form-group">
                  <label>Base Country*</label>
                  <Field type="text" name="country" className="form-control" />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label>Organisation Code</label>
                  <Field type="text" name="code"  className="form-control" />
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
              validationSchema={validationSchema3}
              validateOnBlur = {false}
              validateOnChange = {false}
              onSubmit={async(values) => {
                setFormData((prevState) => ({ ...prevState, step3: values }));
                console.log(formData);
                await navigate('/login');
                toast.success('Candidate Registered Successfully',{
                  hideProgressBar : true,
                  closeButton : false,
                  autoClose : 2000,
                  position : "bottom-center"
                })
              }}
            >
              <Form>
              <div className="verification-list">
            <div className="verification-item">
              <div className="verification-step" >1</div>
              <div className="verification-button" onClick={() => setStep(1)}>
                Basics <img src={arrow} alt="arrow" />
              </div>
            </div>

             <div className="verification-item">
              <div className="verification-step">2</div>
             <button className="verification-button"  onClick={() => setStep(2)}>
                Member Type <img src={arrow} alt="arrow" />
              </button>
            </div> 
            

            <div className="verification-item">
              <div className="verification-step" style = {{backgroundColor :  'black' }}>3</div>
              <button className="verification-button" style = {{color :  'black' }}  onClick={() => setStep(3)}>
                Security 
              </button>
            </div>
          </div>
                <div className="form-group">
                  <label>Set a Password*</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password*</label>
                  <Field
                    type="password"
                    name="cpassword"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="cpassword"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group">
                  <label>Terms & Conditions*</label>
                  <div>
                  <Field
                    type="checkbox"
                    name="termsAccepted"
                  />
                    I accept the terms and conditions
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

          <div className="border-bottom"></div>
          <div className="sub">
            <div>
              All use of PeopleHawk is subject to our{" "}
              <span className="text-lightblue">Terms and Conditions</span>
            </div>
            <div className="text-aliceblue">What is PeopleHawk?</div>
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="empty"></div>
        <div className="card12">
          <img src={utility} alt="utility" />
          <div className="obviously text-darkblue">
            Prepare for an <span className="text-orange">Epic</span> Career
          </div>
          <div style={{ marginTop: "10px" }}>
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
};
