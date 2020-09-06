import React from 'react'
import {font_style} from '../theme/font';
import Color from '../theme/color'
import Shape from '../theme/Shape'

export const ButtonPillarBlueDark = (props) => {
    return (
        <button class="btn" onClick={props.handleClick} style={{fontFamily: font_style.fontFamily, fontSize: "1rem" , width: "7rem", color: "white",backgroundColor: Color.colorBlueDarkShape.box_shadow}}>{props.text}</button>
    )
}