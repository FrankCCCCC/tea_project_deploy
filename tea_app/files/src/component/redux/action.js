import {cart_store, info_store} from './store'
import {action_add_item,
    action_delete_item,
    action_clear_cart,
    action_increase_quantity_by_1,
    action_decrease_quantity_by_1,
    action_set_quantity,
    action_set_info} from './init'

export const cartSubscribe = (funct) => {
    cart_store.subscribe(funct)
}

/**
 * @param {Integer} id - The origin item ID
 * @param {String} img - The cover image of the item
 * @param {String} name - The name of the item
 * @param {String} sell_type - The selling type of the item
 * @param {Integer} quantity - The order quantity of the item
 * @param {Number} price - The price of the item
 * @param {String} unit - The unit of the price
 */
export const cartAddItem = (id, img, name, sell_type, quantity, price, unit) => {
    cart_store.dispatch({type: action_add_item, id: id, img: img, name: name, sell_type: sell_type, quantity: quantity, price: price, unit: unit});
}

export const cartDeleteItem = (list_id) => {
    cart_store.dispatch({type: action_delete_item, list_id: list_id})
}

export const cartClearCart = () => {
    cart_store.dispatch({type: action_clear_cart})
}

export const cartIncreaseQuantityBy1 = (list_id) => {
    cart_store.dispatch({type: action_increase_quantity_by_1, list_id: list_id})
}

export const cartDecreaseQuantityBy1 = (list_id) => {
    cart_store.dispatch({type: action_decrease_quantity_by_1, list_id: list_id})
}

export const cartSetQuantity = (list_id, quantity) => {
    cart_store.dispatch({type: action_set_quantity, list_id: list_id, quantity: quantity})
}

export const cartGetState = () => {
    return cart_store.getState()
}

export const cartGetItemNumber = () => {
    return cart_store.getState()
}

export const infoSetInfo = (key, value) => {
    info_store.dispatch({type: action_set_info, key: key, value: value})
}

export const infoGetState = () => {
    // console.log(info_store.getState())
    return info_store.getState()
}

function test(){
    console.log(cart_store.getState())
}

// cart_store.subscribe(test)

// cartAddItem(1, "http://localhost:5000/img/tea.jpg", "林氏傳統凍頂烏龍茶", "pre_sale", 1, 300, "NTD")
// cartAddItem(2, "http://localhost:5000/img/tea.jpg", "陳氏傳統東方美人茶", "in_stock", 2, 250, "NTD")
// cartAddItem(3, "Test Oolong3", 3)
// cartDeleteItem(2, "Test Oolong2")
// cartSetQuantity(3, "Test Oolong3", 5)
// cartIncreaseQuantityBy1(1, "Test Oolong1")
// cartDecreaseQuantityBy1(3, "Test Oolong3")
// cartDecreaseQuantityBy1(3, "Test Oolong3")
// cartClearCart()

// cart_store.dispatch({type: action_add_item, id: 1, name: "Test Oolong1", quantity: 1})
// console.log(cart_store.getState())

// infoSetInfo('first_name', 'Dai')
// console.log(infoGetState())