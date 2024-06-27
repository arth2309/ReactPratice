import React,{useRef,useEffect, useState} from "react";
import { Formik,Field,FormikValues,Form } from "formik";
import * as Yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  VisibilityOff  from "@mui/icons-material/VisibilityOff";
import  IconButton  from "@mui/material/IconButton";
import './formdata.css';


interface FormValues {

    name : string,
    email: string,
    country : string,
    code : string,
    mobile : string,
    password : string
}

const validationSchema = Yup.object().shape({

    name : Yup.string().required('Please enter Name'),
    email : Yup.string().email('Invalid email').required('Please enter Email'),
    country : Yup.string().required('Please enter Country'),
    code : Yup.string(),
    mobile : Yup.string().when('code',(value,schema) => {return value[0].trim().length > 0 ? schema.required('Please Enter Phone Number') : schema}),
    password : Yup.string().min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*#?&]/, 'Password must contain at least one special character')
    .required('Please enter Password')

});





const Dataform : React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);

// Focus the input field when the component mounts
useEffect(() => {
if (inputRef.current) {
inputRef.current.focus();
}
}, []);

const[showPassword,setShowPassword] = useState(false);



    const intialValues: FormValues = {

        name: '',
        email: '',
        country : '',
        code :' ',
        mobile : '',
        password : ''
    }

    const handleSubmit = (values : FormikValues ) =>
    {
        console.log(values)
    }

    const passwordHandler = () =>
        {
            setShowPassword(!showPassword);
        }
 
    return (

    
            <Formik
            initialValues={intialValues}
            validationSchema={validationSchema}
            validateOnBlur = {false}
           
            
            onSubmit={handleSubmit}
            >

                {({errors,touched}) => (
              <Form>
                <div className="container">

                    <div>
              
              <div className="input-div">
                      Name :
                      <div>
                      <Field type = 'text' name = 'name' 
                innerRef={inputRef} 
                />
                 {errors.name && touched.name ? <div className="danger">{errors.name}</div> : null}
                      </div>
                      
              </div>
              
                      
                    
                   
                   
              
               
       
                
                
               
         
                <div className="input-div">
                Email:
                <div>
                <Field type = 'email' name = 'email' />
                {errors.email && touched.email ? <div className="danger">{errors.email}</div> : null}
                </div>
                </div>
               

              
             

                <div className="input-div">
                Country :
                <div>

               
                <Field type = 'text' name = 'country' />
                {errors.country && touched.country ? <div className="danger">{errors.country}</div> : null}
                </div>

               
                </div>
               
             

                 
               <div className="input-div">
                Phone No :
                
                <Field as="select" name="code">
            <option value=" ">select code</option>
            <option value="in">+91</option>

            
          
                </Field>
                <div  className = 'space'>
                
            
                <Field type = 'number' name = 'mobile' />
                {errors.mobile && touched.mobile ? <div className="danger">{errors.mobile}</div> : null}
                </div>
               
              
                </div>
                <div className="input-div">
                Password :
                
                <div>
                    <div className="password">

                   
                <Field type = {showPassword ? 'text' : 'password'} name = 'password' />
                <span onClick={passwordHandler} className="ab">{showPassword ? <VisibilityOff /> : <VisibilityIcon />}</span>
                {errors.password && touched.password ? <div className="danger">{errors.password}</div> : null}
                </div>
              
                </div>
              
                </div>

                  <div style={{display : 'flex', justifyContent : 'center' , marginTop : '12px'}}>
                <button type="submit" >Add</button>
                </div>
                </div>
                </div>
              </Form>
              )}
            </Formik>

    

    );

}


export default Dataform;