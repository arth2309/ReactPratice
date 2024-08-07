import axios, { AxiosError, AxiosInstance } from "axios";
import {
  CourseInterest,
  ChartData,
  FileUploadData,
  CountryList as list,
  LoginFormValues,
  ForgotPasswordValues,
  Quiz,
  SubmitTest
} from "../interface/Interface";
import { toast } from "react-toastify";
import { getToken } from "../utils/manageAccessToken";


interface RegisterFormvalues {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  memberType: string;
  countryId: number;
  organisationCode: string | null;
  roleId: number;
}

const BASE_URL: string = "https://localhost:7055/api/candidate/";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const Register = async (
  data: RegisterFormvalues
): Promise<RegisterFormvalues | null> => {
  try {
    const response = await apiClient.post<RegisterFormvalues>(
      "/register",
      data
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const userList = async (): Promise<RegisterFormvalues[] | null> => {
  try {
    const response = await apiClient.get<RegisterFormvalues[]>("/users");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const CountryList = async (): Promise<list[] | null> => {
  try {
    const response = await apiClient.get("/country");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const Login = async (data: LoginFormValues): Promise<any> => {
  try {
    const response = await apiClient.post(`/auth`, data);
    return response.data;
  } catch (error: any) {

   
    toast.error(error.response.data.error, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const ForgotPassword = async (
  data: ForgotPasswordValues
): Promise<any> => {
  const response = apiClient.post<string>("/forgotpassword", data);
  toast.success((await response).data);
};

// eslint-disable-next-line
export const getCourseInterest = async(): Promise<CourseInterest[]> => {
  try {
    const response = await apiClient.get<CourseInterest[]>('/courseInterests');
    return response.data;
  } catch (error) {
    return [];
  }
};

// eslint-disable-next-line
export const getChartData = async(): Promise<ChartData> => {
  try {
    const response = await apiClient.get<ChartData>('1/chart');
    return response.data;
  } catch (error) {
    return { id: 1, a: 1, s: 1, c: 1, i: 1, r: 1, e: 1, career_code: "asi" };
  }
};

export const uploadFile = async (data: FileUploadData,UserId : number): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append(`file`, data.file);

    const response = await apiClient.post(`/files/${UserId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setTimeout(() => {toast.success("File uploaded Successfully", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });},2000)
    

    return response;
  } catch (error) {
    
    
  }
};

export const fetchFile = async (fileId: number): Promise<string | null> => {
  try {
    const response = await apiClient.get(`/files/${fileId}`, {
      responseType: "blob",
    });

    const url = URL.createObjectURL(response.data);

    return url;
  } catch (error: any) {
    return null;
  }
};

export const deleteFile = async (fileId: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/files/${fileId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching file`);
  }
};

export const updateFile = async (
  fileId: number,
  data: FileUploadData
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);

    await apiClient.put(`/files/${fileId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const url = URL.createObjectURL(data.file);
    return url;
  } catch (error) {
    throw new Error(`Error updating file`);
  }

  
};

export const getQuiz = async () : Promise<Quiz[] | null> =>
  {
            try {
              const response = await apiClient.get('/quiz');
              return response.data;
            }

            catch(error)
            {
              return null;
            }
  }

  export const QuizResponse = async (
    data: SubmitTest[]
  ): Promise<SubmitTest[] | null> => {
    try {
      const response = await apiClient.post<SubmitTest[]>(
        "/personalityreport",
        data
      );
      return response.data;
    } catch (error) {
      return null;
    }
  };

  export const QuizEligible = async (UserId : number): Promise<boolean | null > => {
    try {
      const response = await apiClient.get(`/personalityreport/${UserId}`);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  export const uploadPhoto = async (
    UserId: number,
    data: FileUploadData
  ): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
  
      await apiClient.put(`${UserId}/uploadPhoto`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const url = URL.createObjectURL(data.file);
      return url;
    } catch (error) {
      throw new Error(`Error updating file`);
    }
  
    
  };

  export const fetchPhoto = async (UserId: number): Promise<string | null> => {
    try {
      const response = await apiClient.get(`${UserId}/candidatePhoto`, {
        responseType: "blob",
      });
  
      const url = URL.createObjectURL(response.data);
  
      return url;
    } catch (error: any) {
      return null;
    }
  };
  
  
  export const getProgress = async (UserId : number) : Promise<number | null> =>
    {
              try {
                const response = await apiClient.get(`${UserId}/progress`);
                return response.data;
              }
  
              catch(error)
              {
                return null;
              }
    }