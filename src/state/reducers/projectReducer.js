import * as actionTypes from '../actionTypes'

const initialState = []

export default function projectReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_PROJECTS:
            return action.payload

        default:
            return state
    }
}