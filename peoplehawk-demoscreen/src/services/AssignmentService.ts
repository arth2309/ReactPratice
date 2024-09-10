import { apiClient } from "./BaseService";
import { Assignment } from "../interface/Interface";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const GetList = async(userId : number) : Promise<Assignment[] | null> =>
{
    try {
       const response = await apiClient.get(API_ENDPOINTS.ASSIGNMENT_USER_ID(userId));
       return response.data;
    }

    catch (error) {
        return null;
    }
}

export const AddData = async(data : Assignment) : Promise<Assignment | null> =>
{
    try {
        const response = await apiClient.post(API_ENDPOINTS.ASSIGNMENT,data);
        return response.data;
    }
    catch (error)
    {
        return null;
    }
}

export const DeleteData = async(userId : number) : Promise<Assignment | null> => {
    try {
        const response = await apiClient.delete(API_ENDPOINTS.ASSIGNMENT_USER_ID(userId));
        return response.data;
    }

    catch (error)
    {
        return null;
    }
}

export const UpdateData = async(data : Assignment) : Promise<Assignment | null> =>  {
    try
    {
        const response = await apiClient.put(API_ENDPOINTS.ASSIGNMENT,data);
        return response.data;
    }
    catch (error)
    {
        return null;
    }
}