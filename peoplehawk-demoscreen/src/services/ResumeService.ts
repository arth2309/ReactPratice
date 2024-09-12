import { showToast } from "../components/layout/ToastComponent/Toastcomponent";
import { FileUploadData, ResumeFile} from "../interface/Interface";
import { apiClient } from "./BaseService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import {TOAST} from '../constants/toast';




export const uploadFile = async (data: FileUploadData,UserId : number): Promise<ResumeFile | null> => {
    try {
      const formData = new FormData();
      formData.append(`file`, data.file);
  
      const response = await apiClient.post(API_ENDPOINTS.CRUD_FILE(UserId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setTimeout(() => {showToast(TOAST.UPLOAD_RESUME.title,TOAST.UPLOAD_RESUME.description,TOAST.UPLOAD_RESUME.type)},1000)
      return response.data;
    } catch (error) {
      return null;
    }
  };
  
  export const fetchFile = async (fileId: number): Promise<string | null> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CRUD_FILE(fileId), {
        responseType: "blob",
      });
  
      const url = URL.createObjectURL(response.data);
  
      return url;
    } catch (error) {
      return null;
    }
  };
  
  export const deleteFile = async (fileId: number): Promise<ResumeFile | null> => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CRUD_FILE(fileId));
      setTimeout(() => {showToast(TOAST.DELETE_RESUME.title,TOAST.DELETE_RESUME.description,TOAST.DELETE_RESUME.type)},1000);
      return response.data;
    } catch (error) {
      return null;
    }
  };
  
  export const updateFile = async (
    fileId: number,
    data: FileUploadData
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
  
      await apiClient.put(API_ENDPOINTS.CRUD_FILE(fileId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const url = URL.createObjectURL(data.file);
      setTimeout(() => {showToast(TOAST.UPDATE_RESUME.title,TOAST.UPDATE_RESUME.description,TOAST.UPDATE_RESUME.type)},1000)
      return url;
    } catch (error) {
      
      throw new Error(`Error updating file`);
    }
  
    
  };