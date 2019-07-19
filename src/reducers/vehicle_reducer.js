import {
    SET_LOADING,
    UNSET_LOADING,
    SET_ERROR,
    SET_VEHICLES,
    SET_FILTERED_VEHICLES,
    SET_VEHICLE
} from '../actions/types';

const INITIAL_STATE = {
    vehiclesList: [],
    vehiclesFilteredList: [],
    selectedVehicle: {},
    error: null,
    loading: false,
};

const vehiclesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: true, error: null };
        case UNSET_LOADING:
            return { ...state, loading: false, error: null };
        case SET_ERROR:
            return { ...state, loading: false, error: action.payload };
        case SET_VEHICLES:
            return { 
                ...state,
                vehiclesList: action.payload
            };
        case SET_FILTERED_VEHICLES:
            return { 
                ...state,
                vehiclesFilteredList: action.payload
            };
        case SET_VEHICLE:
            return { 
                ...state,
                selectedVehicle: action.payload
            };
        default:
            return state;
    }
};

export default vehiclesReducer;
