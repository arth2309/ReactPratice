import { apiClient } from "./BaseService";
import { TextNote } from "../interface/Interface";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const addTextNote = async (data: TextNote): Promise<TextNote | null> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.Text_NOTE, data);
    return response.data;
  } catch {
    return null;
  }
};
