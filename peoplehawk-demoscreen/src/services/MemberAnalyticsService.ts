import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { apiClient } from "./BaseService";
import { MemberAnalytics } from "../interface/Interface";

export const MemberAnalyticsList = async (
  page: number,
  isResume: boolean,
  isPersonalityTest: boolean,
  sortOrder: string,
  isProfilePhoto: boolean,
  orderedBy: number,
  searchTerm?: string,
  countryId?: number,
  memberType?: string
): Promise<MemberAnalytics[] | null> => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.MEMBER_ANALYTICS(
        page,
        isResume,
        isPersonalityTest,
        sortOrder,
        orderedBy,
        isProfilePhoto,
        searchTerm,
        countryId,
        memberType
      )
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const MemberAnalyticsCount = async (
  isResume: boolean,
  isPersonalityTest: boolean,
  sortOrder: string,
  isProfilePhoto: boolean,
  orderedBy: number,
  searchTerm?: string,
  countryId?: number,
  memberType?: string
): Promise<number | null> => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.MEMBER_ANALYTICS_COUNT(
        isResume,
        isPersonalityTest,
        sortOrder,
        orderedBy,
        isProfilePhoto,
        searchTerm,
        countryId,
        memberType
      )
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
