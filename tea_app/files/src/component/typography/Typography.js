import React from 'react'

import Color from '../theme/color'
import {font_style} from '../theme/font'


/**
 * 
 * @param {String} weight - The weight of the font. Options: light, regular, medium, bold, bolder, heavy
 */
function weightConvert(weight){
    if(weight === 'regular') return 
}

/**
 * 
 * @param {String} text - The text of the header
 * @param {String} color - The font color of the header
 * @param {String} font_weight -The font weight of the header
 * @param {String} letter_spacing - the space between the letters  of the header
 */
export function Head1(props) {
    return (
        <div style={{fontSize: "calc(2rem + 1vw)", letterSpacing: props.letter_spacing, fontFamily: font_style.fontFamily, color: props.color, fontWeight: props.font_weight, wordWrap: 'break-word'}}>
            {props.text}
        </div>
    )
}
Head1.defaultProps = {
    text: "",
    color: Color.greyDark,
    font_weight: "normal", 
    letter_spacing: "normal",
}

export function Head2(props) {
    return (
        <div style={{ fontSize: "calc(1.8rem + 0.9vw)", letterSpacing: props.letter_spacing, fontFamily: font_style.fontFamily, color: props.color, fontWeight: props.font_weight, wordWrap: 'break-word'}}>
            {props.text}
        </div>
    )   
}

Head2.defaultProps = {
    text: "",
    color: Color.greyDark,
    font_weight: "normal", 
    letter_spacing: "normal",
}

/**
 * 
 * @param {String} text - The text of the header
 * @param {String} color - The font color of the header
 * @param {String} font_weight -The font weight of the header
 * @param {String} letter_spacing - the space between the letters  of the header
 */
export function Head3(props) {
    return (
        <div style={{ fontSize: "calc(1.6rem + 0.8vw)", letterSpacing: props.letter_spacing, fontFamily: font_style.fontFamily, color: props.color, fontWeight: props.font_weight, wordWrap: 'break-word'}}>
            {props.text}
        </div>
    )   
}

Head3.defaultProps = {
    text: "",
    color: Color.greyDark,
    font_weight: "normal", 
    letter_spacing: "normal",
}

export function Head4(props) {
    return (
        <div style={{ fontSize: "calc(1.4rem + 0.7vw)", letterSpacing: props.letter_spacing, fontFamily: font_style.fontFamily, color: props.color, fontWeight: props.font_weight, wordWrap: 'break-word'}}>
            {props.text}
        </div>
    )   
}
Head4.defaultProps = {
    text: "",
    color: Color.greyDark,
    font_weight: "normal", 
    letter_spacing: "normal",
}

export function Head5(props) {
    return (
        <div style={{ fontSize: "calc(1.2rem + 0.6vw)", letterSpacing: props.letter_spacing, fontFamily: font_style.fontFamily, color: props.color, fontWeight: props.font_weight, wordWrap: 'break-word'}}>
            {props.text}
        </div>
    )   
}
Head5.defaultProps = {
    text: "",
    color: Color.greyDark,
    font_weight: "normal", 
    letter_spacing: "normal",
}

export function Head6(props) {
    return (
        <div style={{ fontSize: "calc(1rem + 0.5vw)", letterSpacing: props.letter_spacing, fontFamily: font_style.fontFamily, color: props.color, fontWeight: props.font_weight, wordWrap: 'break-word'}}>
            {props.text}
        </div>
    )   
}
Head6.defaultProps = {
    text: "",
    color: Color.greyDark,
    font_weight: "normal", 
    letter_spacing: "normal",
}