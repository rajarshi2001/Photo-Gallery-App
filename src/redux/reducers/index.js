import {combineReducers} from 'redux'
import { auth } from './auth'
import { error } from './error'
import { gallery } from './gallery'


const reducer = combineReducers({
    gallery: gallery,
    auth: auth,
    error: error,
})

export default reducer