import moment from 'moment';
import validator from 'validator';
import users from '../data/users.json';
import { 
    handleError, 
    retrieveActionCreator, 
    defaultErrorMessage 
} from '../helpers/general';
import history from '../helpers/history';
import {
    AUTH_USER,
    AUTH_USER_ERROR,
    AUTH_USER_SUCCESS,
    UNAUTH_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    UNSET_ERROR,
} from './types';

let errorMessage = defaultErrorMessage;

export const signIn = (payload) => {
    return function (dispatch) {
        dispatch({ type: AUTH_USER });
        const { email, password } = payload;
        const user = users.find((user) => {
            return (user.email === email && user.password === password);
        });
        if(user) {
            delete user.password;
            const loginResponse = {
                data: user,
                status: "success",
                message: "OK",
                code: 200,
                error: {}
            };
            dispatch(retrieveActionCreator(AUTH_USER_SUCCESS, loginResponse));
            localStorage.setItem('token', moment.now().toString());
            history.push('/dashboard');
        } else {
            const errorResponse = {
                data: {},
                status: "error",
                message: "Invalid credentials.",
                code: 401,
                error: {
                    message: "Invalid credentials."
                }
            }
            handleError(errorResponse);
            errorMessage = errorResponse.message;
            dispatch(retrieveActionCreator(AUTH_USER_ERROR, errorMessage));
        }
    };
}

export const signUp = (payload) => {
    return function (dispatch) {
        dispatch({ type: REGISTER_USER });
        const { name, email, password, confirmPassword } = payload;
        if(!validator.isEmpty(name) && !validator.isEmpty(email) && password === confirmPassword) {
            const user = { name, email }; 
            const signUpResponse = {
                data: user,
                status: "success",
                message: "OK",
                code: 200,
                error: {}
            };
            dispatch(retrieveActionCreator(REGISTER_USER_SUCCESS, signUpResponse));
            localStorage.setItem('token', moment.now().toString());
            history.push('/dashboard');
        } else {
            const errorResponse = {
                data: {},
                status: "error",
                message: "Error creating user.",
                code: 400,
                error: {
                    message: "Error creating user."
                }
            }
            handleError(errorResponse);
            errorMessage = errorResponse.message;
            dispatch(retrieveActionCreator(REGISTER_USER_ERROR, errorMessage));
        }
    };
};

export const signOut = () => {
    return function (dispatch) {
        dispatch({ type: UNAUTH_USER });
        localStorage.removeItem('token');
        history.push('/login');
    };
};

export const clearError = () => {
    return function (dispatch) {
        dispatch({ type: UNSET_ERROR });
    };
};

