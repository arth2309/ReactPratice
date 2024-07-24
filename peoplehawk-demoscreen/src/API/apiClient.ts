import axios, { AxiosError, AxiosInstance } from "axios";
import { CourseInterest,ChartData,FileUploadData } from "../type";
import {toast} from 'react-toastify'




const BASE_URL: string =
  process.env.REACT_APP_BASE_URL || "https://localhost:7055/api/PeoplehawkAPI";


const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error:AxiosError) => {
      return Promise.reject(error);
  }
)

export const Login = async(email : string,password : string): Promise<any> => {
  try {
    const response = await apiClient.post(`/Auth/${email}&&${password}`);
    toast.success("successfully");
    return response.data;
    
  }
  catch(error : any)
  {
    console.log(error.response.data);
    toast.error(error.response.data,{
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
  })

  }
}


export const getCourseInterest = async <T>(url: string, config = {}): Promise<CourseInterest[]> => {
  try {
    const response = await apiClient.get<CourseInterest[]>(url, config);
    return response.data;
   

    
  } catch (error) {
    
    return [];
  }
};

// eslint-disable-next-line
export const getChartData = async <T>(url: string, config = {}): Promise<ChartData> => {
    try {
      const response = await apiClient.get<ChartData>(url, config);
  
      return response.data;
    } catch (error) {
     
      return { id : 1, a : 1, s : 1, c : 1, i : 1, r : 1,e : 1, career_code : 'asi'};
    }
  };

 export const uploadFile = async (data: FileUploadData): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append('file', data.file);
  
      const response = await apiClient.post('/Files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response;  
    } catch (error ) {
      throw new Error(`Error uploading file`);
    }
  };

 export const fetchFile = async (fileId: number): Promise<string | null > => {
    try {
      const response = await apiClient.get(`/Files/${fileId}`, {
      responseType :   'blob'
      
      });

      const url = URL.createObjectURL(response.data);
  
      return url
    } 
    catch (error : any) {
      
      return null;
    }
  };

 export const deleteFile = async(fileId : number): Promise<any> => {
    try{
      const response = await apiClient.delete(`/Files/${fileId}`);
      return response.data;
    }

    catch(error) {
      
      throw new Error(`Error fetching file`);
    }
  }

  export const updateFile = async(fileId : number,data: FileUploadData): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', data.file);
  
       await apiClient.put(`/Files/${fileId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        const url = URL.createObjectURL(data.file);
      return url; 
    } catch (error) {
      throw new Error(`Error updating file`);
    }
  };
  


  
  




