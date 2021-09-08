import { LoginTypes } from "../types/constants"

const {LOGIN_SUCCESS, LOGOUT_SUCCESS, USER_LOADED, REGISTER_SUCCESS} = LoginTypes
const initialState = {
    isAuthenticated: null,
    token: localStorage.getItem('token'),
    user: null
}


export const auth = (state=initialState, action) =>{
    switch(action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return{
                isAuthenticated: true,
                token: action.payload.token,
                user:action.payload.user
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return{
                isAuthenticated: null,
                token: null,
                user: null
            }
        case USER_LOADED:
            return{
                isAuthenticated: true,
                user: action.payload.det,
                token: action.payload.tokens
            }
        default:
            return state
    }
}