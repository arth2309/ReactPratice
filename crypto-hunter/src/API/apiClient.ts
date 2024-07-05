import axios, { AxiosInstance } from "axios";
import { coindetails, coinChartDetails } from "../Type";

const BASE_URL: string =
  process.env.REACT_APP_BASE_URL || "https://mocki.io/v1";
const CHART_URL: string =
  process.env.REACT_APP_CHART_URL || "https://api.coingecko.com/api/v3/coins";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const chartclient: AxiosInstance = axios.create({
  baseURL: CHART_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// eslint-disable-next-line
const get = async <T>(url: string, config = {}): Promise<coindetails[]> => {
  try {
    const response = await apiClient.get<coindetails[]>(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
// eslint-disable-next-line
const getChartData = async <T>(
  url: string,
  config = {}
): Promise<coinChartDetails> => {
  try {
    const response = await chartclient.get<coinChartDetails>(url, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { prices: [] };
  }
};

export { apiClient, get, chartclient, getChartData };
