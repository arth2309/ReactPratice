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
  MEMBER_ANALYTICS_COUNT: (
    isResume: boolean,
    isPersonalityTest: boolean,
    sortOrder: string,
    orderedBy: number,
    isProfilePhoto: boolean,
    searchTerm?: string,
    countryId?: number,
    memberType?: string
  ) => {
    let url = `candidate/member-analytics-count?isResume=${isResume}&isPersonalityTest=${isPersonalityTest}&sortOrder=${sortOrder}&orderedBy=${orderedBy}&isProfilePhoto=${isProfilePhoto}`;

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
  USERSHORTLIST: "candidate/userShortlist",
  DELETE_USERSHORTLIST: (userId: number, shortListId: number) =>
    `candidate/userShortlist?UserId=${userId}&ShortlistId=${shortListId}`,
};
