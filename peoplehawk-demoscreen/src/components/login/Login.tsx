import { Formik, Field,Form,ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Login as api } from "../../API/apiClient";
import AuthContext from "../../store/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();


    interface LoginFormValues {
        email: string;
        password: string;
      }
      
      const initialValues: LoginFormValues = {
        email: '',
        password: '',
      };

      const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      });

      const loginHandler = async(values : LoginFormValues) => {
           
               const result = await api(values.email,values.password);
                result && authCtx.login(result);
                result && navigate('/Analysis');
               
                
      }


      
return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {loginHandler(values)}}
  >
    <Form>
      <div>
        <label htmlFor="email">Email</label>
        <Field type="email" id="email" name="email" />
        <ErrorMessage name="email" component="div" className="error" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <Field type="password" id="password" name="password" />
        <ErrorMessage name="password" component="div" className="error" />
      </div>

      <button type="submit">Login</button>
    </Form>
  </Formik>
);

}

