import { LoginTypes } from "../types/constants"

const initialState = {
    photos: []
}

export const gallery = (state=initialState, action) =>{
    switch(action.type){
        case LoginTypes.GET_PHOTOS:
            return {
                ...state,
                photos: action.payload
            }
        case LoginTypes.ADD_PHOTOS:
            return{
                ...state,
                photos: [...state.photos, action.payload]
            }
        case LoginTypes.DEL_PHOTOS:
            return{
                ...state,
                photos: state.photos.filter((currItem)=>{
                    return currItem.id !== action.payload
                })
            }
        default: 
            return state
    }
}