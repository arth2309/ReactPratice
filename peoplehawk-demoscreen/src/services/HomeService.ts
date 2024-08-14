import { CandidateProgress, FileUploadData,Competency,UserCompetency } from "../interface/Interface";
import { apiClient } from "./BaseService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const uploadPhoto = async (
    UserId: number,
    data: FileUploadData
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
  
      await apiClient.put(API_ENDPOINTS.UPLOAD_PROFILE_PHOTO(UserId), formData, {
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

      const response = await apiClient.get(API_ENDPOINTS.GET_PROFILE_PHOTO(UserId),{responseType : 'blob'});
      const url = URL.createObjectURL(response.data);
      return url;
    } catch (error: any) {
      
      return null;
    }
  };
  
  
  export const getProgress = async (UserId : number) : Promise<CandidateProgress | null> =>
    {
              try {
                const response = await apiClient.get(API_ENDPOINTS.GET_PROGRESS(UserId));
                return response.data;
              }
  
              catch(error  : any)
              {
                return null;
              }
    }

    export const getCompentencies = async () : Promise<Competency[] | null> =>
      {
                try {
                  const response = await apiClient.get(API_ENDPOINTS.COMPENTENCIES_LIST);
                  return response.data;
                }
    
                catch(error : any)
                {
                 
                  return null;
                }
      }

      export const getUserCompentencies = async () : Promise<UserCompetency[] | null> =>
        {
                  try {
                    const response = await apiClient.get(API_ENDPOINTS.USER_COMPENTENCIES_LIST);
                    return response.data;
                  }
      
                  catch(error : any)
                  {
                    return null;
                  }
        }
