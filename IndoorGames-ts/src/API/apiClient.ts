import axios, { AxiosInstance } from "axios";
import { RegistrationDetails } from "../Type";


const BASE_URL: string =
  process.env.REACT_APP_BASE_URL || "https://localhost:7269/api/IndoorGames";


const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



// eslint-disable-next-line
const getParticipantsDetails = async <T>(url: string, config = {}): Promise<RegistrationDetails[]> => {
  try {
    const response = await apiClient.get<RegistrationDetails[]>(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const postParticipantsDetail = async (url: string, data: RegistrationDetails): Promise<RegistrationDetails> => {
    try {
      const response = await apiClient.post<RegistrationDetails>(url, data);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error; 
    }
  };

  const deleteParticipant = async (url: string): Promise<void> => {
    try {
      await apiClient.delete(url);
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error; // Rethrow the error to be handled where the function is called
    }
  };
  





export { apiClient, getParticipantsDetails,postParticipantsDetail,deleteParticipant};
