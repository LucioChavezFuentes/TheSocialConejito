import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER } from '../types/actionTypes/user';
import { Action } from '../types';

//Types
interface UserReducer {
    authenticated: boolean;
    credentials: any;
    likes: any[];
    notifications: any[];
    loading: boolean;
}


const initialState : UserReducer = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
}

export default function(state = initialState, action: Action) : UserReducer {
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState;
            
        case SET_USER:
            return {
                loading: false,
                authenticated: true,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    };
};