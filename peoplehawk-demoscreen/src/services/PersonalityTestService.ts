import { Quiz, QuizStatus, SubmitTest } from "../interface/Interface";
import { apiClient } from "./BaseService";

export const getQuiz = async () : Promise<Quiz[] | null> =>
    {
              try {
                const response = await apiClient.get('candidate/quiz');
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
          "candidate/personalityreport",
          data
        );
        return response.data;
      } catch (error) {
        return null;
      }
    };
  
    export const QuizEligible = async (UserId : number): Promise<QuizStatus | null > => {
      try {
        const response = await apiClient.get(`candidate/personalityreport/${UserId}`);
        return response.data;
      } catch (error) {
        return null;
      }
    };
  