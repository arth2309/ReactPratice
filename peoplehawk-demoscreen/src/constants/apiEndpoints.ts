

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
  MEMBER_ANALYTICS : (page: number,isInfographicResume : boolean,isMemberResume : boolean, isPeopleHawkResume  : boolean, isAll :boolean,sortOrder : string,orderedBy : number, isProfilePhoto : boolean, searchTerm?: string, countryId? :  number,memberType? : string) => {
    
        let url = `candidate/member-analytics?page=${page}&isInfographicResume=${isInfographicResume}&isMemberResume=${isMemberResume}&isPeopleHawkResume=${isPeopleHawkResume}&isAll=${isAll}&sortOrder=${sortOrder}&orderedBy=${orderedBy}&isProfilePhoto=${isProfilePhoto}`;

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
    MEMBER_ANALYTICS_COUNT : (isInfographicResume : boolean,isMemberResume : boolean, isPeopleHawkResume  : boolean, isAll :boolean,sortOrder : string,orderedBy : number, isProfilePhoto : boolean, searchTerm?: string, countryId? :  number,memberType? : string) => {
    
        let url = `candidate/member-analytics-count?isInfographicResume=${isInfographicResume}&isMemberResume=${isMemberResume}&isPeopleHawkResume=${isPeopleHawkResume}&isAll=${isAll}&sortOrder=${sortOrder}&orderedBy=${orderedBy}&isProfilePhoto=${isProfilePhoto}`;

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

    EDUCATION_DETAIL_USER_ID : (userId : number) => `candidate/education-detail?UserId=${userId}`,

    EDUCATION_DETAIL :  `candidate/education-detail`
}



