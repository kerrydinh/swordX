import { AUTH_ACTION_TYPE } from "../action/authentication";
import { ITEM_ACTION_TYPE } from "../action/item";

export function signUp(firebaseService, userData) {
    return (dispatch) => {
        dispatch({ type: AUTH_ACTION_TYPE.SIGN_UP, payload: userData.email })
        firebaseService
            .doCreateUserWithEmailAndPassword(userData.email, userData.password)
            .then(authUser => {
                dispatch({ type: AUTH_ACTION_TYPE.SIGN_UP_SUCCESSFULLY, payload: authUser });
            })
            .catch(error => {
                dispatch({ type: AUTH_ACTION_TYPE.SIGN_UP_FAILED, payload: error })
            })
    }
}

export const loadItems = (firebaseService) => async dispatch => {
    dispatch({ type: ITEM_ACTION_TYPE.LOAD_ITEMS })
    firebaseService
        .fetchData().on("value", snapshot => {
            dispatch({
                type: ITEM_ACTION_TYPE.LOAD_ITEMS_SUCCESSFULLY,
                payload: snapshot.val()
            });
        });
};

export const updateItems = (firebaseService, items) => async dispatch => {
    dispatch({ type: ITEM_ACTION_TYPE.UPDATE_ITEM, payload: {items: items} })
    items.forEach(element => {
        firebaseService
        .updateItem(element.index - 1)
        .set(element);
    });

};
