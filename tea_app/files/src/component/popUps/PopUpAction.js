import React from 'react'
import {pop_up_store} from './PopUpStore'
import {action_add_pop_up, action_delete_pop_up, action_pop_pop_up, action_clear_pop_up} from './PopUpInit'

import {font_style} from '../theme/font'
import Color from '../theme/color'
import Shape from '../theme/Shape'
import X from '../img/x-grey-dark.svg'

export const popUpSubscribe = (funct) => {
    pop_up_store.subscribe(funct)
}

export const popUpAddPopUp = (id, pop_up, delay) => {
    pop_up_store.dispatch({type: action_add_pop_up, id: id, pop_up: pop_up, delay: delay});
}

export const popUpDeletePopUp = (id) => {
    pop_up_store.dispatch({type: action_delete_pop_up, id: id});
}

export const popUpPopPopUp = () => {
    pop_up_store.dispatch({type: action_pop_pop_up})
}

export const popUpClearPopUp = () => {
    pop_up_store.dispatch({type: action_clear_pop_up})
}

export const popUpGetState = () => {
    return pop_up_store.getState()
}

function test(){
    console.log(pop_up_store.getState())
}

pop_up_store.subscribe(test)
var pop_up_test = (
    <div class={`alert`} role="alert" style={{color: Color.grey, background: Color.greenLight, borderRadius: Shape.round_corner, boxShadow: `5px 5px 20px ${Color.greenLight}`, fontFamily: font_style.fontFamily, fontSize: "1rem", fontWeight: "bold"}}>
        <strong>props.title</strong>props.message
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" style={{marginLeft: "2rem"}}>
            <img src={X} style={{width: "0.8rem", height: "0.8rem"}}/>
        </button>
    </div>
)
// popUpAddPopUp(1, pop_up_test, 3)
// popUpAddPopUp(1, pop_up_test, 3)
// popUpAddPopUp(1, pop_up_test, 3)
// popUpAddPopUp(1, pop_up_test, 3)