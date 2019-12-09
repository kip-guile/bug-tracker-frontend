import * as types from './actionTypes'
import AxiosAuth from '../AxiosAuth/AxiosAuth'

export function increment(){
    return {type: types.INCREMENT}
}

export function decrement (){
    return {type: types.DECREMENT}
}

export function reset(){
    return {type: types.RESET}
}

export const getProjects = () => dispatch => {
    AxiosAuth()
    .get('http://localhost:8000/api/projects/')
    .then(res => {
        dispatch({type: types.GET_PROJECTS, payload: res.data})
    })
    .catch(err => {
        console.log(err.message)
    })
}

export const getUsers = () => dispatch => {
    AxiosAuth()
    .get('http://localhost:8000/api/users/')
    .then(res => {
        dispatch({type: types.GET_USERS, payload: res.data})
    })
    .catch(err => {
        console.log(err.message)
    })
}

export const getBugs = () => dispatch => {
    AxiosAuth()
    .get('http://localhost:8000/api/unassigned')
    .then(res => {
        dispatch({type: types.GET_ALL_BUGS, payload: res.data})
    })
    .catch(err => {
        console.log(err.message)
    })
}

export const getAssignedBugs = () => dispatch => {
    AxiosAuth()
    .get('http://localhost:8000/api/bugs')
    .then(res => {
        dispatch({type: types.GET_ASSIGNED_BUGS, payload: res.data})
    })
    .catch(err => {
        console.log(err.message)
    })
}