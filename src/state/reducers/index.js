import {combineReducers} from 'redux';
import counterReducer from "./counterReducer";
import projectReducer from './projectReducer';


const rootReducer = combineReducers({
    count: counterReducer,
    projects: projectReducer
});

export default rootReducer;