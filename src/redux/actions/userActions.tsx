import {SET_USER, SET_UNAUTHENTICATED, LOADING_USER } from '../types/actionTypes/user';
import {LOADING_UI, SET_ERRORS, CLEAR_ERRORS} from '../types/actionTypes/ui';
import axios from 'axios';

//Types
import {Dispatch, UserData, NewUserData} from '../types';
import {History} from 'history';


export const loginUser = (userData : UserData, history: History) => (dispatch : Dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/login', userData)
            .then(res => {

                setAuthorizationHeader(res.data.token);
                
                dispatch(getUserData() as any)
                dispatch({type: CLEAR_ERRORS})
                history.push('/')
            })
            .catch((err) => {
                
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
}

export const signupUser = (newUserData : NewUserData, history: History) => (dispatch : Dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/signup', newUserData)
            .then(res => {

                setAuthorizationHeader(res.data.token);
                
                dispatch(getUserData() as any)
                dispatch({type: CLEAR_ERRORS})
                history.push('/')
            })
            .catch((err) => {
                
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
}

export const logoutUser = () => (dispatch:Dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
}

export const getUserData = () => (dispatch: Dispatch) => {
    dispatch({type: LOADING_USER})
    axios.get('/user')
        .then( res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((error) => console.log(error));
}

const setAuthorizationHeader = (token: string) => {
    const FBIdToken = `Bearer ${token}`;
                localStorage.setItem('FBIdToken', FBIdToken);
                axios.defaults.headers.common['Authorization'] = FBIdToken
}