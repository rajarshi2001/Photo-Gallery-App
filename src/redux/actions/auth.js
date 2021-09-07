import { LoginTypes } from "../types/constants"


export const loginsuccess = (logusers) =>{
    return{
        type: LoginTypes.LOGIN_SUCCESS,
        payload: logusers
    }
}

export const loaduser = (getusers) =>{
    return{
        type: LoginTypes.USER_LOADED,
        payload: getusers
    }
}

export const logoutsuccess = () =>{
    return{
        type: LoginTypes.LOGOUT_SUCCESS,
    }
}
