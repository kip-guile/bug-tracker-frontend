import * as actionTypes from '../actionTypes'

const initialState = []
const initialAssignedState = []

export function bugReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ALL_BUGS:
            return action.payload

        default:
            return state
    }
}

export function assignedBugReducer (state = initialAssignedState, action) {
    switch (action.type) {
        case actionTypes.GET_ASSIGNED_BUGS:
            return action.payload

        default:
            return state
    }
}