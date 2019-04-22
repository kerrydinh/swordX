import { AUTH_ACTION_TYPE } from '../action/authentication';


const initialState = {
    createdAccount: null,
    tokenInfo: null,
    error: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_ACTION_TYPE.SIGN_UP: {
            return {
                ...state,
                createdAccount: action.payload
            };
        }

        case AUTH_ACTION_TYPE.SIGN_UP_SUCCESSFULLY: {
            return {
                ...state,
                tokenInfo: action.payload
            };
        }

        case AUTH_ACTION_TYPE.SIGN_UP_FAILED: {
            return {
                ...state,
                error: action.payload
            };
        }

        case AUTH_ACTION_TYPE.UPDATE_USER_PROFILE: {
            return {
                ...state
            };
        }

        case AUTH_ACTION_TYPE.UPDATE_USER_PROFILE_SUCCESSFULLY: {
            return {
                ...state
            };
        }

        case AUTH_ACTION_TYPE.UPDATE_USER_PROFILE_FAILED: {
            return {
                ...state
            };
        }

        default:
            return state;
    }
}