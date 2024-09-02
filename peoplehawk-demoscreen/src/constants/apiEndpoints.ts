export const API_ENDPOINTS = {
    BASE_URL : 'https://localhost:7055/api/',
    REGISTER : 'auth/register',
    CANDIDATES_LIST : 'auth/candidateslist',
    COUNTRY_LIST : 'auth/country',
    LOGIN: 'auth',
    FORGOT_PASSWORD : 'auth/forgotpassword',
    UPLOAD_PROFILE_PHOTO : (UserId : number) => `candidate/${UserId}/uploadPhoto`,
    GET_PROFILE_PHOTO : (UserId : number) => `candidate/${UserId}/candidatePhoto`,
    GET_PROGRESS : (UserId : number) => `candidate/${UserId}/progress`,
    COMPENTENCIES_LIST : 'candidate/compentencies',
    USER_COMPENTENCIES_LIST : 'candidate/user-compentencies',
    COURSE_INTEREST : 'candidate/courseInterests',
    GET_CHART_DATA : 'candidate/1/chart',
    QUIZ_LIST : 'candidate/quiz',
    QUIZ_RESPONSE : 'candidate/personalityreport',
    QUIZ_ELIGIBLE : (UserId : number) => `candidate/personalityreport/${UserId}`,
    CRUD_FILE : (UserId: number) => `candidate/files/${UserId}`,
  MEMBER_ANALYTICS : (page: number, searchTerm?: string, countryId? :  number,memberType? : string) => {
        // Base URL
        let url = `candidate/member-analytics?page=${page}`;
    
        // Add optional query parameters if provided
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
    }
}