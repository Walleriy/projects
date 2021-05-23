import './styles.css'
import thunk from 'redux-thunk'
import {applyMiddleware, compose, createStore} from "redux";
import logger from 'redux-logger'
import {rootReducer} from "./redux/rootReducer";
import {asyncIcrement, changeTheme, decrement, disableButtons, increment} from "./redux/actions";
import {ASYNC_INC} from "./redux/types";

const counter = document.querySelector('#counter')
const addBtn = document.querySelector('#add')
const subBtn = document.querySelector('#sub')
const asyncBtn = document.querySelector('#async')
const themeBtn = document.querySelector('#theme')

function logger2 (state) {
    return function (next) {
        return function (action) {
            console.log('Prev state', state.getState())
            console.log('Action', action)
            const newState = next(action)
            console.log('New state', state.getState())
            return newState
        }
    }
}

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, logger2, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})
subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})
asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIcrement())
})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
    store.dispatch(changeTheme(newTheme))
})


store.subscribe(() => {
    const state = store.getState()

    counter.textContent = state.counter
    document.body.className = state.theme.value;

    [addBtn, subBtn, asyncBtn].forEach(btn => {
        btn.disabled = state.theme.disabled
    })
})

store.dispatch({ type: 'INIT_APPLICATION' })
