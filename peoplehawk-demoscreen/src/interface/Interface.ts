export interface CourseInterest{

    id : number
    name: string
    description: string
    features: string
    likes: string
    courses: string
    color1: string
    color2: string
  }

  export interface ChartData {

   id: number
  a: number
  c: number
  e: number
  i: number
  r: number
  s: number
  career_code: string

  }

  export interface FileUploadData {
    file: File;
  }

  export interface CountryList
  {
    id : number,
    countryName : string
  }

  export interface LoginFormValues {
    email: string;
    password: string;
  }

 export  interface ForgotPasswordValues {
    email : string
}

export interface OptionTypes {
  label : string,
  value : string | number,
  isDisabled? : boolean 
}

export interface Quiz {
  id : number,
  question : string
}

export interface SubmitTest {
  userId : number,
  quizId : number,
  answer : number,
  testNo : number
}

export interface CandidateProgress {
  isResumeUpload : boolean,
  progress : number
}

export interface QuizStatus {
  isFirstTestGiven : boolean,
  testNo : number
}

export interface Competency {
  id : number,
  title : string,
  competency_part : string
}

export interface UserCompetency {
  id : number,
  name : string,
  compentencies : number
}

export interface Owner {
  firstName : string,
  middleName : string,
  lastName : string,
  mail : string
}

export interface Completion {
  isPersonalityQuizGiven : boolean,
  isGames : boolean,
  isVideoInterview : boolean,
  isCVOptimized : boolean,
  isCompentencyQuizGiven : boolean,
  isDocumentGiven : boolean
}

export interface MemberAnalytics {
    userId : number,
    firstName : string,
    memberType : string,
    lastName : string,
    email : string,
    country : CountryList,
    ownedBy : Owner | null,
    completion : Completion
    isResumeUpload : boolean,
    isProfilePhoto : boolean,
    photoContent : string | null
}

export interface OrderBy {
  field: string
  direction: string
}

export interface IdType {
  id: string
  name: string
}

export type StateValue =
  | string
  | string[]
  | number
  | OrderBy
  | undefined
  | null
  | boolean
  | number[]
  | IdType[]

export interface KeyValue {
  [key: string]: StateValue
}

export interface Subject {
  subject : string,
  grade : number,
  rewardedDate : Date | null
}

export interface FormValues {
comments : string,
subjects : Subject[],
school : string 
}

export interface EducationData {
  school : string,
  subject : string,
  grade : number,
  rewardedDate : Date | null
  comments : string 
}