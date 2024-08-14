import { ChartData, CourseInterest } from "../interface/Interface";
import { apiClient } from "./BaseService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";


export const getCourseInterest = async(): Promise<CourseInterest[]> => {
    try {
      const response = await apiClient.get<CourseInterest[]>(API_ENDPOINTS.COURSE_INTEREST);
      return response.data;
    } catch (error) {
      return [];
    }
  };
  
  export const getChartData = async(): Promise<ChartData> => {
    try {
      const response = await apiClient.get<ChartData>(API_ENDPOINTS.GET_CHART_DATA);
      return response.data;
    } catch (error) {
      return { id: 1, a: 1, s: 1, c: 1, i: 1, r: 1, e: 1, career_code: "asi" };
    }
  };