import {LOADING_UI, SET_ERRORS, CLEAR_ERRORS} from '../types/actionTypes/ui';
import { Action } from '../types';

const initialState = {
    loading: false,
    errors: {}
}

export default function( state = initialState, action: Action) {
    switch(action.type){
        case LOADING_UI:
            return {
                ...state,
                loading: true,

            }
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: {}
            }
        default:
            return state
    }
}