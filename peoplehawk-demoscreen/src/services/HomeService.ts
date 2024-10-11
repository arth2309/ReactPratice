import {
  CandidateProgress,
  FileUploadData,
  Competency,
  UserCompetency,
  CandidateDetail,
  AboutMeDetail,
  ShareProfileProps,
  ProfileLinkListProps,
} from "../interface/Interface";
import { apiClient } from "./BaseService";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "../components/layout/ToastComponent/Toastcomponent";
import { TOAST } from "../constants/toast";

export const uploadPhoto = async (
  UserId: number,
  data: FileUploadData
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);

    await apiClient.put(API_ENDPOINTS.UPLOAD_PROFILE_PHOTO(UserId), formData, {
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
    const response = await apiClient.get(
      API_ENDPOINTS.GET_PROFILE_PHOTO(UserId),
      { responseType: "blob" }
    );
    const url = URL.createObjectURL(response.data);
    return url;
  } catch (error) {
    return null;
  }
};

export const fetchUserDetail = async (
  UserId: number
): Promise<CandidateDetail | null> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USER_DETAIL(UserId));
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchData = createAsyncThunk<
  CandidateProgress,
  number,
  { rejectValue: string }
>("data/fetchData", async (UserId: number, thunkAPI) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_PROGRESS(UserId));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("An error occurred while fetching data");
  }
});

export const getProgress = async (
  UserId: number
): Promise<CandidateProgress | null> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_PROGRESS(UserId));
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getCompentencies = async (): Promise<Competency[] | null> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.COMPENTENCIES_LIST);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getUserCompentencies = async (): Promise<
  UserCompetency[] | null
> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USER_COMPENTENCIES_LIST);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const postAboutMeDetail = async (
  data: AboutMeDetail
): Promise<AboutMeDetail | null> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.ABOUT_ME_DETAIL, data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const manageNote = async (
  userId: number,
  isNote: boolean
): Promise<boolean> => {
  try {
    await apiClient.post(API_ENDPOINTS.MANAGE_NOTE(userId, isNote));
    return true;
  } catch {
    return false;
  }
};

export const shareProfile = async (
  data: ShareProfileProps
): Promise<boolean> => {
  try {
    await apiClient.post(API_ENDPOINTS.SHARE_PROFILE, data);
    showToast(
      TOAST.SEND_EMAIL.title,
      TOAST.SEND_EMAIL.description,
      TOAST.SEND_EMAIL.type
    );
    return true;
  } catch {
    showToast(
      TOAST.ERROR_EMAIL.title,
      TOAST.ERROR_EMAIL.description,
      TOAST.ERROR_EMAIL.type
    );
    return false;
  }
};

export const verifyToken = async (
  token: string
): Promise<CandidateDetail | null> => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.VERIFY_SHARE_PROFILE_TOKEN(token)
    );
    return response.data;
  } catch {
    return null;
  }
};

export const getProfileLinkList = async (
  userId: number
): Promise<ProfileLinkListProps[] | null> => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.PROFILE_LINK_LIST(userId)
    );
    return response.data;
  } catch {
    return null;
  }
};

export const deleteProfileLink = async (
  id: number
): Promise<ProfileLinkListProps | null> => {
  try {
    const response = await apiClient.delete(API_ENDPOINTS.SHARE_PROFILE_ID(id));
    return response.data;
  } catch {
    return null;
  }
};
