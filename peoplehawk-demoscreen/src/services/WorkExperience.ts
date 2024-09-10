import { apiClient } from "./BaseService";
import { WorkExperience } from "../interface/Interface";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const GetList = async(userId : number) : Promise<WorkExperience[] | null> =>
{
    try {
       const response = await apiClient.get(API_ENDPOINTS.WORK_EXPERIENCE_USER_ID(userId));
       return response.data;
    }

    catch (error) {
        return null;
    }
}

export const AddData = async(data : WorkExperience) : Promise<WorkExperience | null> =>
{
    try {
        const response = await apiClient.post(API_ENDPOINTS.WORK_EXPERIENCE,data);
        return response.data;
    }
    catch (error)
    {
        return null;
    }
}

export const DeleteData = async(userId : number) : Promise<WorkExperience | null> => {
    try {
        const response = await apiClient.delete(API_ENDPOINTS.WORK_EXPERIENCE_USER_ID(userId));
        return response.data;
    }

    catch (error)
    {
        return null;
    }
}

export const UpdateData = async(data : WorkExperience) : Promise<WorkExperience | null> =>  {
    try
    {
        const response = await apiClient.put(API_ENDPOINTS.WORK_EXPERIENCE,data);
        return response.data;
    }
    catch (error)
    {
        return null;
    }
}