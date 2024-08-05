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
  value : string | number
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
