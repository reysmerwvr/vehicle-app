import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_USER_ERROR,
    AUTH_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    UNSET_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    user: null,
    error: null,
    loading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, loading: true, error: null };
        case UNAUTH_USER:
            return { ...state, user: null };
        case AUTH_USER_ERROR:
            return { ...state, loading: false, error: action.payload };
        case AUTH_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case REGISTER_USER:
            return { ...state, loading: true, error: null };
        case REGISTER_USER_ERROR:
            return { ...state, loading: false, error: action.payload };
        case REGISTER_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case UNSET_ERROR:
            return { ...state, loading: false, error: null };
        default:
            return state;
    }
};

export default authReducer;
