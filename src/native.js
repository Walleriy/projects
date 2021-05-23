import './styles.css'

const counter = document.querySelector('#counter')
const addBtn = document.querySelector('#add')
const subBtn = document.querySelector('#sub')
const asyncBtn = document.querySelector('#async')
const themeBtn = document.querySelector('#theme')

let state = 0


function render() {
    counter.textContent = state.toString()
}

addBtn.addEventListener('click', () => {
    state = state + 1
    render()
})
subBtn.addEventListener('click', () => {
    state = state - 1
    render()
})
asyncBtn.addEventListener('click', () => {
    setTimeout(()=> {
        state = state + 1
        render()
    }, 2000)
    state = state - 1
    render()
})
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark')
})

render()
