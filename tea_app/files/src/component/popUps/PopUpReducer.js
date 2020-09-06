import React from 'react'
import {pop_up_init_state, 
        pop_up_limit, 
        action_add_pop_up, 
        action_delete_pop_up, 
        action_pop_pop_up, 
        action_clear_pop_up} from './PopUpInit'
import { combineReducers } from 'redux'

export const popUpReducer = (state = pop_up_init_state, action) => {
    let current_pop_up = state.pop_up
    let re = {}
    console.log(current_pop_up)
    console.log(action)
    switch(action.type){
        case(action_add_pop_up):
            while(current_pop_up.length >= pop_up_limit){
                current_pop_up.shift()
            }
            current_pop_up.push({id: action.id, pop_up: action.pop_up, delay: action.delay})
            re = {
                pop_up: current_pop_up
            }
            return re
        case(action_delete_pop_up):
        current_pop_up = state.pop_up
            for(let i=0; i<current_pop_up.length; i++){
                console.log(i, Number(action.id))
                if(i === Number(action.id)){
                    console.log(i, Number(action.id))
                    current_pop_up.splice(i, 1);
                }
            }
            
            re = {
                pop_up: current_pop_up
            }
            console.log(current_pop_up)
            return re
        case(action_pop_pop_up): 
            current_pop_up.shift()
            re = {
                pop_ups: current_pop_up
            }
            return re
        case(action_clear_pop_up):
            re = {
                pop_ups: (<div></div>)
            }
        default:
            return state
    }
}


// export const combineReducer = combineReducers({cart: cartReducer, info: infoReducer})