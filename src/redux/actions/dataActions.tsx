import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM} from '../types/actionTypes/data'
import {LOADING_UI, SET_ERRORS, CLEAR_ERRORS} from '../types/actionTypes/ui';
import {Dispatch} from '../types';
import axios from 'axios';

//Get all Screams
export const getScreams = () => (dispacth : Dispatch) => {
    dispacth({type: LOADING_DATA});

    axios.get('/screams')
        .then( res => {
            dispacth({
                type:SET_SCREAMS,
                payload: res.data
            })
        })
        .catch((error) => {
            dispacth({
                type:SET_SCREAMS,
                payload: []
            })
        })
};

//PostScream
export const postScream = (newScream: any) => (dispatch: Dispatch) => {
    dispatch({type: LOADING_UI})

    axios.post('/scream', newScream)
        .then(res => {
            dispatch({
                type:POST_SCREAM,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS})
        })
        .catch(error => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            })
        })

};

// Like a Scream
export const likeScream = (screamId : string) => (dispatch: Dispatch) => {

    axios.get(`/scream/${screamId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(error => console.log(error) )
};

// Unlike a Scream
export const unlikeScream = (screamId : string) => (dispatch: Dispatch) => {

    axios.get(`/scream/${screamId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(error => console.log(error) )
};

//Delete Scream
export const deleteScream = (screamId: string) => (dispatch: Dispatch) => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM, 
                payload: screamId})
        })
        .catch(error => console.log(error))
};