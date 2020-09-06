import React from 'react';
import {font_style} from '../theme/font';
import Color from '../theme/color'

/**
 * @param {String} input_name - Name of the input field
 * @param {String} label - Label for the input field
 * @param {String} color - Color for the the label text
 */

function label(props){
    let for_id = `validation_${props.input_name}`
    return (
        <label for={for_id} style={{fontFamily: font_style.fontFamily, color: props.color === undefined? Color.greyDark : "", fontWeight: "bold"}}>{props.label}</label>
    )
}

export default label