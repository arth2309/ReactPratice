export const API_ENDPOINTS = {
  BASE_URL: "https://localhost:7055/api/",
  REGISTER: "auth/register",
  CANDIDATES_LIST: "auth/candidateslist",
  COUNTRY_LIST: "auth/country",
  LOGIN: "auth",
  FORGOT_PASSWORD: "auth/forgotpassword",
  UPLOAD_PROFILE_PHOTO: (UserId: number) => `candidate/${UserId}/uploadPhoto`,
  GET_PROFILE_PHOTO: (UserId: number) => `candidate/${UserId}/candidatePhoto`,
  GET_PROGRESS: (UserId: number) => `candidate/${UserId}/progress`,
  COMPENTENCIES_LIST: "candidate/compentencies",
  USER_COMPENTENCIES_LIST: "candidate/user-compentencies",
  COURSE_INTEREST: "candidate/courseInterests",
  GET_CHART_DATA: "candidate/1/chart",
  USER_DETAIL: (UserId: number) => `candidate/${UserId}/candidateDetail`,
  QUIZ_LIST: "candidate/quiz",
  QUIZ_RESPONSE: "candidate/personalityreport",
  QUIZ_ELIGIBLE: (UserId: number) => `candidate/personalityreport/${UserId}`,
  CRUD_FILE: (UserId: number) => `candidate/files/${UserId}`,
  MEMBER_ANALYTICS: (
    page: number,
    isResume: boolean,
    isPersonalityTest: boolean,
    sortOrder: string,
    orderedBy: number,
    isProfilePhoto: boolean,
    searchTerm?: string,
    countryId?: number,
    memberType?: string
  ) => {
    let url = `candidate/member-analytics?page=${page}&isResume=${isResume}&isPersonalityTest=${isPersonalityTest}&sortOrder=${sortOrder}&orderedBy=${orderedBy}&isProfilePhoto=${isProfilePhoto}`;

    if (searchTerm) {
      url += `&searchTerm=${searchTerm}`;
    }
    if (countryId) {
      url += `&countryId=${countryId}`;
    }

    if (memberType) {
      url += `&memberType=${memberType}`;
    }

    return url;
  },
  EDUCATION_DETAIL_USER_ID: (userId: number) =>
    `candidate/education-detail?UserId=${userId}`,
  EDUCATION_DETAIL: `candidate/education-detail`,
  ASSIGNMENT_USER_ID: (userId: number) =>
    `candidate/assignment?UserId=${userId}`,
  ASSIGNMENT: `candidate/assignment`,
  WORK_EXPERIENCE_USER_ID: (userId: number) =>
    `candidate/work-experience?UserId=${userId}`,
  WORK_EXPERIENCE: `candidate/work-experience`,
  AUDIO_NOTE: "candidate/audio-note",
  Text_NOTE: "candidate/text-note",
  Text_NOTE_ID: (id: number) => `candidate/text-note?Id=${id}`,
  AUDIO_NOTE_ID: (id: number) => `candidate/audio-note?Id=${id}`,
  ABOUT_ME_DETAIL: "candidate/about-me",
  REQUEST: "candidate/request",
  MANAGE_NOTE: (userId: number, isNote: boolean) =>
    `candidate/manage-note?UserId=${userId}&isNote=${isNote}`,
  SHORTLIST: "candidate/shortlist",
  USERSHORTLIST: "candidate/shortlist/user",
  DELETE_USERSHORTLIST: (userId: number, shortListId: number) =>
    `candidate/shortlist/user?UserId=${userId}&ShortlistId=${shortListId}`,
  MEMBER_ANALYTICS_SHORTLIST: (page: number, shortlistId: number) =>
    `candidate/shortlist/user?page=${page}&shortlist=${shortlistId}`,
  DELETE_SHORTLIST: (shortListId: number) =>
    `candidate/shortlist?ShortlistId=${shortListId}`,
  SHARE_PROFILE: "candidate/share-profile",
  SHARE_PROFILE_ID: (id: number) => `candidate/share-profile?Id=${id}`,
  VERIFY_SHARE_PROFILE_TOKEN: (token: string) =>
    `candidate/verify-token?token=${token}`,
  PROFILE_LINK_LIST: (userId: number) =>
    `candidate/profile-link-list?UserId=${userId}`,
};
