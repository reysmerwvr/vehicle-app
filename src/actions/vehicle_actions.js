import axios from 'axios';
import { handleError, 
    retrieveActionCreator, 
    defaultErrorMessage 
} from '../helpers/general';
import {
    SET_LOADING,
    UNSET_LOADING,
    SET_ERROR,
    SET_VEHICLE,
    SET_FILTERED_VEHICLES,
    SET_VEHICLES
} from './types';
import history from '../helpers/history';

const envVars = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_CONTENT_TYPE_HEADER: process.env.REACT_APP_CONTENT_TYPE_HEADER
};

let errorMessage = defaultErrorMessage;

export const getVehicles = () => {
    return function (dispatch) {
        dispatch({ type: SET_LOADING });
        axios({
            method: 'get',
            url: `${envVars.REACT_APP_API_URL}/vehicles`,
            headers: {
                'Content-Type': envVars.REACT_APP_CONTENT_TYPE_HEADER,
                Authorization: localStorage.getItem('token')
            }
        }).then((response) => {
            dispatch({ type: UNSET_LOADING });
            const vehiclesResponse = response.data.data;
            dispatch(retrieveActionCreator(SET_VEHICLES, vehiclesResponse));
        }).catch((error) => {
            handleError(error);
            if (error !== undefined) {
                const errorResponse = error.response.data;
                if (errorResponse) {
                    errorMessage = errorResponse.message
                }
            }
            dispatch(retrieveActionCreator(SET_ERROR, errorMessage));
        });
    };
};

export const getVehicle = (id) => {
    return function (dispatch) {
        dispatch({ type: SET_LOADING });
        axios({
            method: 'get',
            url: `${envVars.REACT_APP_API_URL}/vehicles/${id}`,
            headers: {
                'Content-Type': envVars.REACT_APP_CONTENT_TYPE_HEADER,
                Authorization: localStorage.getItem('token')
            }
        }).then((response) => {
            dispatch({ type: UNSET_LOADING });
            const vehicleResponse = response.data.data;
            dispatch(retrieveActionCreator(SET_VEHICLE, vehicleResponse));
        }).catch((error) => {
            handleError(error);
            if (error !== undefined) {
                const errorResponse = error.response.data;
                if (errorResponse) {
                    errorMessage = errorResponse.message
                }
            }
            dispatch(retrieveActionCreator(SET_ERROR, errorMessage));
        });
    };
};

export const storeVehicle = (data) => {
    data.photo = 'https://via.placeholder.com/300x200';
    return function (dispatch) {
        dispatch({ type: SET_LOADING });
        axios({
            method: 'post',
            url: `${envVars.REACT_APP_API_URL}/vehicles`,
            headers: {
                'Content-Type': envVars.REACT_APP_CONTENT_TYPE_HEADER,
                Authorization: localStorage.getItem('token')
            },
            data
        }).then((response) => {
            dispatch({ type: UNSET_LOADING });
            const vehicleResponse = response.data.data;
            dispatch(retrieveActionCreator(SET_VEHICLE, vehicleResponse));
            history.push('/vehicles');
        }).catch((error) => {
            handleError(error);
            if (error !== undefined) {
                const errorResponse = error.response.data;
                if (errorResponse) {
                    errorMessage = errorResponse.message
                }
            }
            dispatch(retrieveActionCreator(SET_ERROR, errorMessage));
        });
    };
}

export const updateVehicle = (id, data) => {
    return function (dispatch) {
        dispatch({ type: SET_LOADING });
        axios({
            method: 'put',
            url: `${envVars.REACT_APP_API_URL}/vehicles/${id}`,
            headers: {
                'Content-Type': envVars.REACT_APP_CONTENT_TYPE_HEADER,
                Authorization: localStorage.getItem('token')
            },
            data
        }).then((response) => {
            dispatch({ type: UNSET_LOADING });
            const vehicleResponse = response.data.data;
            dispatch(retrieveActionCreator(SET_VEHICLE, vehicleResponse));
        }).catch((error) => {
            handleError(error);
            if (error !== undefined) {
                const errorResponse = error.response.data;
                if (errorResponse) {
                    errorMessage = errorResponse.message
                }
            }
            dispatch(retrieveActionCreator(SET_ERROR, errorMessage));
        });
    };
}

export const deleteVehicle = (id) => {
    return function (dispatch) {
        dispatch({ type: SET_LOADING });
        axios({
            method: 'delete',
            url: `${envVars.REACT_APP_API_URL}/vehicles/${id}`,
            headers: {
                'Content-Type': envVars.REACT_APP_CONTENT_TYPE_HEADER,
                Authorization: localStorage.getItem('token')
            }
        }).then(() => {
            dispatch({ type: UNSET_LOADING });
            history.push('/vehicles');
        }).catch((error) => {
            handleError(error);
            if (error !== undefined) {
                const errorResponse = error.response.data;
                if (errorResponse) {
                    errorMessage = errorResponse.message
                }
            }
            dispatch(retrieveActionCreator(SET_ERROR, errorMessage));
        });
    };
}

export const setFilteredVehicles = (payload) => {
    return function (dispatch) {
        dispatch(retrieveActionCreator(SET_FILTERED_VEHICLES, payload));
    };
};

export const selectVehicle = (payload) => {
    return function (dispatch) {
        dispatch(retrieveActionCreator(SET_VEHICLE, payload));
    };
};