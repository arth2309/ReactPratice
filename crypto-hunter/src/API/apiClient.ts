import axios, { AxiosInstance } from 'axios';
import { coindetails , coinChartDetails } from '../Type';

// Define the base URL for your API
const BASE_URL: string = process.env.REACT_APP_BASE_URL || 'https://mocki.io/v1';
const CHART_URL: string = process.env.REACT_APP_CHART_URL || 'https://api.coingecko.com/api/v3/coins';


// Create an Axios instance with default configurations
const apiClient: AxiosInstance = axios.create({
baseURL: BASE_URL,
headers: {
'Content-Type': 'application/json',
// Add other headers like authorization tokens here
},
});

const chartclient: AxiosInstance = axios.create({
    baseURL : CHART_URL,
    headers: {
        'Content-Type': 'application/json',
        // Add other headers like authorization tokens here
        },
})

// Define a function for GET requests that uses .map to transform the data
const get = async <T>(url: string, config = {}): Promise<coindetails[]> => {
try {
const response = await apiClient.get<coindetails[]>(url, config);
// Assuming the response.data is an array and you want to transform it
return response.data
} catch (error) {
console.error('Error fetching data:', error);
return []; // Return an empty array in case of an error
}
};

const getChartData = async <T>(url: string, config = {}): Promise<coinChartDetails> => {
    try {
    const response = await chartclient.get<coinChartDetails>(url, config);
    // Assuming the response.data is an array and you want to transform it
    return response.data
    } catch (error) {
    console.error('Error fetching data:', error);
    return {prices : []}; // Return an empty array in case of an error
    }
    };

// Export the API client and functions
export { apiClient, get ,chartclient , getChartData};