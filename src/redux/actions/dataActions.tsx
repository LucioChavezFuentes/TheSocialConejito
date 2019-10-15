import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM} from '../types/actionTypes/data'
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
}

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
}


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
}