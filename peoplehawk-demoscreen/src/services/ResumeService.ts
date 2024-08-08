import { toast } from "react-toastify";
import { FileUploadData } from "../interface/Interface";
import { apiClient } from "./BaseService";

export const uploadFile = async (data: FileUploadData,UserId : number): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append(`file`, data.file);
  
      const response = await apiClient.post(`candidate/files/${UserId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setTimeout(() => {toast.success("File uploaded Successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });},2000)
      
  
      return response;
    } catch (error) {
      
      
    }
  };
  
  export const fetchFile = async (fileId: number): Promise<string | null> => {
    try {
      const response = await apiClient.get(`candidate/files/${fileId}`, {
        responseType: "blob",
      });
  
      const url = URL.createObjectURL(response.data);
  
      return url;
    } catch (error: any) {
      return null;
    }
  };
  
  export const deleteFile = async (fileId: number): Promise<any> => {
    try {
      const response = await apiClient.delete(`candidate/files/${fileId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching file`);
    }
  };
  
  export const updateFile = async (
    fileId: number,
    data: FileUploadData
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
  
      await apiClient.put(`candidate/files/${fileId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const url = URL.createObjectURL(data.file);
      return url;
    } catch (error) {
      throw new Error(`Error updating file`);
    }
  
    
  };