import React from 'react'
import Color from '../theme/color'
import {font_style} from '../theme/font'
import Shape from '../theme/Shape'

/**
 * 
 * @param {string} color - The background color of the badge
 * @param {string} text - The text of the badge
 */
export const Badge = (props) => {
    return (
        <span class="badge" style={{backgroundColor: props.color}}>{props.text}</span>
    )
}

/**
 * 
 * @param {String} backgroundColor - The background color of the pill badge
 * @param {String} textColor - The text color of the pill badge
 * @param {String} text - The text of the pill badge
 */
export const PillBadge = (props) => {
    return (
        <span style={{paddingTop: "0.2rem", paddingBottom: "0.2rem", paddingLeft: "0.4rem", paddingRight: "0.4rem", borderRadius: Shape.half_circle, fontSize: "0.8rem", fontFamily: font_style.fontFamily, fontWeight: 'bold', backgroundColor: props.backgroundColor, color: props.textColor}}>{props.text}</span>
    )
}

PillBadge.defaultProps = {
    textColor: Color.white,
    backgroundColor: Color.yellowHightLight
}