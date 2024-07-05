import TextField from "@mui/material/TextField";
import { Formik, Field, Form, useFormikContext } from "formik";
import { RegistrationDetails, Count } from "../../Type";
import { useRef, useEffect, useContext } from "react";
import * as Yup from "yup";
import { Fragment } from "react/jsx-runtime";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import CountContext from "../../store/count-context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Switch from "@mui/material/Switch";
import { itemActions } from "../../store";
import { countActions } from "../../store";

const Registration = (props: any) => {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.item.items);

  const Formikfunction = () => {
    const { values } = useFormikContext<RegistrationDetails>();

    useEffect(() => {
      if (values.checked.length !== values.number) {
        toast(`it should contains exactly ${values.number} games`);
      }
      // eslint-disable-next-line
    }, [values.checked.length !== values.number]);

    return null;
  };
 
  const { onGetData, cid, setId } = props;

  const intialvalues: RegistrationDetails = {
    id: cid,
    name: "",
    email: "",
    interested: "",
    number: 0,
    checked: [],
    type: "Singles",
  };

  const ctx = useContext<Count>(CountContext);

  const validationschema = Yup.object().shape({
    name: Yup.string().required("Please enter Name"),
    email: Yup.string()
      .email("Enter valid email")
      .required("Please enter email")
      .test("email-exists", "email already exists", (email) => {
        return !items.some((item) => item.email === email);
      }),
    interested: Yup.string().required("interested field is required"),
    number: Yup.number()
      .min(0, "number should be positive")
      .max(4, "number should not be greater than 4")
      .required("please enter number"),
    checked: Yup.array().when("number", (value: any, schema) => {
      return schema.length(value[0], `it should contains exactly ${value[0]}`);
    }),
  });

  const detailsNavigate = useNavigate();               

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const SubmitHandler = (values: RegistrationDetails) => {
    setId((c: number) => c + 1);
    onGetData(values);
    

    ctx.count = ctx.count + 1;

    values.type = values.checked.includes("Table Tennis")
      ? values.type
      : "not Participated";

    dispatch(itemActions.addItem(values));
    dispatch(countActions.increment());

    detailsNavigate("/Details");
  };

  return (
    <Fragment>

      
      <Container>
        <h2>Registration Details</h2>
        <Formik
          initialValues={intialvalues}
          validationSchema={validationschema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={SubmitHandler}
        >

          {({ values, errors, touched }) => (
            <Form>
              <h3 style={{ marginTop: "50px" }}>Personal Details :</h3>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    style={{ width: "100%" }}
                    name="name"
                    label="Name"
                    error={errors.name && touched.name}
                    helperText={
                      errors.name && touched.name ? errors.name : null
                    }
                    inputRef={inputRef}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    style={{ width: "100%" }}
                    name="email"
                    label="Email"
                    error={errors.email && touched.email}
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>
              </Grid>
              
              <h3 style={{ marginTop: "50px" }}>Sports Details :</h3>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormLabel
                    required
                    style={{
                      color:
                        errors.interested && touched.interested ? "red" : "",
                    }}
                  >
                    interested{" "}
                  </FormLabel>
                  <Field as={RadioGroup} name="interested">
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </div>
                  </Field>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Field
                    as={TextField}
                    type="number"
                    name="number"
                    label="number"
                    disabled={!(values.interested === "yes")}
                    error={errors.number && touched.number}
                    helperText={
                      errors.number && touched.number ? errors.number : null
                    }
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Field as={FormGroup}>
                    <FormControlLabel
                      control={<Checkbox />}
                      name="checked"
                      disabled={!(values.interested === "yes")}
                      value="chess"
                      label="chess"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      name="checked"
                      disabled={!(values.interested === "yes")}
                      value="carrom"
                      label="carrom"
                    />
                  </Field>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Field as={FormGroup}>
                    <FormControlLabel
                      control={<Checkbox />}
                      name="checked"
                      disabled={!(values.interested === "yes")}
                      value="ludo"
                      label="ludo"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      name="checked"
                      disabled={!(values.interested === "yes")}
                      value="Table Tennis"
                      label="Table Tennis"
                    />
                    <div style={{display : 'flex'}}>
                    <FormLabel component="legend" style={{marginTop : 7}}>Singles</FormLabel>
                    <Field
                      as={Switch}
                      name = 'type'
                      value = 'Doubles'
                      disabled={!values.checked.includes("Table Tennis")}
                    
                    />
                    <FormLabel component="legend" style={{marginTop : 7}}>Doubles</FormLabel>
                  </div>
                  </Field>
                </Grid>

                <Grid item xs={3}>
                  
                </Grid>
              </Grid>

              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={values.checked.length !== values.number}
                >
                  Submit
                </Button>
                <ToastContainer />
                <Formikfunction />
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Fragment>
  );
};

export default Registration;
