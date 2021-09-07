import { LoginTypes } from "../types/constants"

export const geterrors = (errors) =>{
    return{
        type: LoginTypes.GET_ERRORS,
        payload: errors
    }
}