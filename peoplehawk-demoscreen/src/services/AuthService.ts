import { apiClient } from "./BaseService";
import {toast} from 'react-toastify';
import {CountryList as List,LoginFormValues,ForgotPasswordValues} from '../interface/Interface';

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

export const Register = async (
    data: RegisterFormvalues
  ): Promise<RegisterFormvalues | null> => {
    try {
      const response = await apiClient.post<RegisterFormvalues>(
        "auth/register",
        data
      );
      return response.data;
    } catch (error) {
      return null;
    }
  };
  
  export const userList = async (): Promise<RegisterFormvalues[] | null> => {
    try {
      const response = await apiClient.get<RegisterFormvalues[]>("auth/candidateslist");
      return response.data;
    } catch (error) {
      return null;
    }
  };
  
  export const CountryList = async (): Promise<List[] | null> => {
    try {
      const response = await apiClient.get("auth/country");
      return response.data;
    } catch (error) {
      return null;
    }
  };
  
  export const Login = async (data: LoginFormValues): Promise<any> => {
    try {
      const response = await apiClient.post(`auth`, data);
      return response.data;
    } catch (error: any) {
  
     
      toast.error(error.response.data.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  
  export const ForgotPassword = async (
    data: ForgotPasswordValues
  ): Promise<any> => {
    const response = apiClient.post<string>("auth/forgotpassword", data);
    toast.success((await response).data);
  };