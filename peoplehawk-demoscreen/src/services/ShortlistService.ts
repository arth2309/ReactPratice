import { apiClient } from "./BaseService";
import { Shortlist, UserShortlist } from "../interface/Interface";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getShortlist = async (): Promise<Shortlist[] | null> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.SHORTLIST);
    return response.data;
  } catch {
    return null;
  }
};

export const addUserInShortlist = async (
  data: UserShortlist
): Promise<UserShortlist | null> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.USERSHORTLIST, data);
    return response.data;
  } catch {
    return null;
  }
};

export const removeUserInShortlist = async (
  userId: number,
  shortListId: number
): Promise<UserShortlist | null> => {
  try {
    const response = await apiClient.delete(
      API_ENDPOINTS.DELETE_USERSHORTLIST(userId, shortListId)
    );
    return response.data;
  } catch {
    return null;
  }
};

export const addShortlist = async (
  data: UserShortlist
): Promise<UserShortlist | null> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.SHORTLIST, data);
    return response.data;
  } catch {
    return null;
  }
};
