import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { apiClient } from "./BaseService";
import { MemberAnalytics } from "../interface/Interface";

export const MemberAnalyticsList = async (page : number,isInfographicResume : boolean,isMemberResume : boolean, isPeopleHawkResume  : boolean, isAll :boolean,sortOrder : string, isProfilePhoto : boolean,orderedBy : number, searchTerm?: string , countryId? :  number,memberType? : string): Promise<MemberAnalytics[] | null> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.MEMBER_ANALYTICS(page,isInfographicResume,isMemberResume,isPeopleHawkResume,isAll,sortOrder,orderedBy,isProfilePhoto,searchTerm,countryId,memberType));
      return response.data;
    } catch (error) {
      return null;
    }
  };

  export const MemberAnalyticsCount = async (isInfographicResume : boolean,isMemberResume : boolean, isPeopleHawkResume  : boolean, isAll :boolean,sortOrder : string, isProfilePhoto : boolean,orderedBy : number, searchTerm?: string , countryId? :  number,memberType? : string): Promise<number | null> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.MEMBER_ANALYTICS_COUNT(isInfographicResume,isMemberResume,isPeopleHawkResume,isAll,sortOrder,orderedBy,isProfilePhoto,searchTerm,countryId,memberType));
      return response.data;
    } catch (error) {
      return null;
    }
  };
  