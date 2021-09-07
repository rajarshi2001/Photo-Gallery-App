import { LoginTypes } from "../types/constants"

export const getphotos = (photos) =>{
    return{
        type: LoginTypes.GET_PHOTOS,
        payload: photos
    }
}

export const addphotos = (photo) => {
    return{
        type: LoginTypes.ADD_PHOTOS,
        payload: photo
    }
}

export const delphotos = (photo_id) =>{
    return{
        type: LoginTypes.DEL_PHOTOS,
        payload: photo_id
    }
}