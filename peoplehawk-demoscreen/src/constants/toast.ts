
interface ToastComponentProps  {
    title : string,
    description : string,
    type : "success" | "error" | "warning" | "info" | undefined
}

interface ToastProps 
{
    LOGGED_OUT : ToastComponentProps,
    INVALID_CREDENTIALS : ToastComponentProps,
    REGISTER : ToastComponentProps,
    MOBILE_VIEW_NOT_SUPPORTED : ToastComponentProps,
    FILE_LIMIT : ToastComponentProps,
    UPLOAD_RESUME : ToastComponentProps,
    DELETE_RESUME : ToastComponentProps,
    UPDATE_RESUME : ToastComponentProps,
    EMAIL_ALREADY_EXIST : ToastComponentProps,
    DELETE_ASSIGNMENT : ToastComponentProps,
    DELETE_WORK_EXPERIENCE : ToastComponentProps,
    DELETE_EDUCATION_DETAIL : ToastComponentProps,
    ADD_ASSIGNMENT : ToastComponentProps,
    ADD_WORK_EXPERIENCE : ToastComponentProps,
    ADD_EDUCATION_DETAIL : ToastComponentProps,
    UPDATE_ASSIGNMENT : ToastComponentProps,
    UPDATE_WORK_EXPERIENCE : ToastComponentProps,
    UPDATE_EDUCATION_DETAIL : ToastComponentProps,
}

export const TOAST : ToastProps   = {
    LOGGED_OUT : {
        title : 'Success',
        description : 'You have Successfully Logged out',
        type : 'success'
    },
    INVALID_CREDENTIALS : {
        title : 'Error',
        description : 'Invalid Credentials',
        type : 'error'
    },
    REGISTER : {
       title : 'Success',
       description : 'Candidate Registered Successfully',
       type : 'success'
    },
    MOBILE_VIEW_NOT_SUPPORTED : {
        title : 'Warning',
        description : 'Mobile view is not supported',
        type : 'warning'
    },
    FILE_LIMIT : {
        title : 'Error',
        description : 'File size exceeds 15 KB limit.',
        type : 'error'
    },
    UPLOAD_RESUME : {
        title : 'Success',
        description : 'Resume Upload Successfully',
        type : 'success'
    },
    DELETE_RESUME : {
        title : 'Success',
        description : 'Resume Deleted Successfully',
        type : 'success'
    },
    UPDATE_RESUME : {
        title : 'Success',
        description : 'Resume Updated Successfully',
        type : 'success'
    },
    EMAIL_ALREADY_EXIST : {
        title : 'Error',
        description : 'email already exist',
        type : 'error'
    },
    ADD_EDUCATION_DETAIL : {
        title : 'Success',
        description : 'Education Detail added Successfully',
        type : 'success'
    },
    ADD_ASSIGNMENT : {
        title : 'Success',
        description : 'Assignment added Successfully',
        type : 'success'
    },
    ADD_WORK_EXPERIENCE : {
        title : 'Success',
        description : 'Work Experience added Successfully',
        type : 'success'
    },
    DELETE_EDUCATION_DETAIL : {
        title : 'Success',
        description : 'Education Detail deleted Successfully',
        type : 'success'
    },
    DELETE_ASSIGNMENT : {
        title : 'Success',
        description : 'Assignment deleted Successfully',
        type : 'success'
    },
    DELETE_WORK_EXPERIENCE : {
        title : 'Success',
        description : 'Work Experience deleted Successfully',
        type : 'success'
    },

    UPDATE_EDUCATION_DETAIL : {
        title : 'Success',
        description : 'Education Detail updated Successfully',
        type : 'success'
    },
    UPDATE_ASSIGNMENT : {
        title : 'Success',
        description : 'Assignment updated Successfully',
        type : 'success'
    },
    UPDATE_WORK_EXPERIENCE : {
        title : 'Success',
        description : 'Work Experience updated Successfully',
        type : 'success'
    },
} 