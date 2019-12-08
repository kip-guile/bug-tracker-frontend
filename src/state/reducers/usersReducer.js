import * as actionTypes from '../actionTypes'

const initialState = []

export default function userReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USERS:
            return action.payload

        default:
            return state
    }
}