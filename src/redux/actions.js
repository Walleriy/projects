import {ASYNC_INC, CHANGE_THEME, DEC, DISABLE_BUTTONS, ENABLE_BUTTONS, INC} from "./types";

export function increment() {
    return {
        type: INC
    }
}

export function decrement() {
    return {
        type: DEC
    }
}

export function asyncIcrement() {
    return function (dispatch) {
        dispatch(disableButtons())
        setTimeout(() => {
            dispatch({ type: ASYNC_INC })
            dispatch(enableButtons())
        }, 700)
    }
}

export function changeTheme(newTheme) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}

export function enableButtons() {
    return {
        type: ENABLE_BUTTONS
    }
}

export function disableButtons() {
    return {
        type: DISABLE_BUTTONS
    }
}
