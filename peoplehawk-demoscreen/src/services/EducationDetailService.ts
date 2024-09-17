import { apiClient } from "./BaseService";
import { EducationDetail } from "../interface/Interface";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const GetList = async(userId : number) : Promise<EducationDetail[] | null> =>
{
    try {
       const response = await apiClient.get(API_ENDPOINTS.EDUCATION_DETAIL_USER_ID(userId));
       return response.data;
    }

    catch (error) {
        return null;
    }
}

export const AddData = async(data : EducationDetail[]) : Promise<EducationDetail[] | null> =>
{
    try {
        const response = await apiClient.post(API_ENDPOINTS.EDUCATION_DETAIL,data);
        return response.data;
    }
    catch (error)
    {
        return null;
    }
}

export const DeleteData = async(userId : number) : Promise<EducationDetail | null> => {
    try {
        const response = await apiClient.delete(API_ENDPOINTS.EDUCATION_DETAIL_USER_ID(userId));
        return response.data; 
    }

    catch (error)
    {
        return null;
    }
}

export const UpdateData = async(data : EducationDetail) : Promise<EducationDetail | null> =>  {
    try
    {
        const response = await apiClient.put(API_ENDPOINTS.EDUCATION_DETAIL,data);
        return response.data;
    }
    catch (error)
    {
        return null;
    }
}