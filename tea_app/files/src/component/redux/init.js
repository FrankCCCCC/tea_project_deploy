export const cart_init_state = {
    cart: [],
    total_price: 0,
    unit: "",
    total_number: 0
}

export const info_init_state = {
    info: {
        name: "",
        phone_number: "",
        email: "",
        zip: "",
        county: "",
        township: "",
        road: "",
        agree_receive_notice: true,
        agree_privacy_term: false
    }
}

export const action_add_item = "Add_Item"
export const action_delete_item = "Delete_Item"
export const action_clear_cart = "Clear_Cart"
export const action_increase_quantity_by_1 = "Increase_Quantity_By_1"
export const action_decrease_quantity_by_1 = "Decrease_Quantity_By_1"
export const action_set_quantity = "Set_Quantity"

export const action_set_info = "Set_Info"