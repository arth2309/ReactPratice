import { apiClient } from "./BaseService";
import { Shortlist } from "../interface/Interface";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getShortlist = async (): Promise<Shortlist[] | null> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.SHORTLIST);
    return response.data;
  } catch {
    return null;
  }
};
