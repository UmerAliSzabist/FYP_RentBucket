import { LOG_IN, LOG_OUT, VERIFY_USER } from "../actions/Types";

initialState = {
    loggedIn: false,
    token: null,
    expiry: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return { ...state, loggedIn: true, token: action.payload.token, expiry: action.payload.expiry};

        case LOG_OUT:
            return { ...state, loggedIn: false, token: null, expiry: null };

        default:
            return state;
    }
}

export default authReducer;