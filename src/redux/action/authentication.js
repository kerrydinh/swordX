export const AUTH_ACTION_TYPE = {
    SIGN_UP: "SIGN_UP",
    SIGN_UP_SUCCESSFULLY: "SIGN_UP_SUCCESSFULLY",
    SIGN_UP_FAILED: "SIGN_UP_FAILED",
    UPDATE_USER_PROFILE: "UPDATE_USER_PROFILE",
    UPDATE_USER_PROFILE_SUCCESSFULLY: "UPDATE_USER_PROFILE_SUCCESSFULLY",
    UPDATE_USER_PROFILE_FAILED: "UPDATE_USER_PROFILE_FAILED"
}


export const signUpAction = data => ({
    type: AUTH_ACTION_TYPE.SIGNUP,
    payload: {
        data
    }
});

export const signUpSuccessfullyAction = data => ({
    type: AUTH_ACTION_TYPE.SIGN_UP_SUCCESSFULLY,
    payload: {
        data
    }
});

export const signUpFailedAction = data => ({
    type: AUTH_ACTION_TYPE.SIGN_UP_FAILED,
    payload: {
        data
    }
});

export const updateUserProfile = data => ({
    type: AUTH_ACTION_TYPE.UPDATE_USER_PROFILE,
    payload: {
        data
    }
});

export const updateUserProfileSuccessfully = data => ({
    type: AUTH_ACTION_TYPE.UPDATE_USER_PROFILE_SUCCESSFULLY,
    payload: {
        data
    }
});

export const updateUserProfileFailed = data => ({
    type: AUTH_ACTION_TYPE.UPDATE_USER_PROFILE_FAILED,
    payload: {
        data
    }
});