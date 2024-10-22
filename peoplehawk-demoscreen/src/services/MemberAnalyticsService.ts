import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { apiClient } from "./BaseService";
import { MemberAnalytics, PaginatedList } from "../interface/Interface";

export const MemberAnalyticsList = async (
  page: number,
  userId: number,
  typeId: number,
  isResume: boolean,
  isPersonalityTest: boolean,
  sortOrder: string,
  isProfilePhoto: boolean,
  orderedBy: number,
  searchTerm?: string,
  countryId?: number,
  memberType?: string
): Promise<PaginatedList<MemberAnalytics> | null> => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.MEMBER_ANALYTICS(
        page,
        userId,
        typeId,
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

export const memberAnalyticsShortList = async (
  page: number,
  shortlistId: number
): Promise<PaginatedList<MemberAnalytics> | null> => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.MEMBER_ANALYTICS_SHORTLIST(page, shortlistId)
    );
    return response.data;
  } catch {
    return null;
  }
};
