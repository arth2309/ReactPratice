import { stat } from 'fs';
import { CandidateDetail,CourseInterest,ChartData, WorkExperience, Assignment, EducationDetail } from '../interface/Interface'


export type Action = 
| {type : 'GET_HOME_PAGE_DATA'; payload: CandidateDetail }
| {type : 'GET_COURSE_INTEREST_DATA';  payload: CourseInterest[] | null}
| {type : 'GET_CHART_DATA';  payload: ChartData | null}
| {type : 'GET_RESUME_DATA';   payload: string | null}
| {type : 'POST_RESUME_DATA';  payload: string | null}
| {type : 'DELETE_RESUME_DATA'}
| {type : 'UPDATE_RESUME_DATA';  payload: string | null}
| {type : 'POST_PROFILE_PHOTO';  payload: string | null}
| {type : 'ADD_WORK_EXPERIENCE';  payload: WorkExperience}
| {type : 'ADD_ASSIGNMENT';  payload: Assignment}
| {type : 'ADD_EDUCATION_DETAIL';  payload: EducationDetail[]}
| {type : 'DELETE_WORK_EXPERIENCE';  payload: number}
| {type : 'DELETE_ASSIGNMENT';  payload: number}
| {type : 'DELETE_EDUCATION_DETAIL';  payload: number}
| {type : 'UPDATE_WORK_EXPERIENCE';  payload: {item :WorkExperience,i : number}}
| {type : 'UPDATE_ASSIGNMENT';  payload: {item :Assignment,i : number}}
| {type : 'UPDATE_EDUCATION_DETAIL';  payload: {item :EducationDetail,i : number}}


const base64ToBlob = (base64String: string | null): string | null => {

    if(base64String == null)
    {
        return null;
    }
   
    const byteCharacters = atob(base64String);
    const byteArrays: Uint8Array[] = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return  URL.createObjectURL(new Blob(byteArrays, { type: 'application/pdf' }));
}

export const intialState : CandidateDetail = {
    profilePhoto :  null,
    navigate : false,
    userProgress :  {isResumeUpload : false,progress : 0},
    competencies : [],
    userCompentencyDetails : [],
    educations : [],
    assignments :  [],
    workExperiences :  [],
    courseInterestDetails :  null,
    chartDetail :  null,
    resume : null
}

export const apiReducer = (state : CandidateDetail,action : Action) : CandidateDetail => {
    switch(action.type) {
        case 'GET_HOME_PAGE_DATA': 
        return {...action.payload,resume : base64ToBlob(action.payload.resume),navigate : true};
        case 'GET_RESUME_DATA' : 
        return {...state, resume : action.payload,navigate : true,userProgress : {isResumeUpload : action.payload?true : false, progress : action.payload ? state.userProgress.progress + 50 : state.userProgress.progress}} ;
        case 'GET_CHART_DATA':
        return {...state, chartDetail : action.payload,navigate : true}
        case 'POST_RESUME_DATA':
        return {...state,resume : action.payload, userProgress : {isResumeUpload : true, progress : state.userProgress.progress + 50}}
        case 'DELETE_RESUME_DATA':
        return {...state,resume : null,userProgress : {isResumeUpload : false, progress : state.userProgress.progress - 50}}
        case 'UPDATE_RESUME_DATA':
        return {...state,resume : action.payload}
        case 'POST_PROFILE_PHOTO':
        return {...state,profilePhoto : action.payload}
        case 'ADD_ASSIGNMENT':
        return (state.assignments ? {...state, assignments : [...state.assignments,action.payload]} : state)
        case 'ADD_WORK_EXPERIENCE':
            return (state.workExperiences ? {...state, workExperiences : [...state.workExperiences,action.payload]} : state)
        case 'ADD_EDUCATION_DETAIL':
            return (state.educations ? {...state,educations : [...state.educations,...action.payload]} : state)
         case 'DELETE_ASSIGNMENT':
            return (state.assignments ?{...state, assignments : state.assignments.filter((_,index) => index !== action.payload)} : state)
        case 'DELETE_WORK_EXPERIENCE':
            return (state.workExperiences ? {...state, workExperiences : state.workExperiences.filter((_,index) => index !== action.payload)} : state)
        case 'DELETE_EDUCATION_DETAIL':
            return (state.educations ? {...state,educations : state.educations.filter((_,index) => index !== action.payload)} : state)
        case 'UPDATE_ASSIGNMENT':
                return (state.assignments ? {...state, assignments : state.assignments.map((item, i) => i === action.payload.i ? action.payload.item : item)} : state)
        case 'UPDATE_WORK_EXPERIENCE':
                return (state.workExperiences ? {...state, workExperiences : state.workExperiences.map((item, i) => i === action.payload.i ? action.payload.item : item)} : state)
        case 'UPDATE_EDUCATION_DETAIL':
                return (state.educations ? {...state,educations : state.educations.map((item, i) => i === action.payload.i ? action.payload.item : item)} : state)
        default:
        return state;
    }
}