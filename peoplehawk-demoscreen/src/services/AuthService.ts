import { apiClient } from "./BaseService";
import { showToast } from "../components/layout/ToastComponent/Toastcomponent";
import {CountryList as List,LoginFormValues,ForgotPasswordValues} from '../interface/Interface';
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import {TOAST} from '../constants/toast';

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
        API_ENDPOINTS.REGISTER,
        data
      );
      return response.data;
    } catch (error) {
      showToast(TOAST.EMAIL_ALREADY_EXIST.title,TOAST.EMAIL_ALREADY_EXIST.description,TOAST.EMAIL_ALREADY_EXIST.type);
      return null;
    }
  };
  
  
  export const CountryList = async (): Promise<List[] | null> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.COUNTRY_LIST);
      return response.data;
    } catch (error) {
      return null;
    }
  };
  
  export const Login = async (data: LoginFormValues): Promise<string | null> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, data);
      return response.data;
    } catch (error) {
          showToast(TOAST.INVALID_CREDENTIALS.title,TOAST.INVALID_CREDENTIALS.description,TOAST.INVALID_CREDENTIALS.type);
          return null;
    }
  };
  
  