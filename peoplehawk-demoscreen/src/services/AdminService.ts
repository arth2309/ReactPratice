import { showToast } from "../components/layout/ToastComponent/Toastcomponent";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { TOAST } from "../constants/toast";
import {
  AddClientProps,
  LoginFormValues,
  PaginatedList,
  ViewClientProps,
} from "../interface/Interface";
import { apiClient } from "./BaseService";

export const addClient = async (
  data: AddClientProps
): Promise<number | null> => {
  try {
    const response = await apiClient.post<number>(
      API_ENDPOINTS.ADD_CLIENT,
      data
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getClientDetail = async (
  id: number
): Promise<ViewClientProps | null> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_CLIENT(id));
    return response.data;
  } catch (error) {
    return null;
  }
};

export const sendInvitationLink = async (email: string): Promise<boolean> => {
  try {
    await apiClient.post(API_ENDPOINTS.CLIENT_PASSWORD_INVITATION_LINK(email));
    showToast(
      TOAST.SEND_EMAIL.title,
      TOAST.SEND_EMAIL.description,
      TOAST.SEND_EMAIL.type
    );
    return true;
  } catch {
    showToast(
      TOAST.ERROR_EMAIL.title,
      TOAST.ERROR_EMAIL.description,
      TOAST.ERROR_EMAIL.type
    );
    return false;
  }
};

export const verifyToken = async (
  email: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await apiClient.get<boolean>(
      API_ENDPOINTS.CLIENT_PASSWORD_VERIFY_TOKEN(email, token)
    );
    return response.data;
  } catch {
    return false;
  }
};

export const clientRegister = async (
  data: LoginFormValues
): Promise<boolean> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CLIENT_REGISTER, data);
    return response.data;
  } catch {
    return false;
  }
};

export const getClientList = async (
  adminId: number
): Promise<PaginatedList<ViewClientProps> | null> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.CLIENT_LIST(adminId));
    return response.data;
  } catch {
    return null;
  }
};
