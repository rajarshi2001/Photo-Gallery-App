import { LoginTypes } from "../types/constants";

const {GET_ERRORS} = LoginTypes
const initialState = {
    allerror:{

    }
}

export const error = (state=initialState, action) =>{
    switch(action.type){
        case GET_ERRORS:
            return{
                ...state,
                allerror: action.payload
            }
        default: 
            return state
    }
}