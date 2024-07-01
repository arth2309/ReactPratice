import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const  Updatedetail = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const intialvalues: RegistrationDetails = {
    id: 1,
    name: "",
    email: "",
    interested: "",
    number: 0,
    checked: [],
    type: "Singles",
  };

  return (

    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          // BackdropProps= {{
          //     classes: {
          //         root: classes.backDrop
          //     }
          // }}
        >
          <Formik
          initialValues={intialvalues}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={() => console.log('hii')}
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
              
              </div>
            </Form>
          )}
        </Formik>
      </Modal> */}
      <Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <Formik
          initialValues={intialvalues}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={() => console.log('hii')}
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
              
              </div>
            </Form>
          )}
        </Formik>
  </Box>
</Modal>
    </div>
  );
}

export default Updatedetail;