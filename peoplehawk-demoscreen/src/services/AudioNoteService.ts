import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { FileUploadData, ResumeFile } from "../interface/Interface";
import { apiClient } from "./BaseService";

export const uploadFile = async (
  userId: number,
  file: Blob
): Promise<ResumeFile | null> => {
  try {
    const formData = new FormData();
    formData.append(`formFile`, file);
    formData.append(`userId`, userId.toString());

    const response = await apiClient.post(API_ENDPOINTS.AUDIO_NOTE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    return null;
    userId;
  }
};
