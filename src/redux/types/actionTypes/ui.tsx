export const SET_ERRORS = 'SET_ERRORS';
export const LOADING_UI = 'LOADING_UI';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export interface SET_ERRORS {
    type: typeof SET_ERRORS;
    payload: any
}

export interface LOADING_UI {
    type: typeof LOADING_UI
}

export interface CLEAR_ERRORS {
    type: typeof CLEAR_ERRORS
} 

type UiActions = SET_ERRORS | LOADING_UI | CLEAR_ERRORS

export default UiActions