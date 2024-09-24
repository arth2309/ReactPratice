import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { AudioNote } from "../interface/Interface";
import { apiClient } from "./BaseService";

export const uploadAudioNote = async (
  userId: number,
  file: Blob
): Promise<AudioNote | null> => {
  try {
    const formData = new FormData();
    formData.append(`formFile`, file);
    formData.append(`userId`, userId.toString());

    const response = await apiClient.post(API_ENDPOINTS.AUDIO_NOTE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};
