import { Quiz, QuizStatus, SubmitTest } from "../interface/Interface";
import { apiClient } from "./BaseService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getQuiz = async () : Promise<Quiz[] | null> =>
    {
              try {
                const response = await apiClient.get(API_ENDPOINTS.QUIZ_LIST);
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
          API_ENDPOINTS.QUIZ_RESPONSE,
          data
        );
        return response.data;
      } catch (error) {
        return null;
      }
    };
  
    export const QuizEligible = async (UserId : number): Promise<QuizStatus | null > => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.QUIZ_ELIGIBLE(UserId));
        return response.data;
      } catch (error) {
        return null;
      }
    };
  