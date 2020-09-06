import {createStore} from 'redux'
import {cartReducer, infoReducer, combineReducer} from './reducer'

var cart_store = createStore(cartReducer)
var info_store = createStore(infoReducer)
var combine_store = createStore(combineReducer)

window.cart_store = cart_store
window.info_store = info_store
window.combine_store = combine_store

export {cart_store, info_store, combine_store}
// export default cart_stores