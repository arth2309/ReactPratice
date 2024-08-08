import { CandidateProgress, FileUploadData } from "../interface/Interface";
import { apiClient } from "./BaseService";

export const uploadPhoto = async (
    UserId: number,
    data: FileUploadData
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
  
      await apiClient.put(`candidate/${UserId}/uploadPhoto`, formData, {
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

  export const fetchPhoto = async (UserId: number): Promise<string | null> => {
    try {
      const response = await apiClient.get(`candidate/${UserId}/candidatePhoto`, {
        responseType: "blob",
      });
  
      const url = URL.createObjectURL(response.data);
  
      return url;
    } catch (error: any) {
      return null;
    }
  };
  
  
  export const getProgress = async (UserId : number) : Promise<CandidateProgress | null> =>
    {
              try {
                const response = await apiClient.get(`candidate/${UserId}/progress`);
                return response.data;
              }
  
              catch(error)
              {
                return null;
              }
    }