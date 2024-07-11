import axios, { AxiosInstance } from "axios";
import { CourseInterest,ChartData } from "../type";

const BASE_URL: string =
  process.env.REACT_APP_BASE_URL || "https://localhost:7055/api/PeoplehawkAPI";


const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



// eslint-disable-next-line
const getCourseInterest = async <T>(url: string, config = {}): Promise<CourseInterest[]> => {
  try {
    const response = await apiClient.get<CourseInterest[]>(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// eslint-disable-next-line
const getChartData = async <T>(url: string, config = {}): Promise<ChartData> => {
    try {
      const response = await apiClient.get<ChartData>(url, config);
  
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return { id : 1, a : 1, s : 1, c : 1, i : 1, r : 1,e : 1, career_code : 'asi'};
    }
  };
  



export { apiClient, getCourseInterest,getChartData};
