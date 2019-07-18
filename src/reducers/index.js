import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import vehicleReducer from './vehicle_reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    vehicle: vehicleReducer
});

export default rootReducer;