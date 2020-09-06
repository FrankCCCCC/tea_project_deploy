import {createStore} from 'redux'
import {popUpReducer} from './PopUpReducer'

var pop_up_store = createStore(popUpReducer)

window.pop_up_store = pop_up_store

export {pop_up_store}