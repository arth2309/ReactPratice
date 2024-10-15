import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { apiClient } from "./BaseService";
import { Request } from "../interface/Interface";
import axios from "axios";

const apiKey = "AIzaSyD1rX7VkFWhjoEtYUl48DgMFjM2wFl4C7M";
const baseUrl =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

export const upsertRequest = async (data: Request): Promise<Request | null> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REQUEST, data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const generateText = async (prompt: string) => {
  try {
    const response = await axios.post(
      baseUrl,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log(response.data.contents[0].text[0]);
    return response.data.contents[0].text[0];
  } catch (error) {
    console.error("Error generating text:", error);
  }
};
