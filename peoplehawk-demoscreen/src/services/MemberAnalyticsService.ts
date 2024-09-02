import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { apiClient } from "./BaseService";
import { MemberAnalytics } from "../interface/Interface";

export const MemberAnalyticsList = async (page : number, searchTerm?: string , countryId? :  number,memberType? : string): Promise<MemberAnalytics[] | null> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.MEMBER_ANALYTICS(page,searchTerm,countryId,memberType));
      return response.data;
    } catch (error) {
      return null;
    }
  };
  