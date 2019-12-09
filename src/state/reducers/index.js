import {combineReducers} from 'redux';
import counterReducer from "./counterReducer";
import projectReducer from './projectReducer';
import userReducer from './usersReducer';
import * as bugReducer from './bugReducer';


const rootReducer = combineReducers({
    count: counterReducer,
    projects: projectReducer,
    users: userReducer,
    bugs: bugReducer.bugReducer,
    assignedBugs: bugReducer.assignedBugReducer
});

export default rootReducer;