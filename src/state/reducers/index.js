import {combineReducers} from 'redux';
import counterReducer from "./counterReducer";
import projectReducer from './projectReducer';
import userReducer from './usersReducer';


const rootReducer = combineReducers({
    count: counterReducer,
    projects: projectReducer,
    users: userReducer
});

export default rootReducer;