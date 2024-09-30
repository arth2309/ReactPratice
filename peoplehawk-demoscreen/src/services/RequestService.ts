import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { apiClient } from "./BaseService";
import { Request } from "../interface/Interface";

export const upsertRequest = async (data: Request): Promise<Request | null> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REQUEST, data);
    return response.data;
  } catch (error) {
    return null;
  }
};
