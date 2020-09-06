import React from 'react';
import {font_style} from '../theme/font';
import Color from '../theme/color'
import Shape from '../theme/Shape'

/**
 * @param {String} placeholder - The hint message to display in the text field before typing
 * @param {String} input_name - Name of the input field
 * @param {String} label - Label for the input field
 * @param {Function} handle_on_change - Function to call when the input field changes
 * @param {String} pattern - The regex pattern to match the input
 * @param {String} invalid_feedback - The error message when the input is invalid
 * @param {Boolean} is_required - Whether add required field tag
 */

function TextBox(props){
    let for_id = `validation_${props.input_name}`
    // console.log(props.pattern)
    if(props.is_required){
        return (
            <div>
                <label for={for_id} style={{fontFamily: font_style.fontFamily, color: Color.grey, fontWeight: "bold", paddingLeft: "1.5rem"}}>{props.label}</label>
                <input style={{background:"", border: `2px solid ${Color.greyLight}`, borderRadius: Shape.round_corner, paddingTop: "0.3rem", paddingBottom: "0.3rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", color: Color.grey, fontFamily: font_style.fontFamily, fontWeight: "bold"}} type="text" name={props.input_name} pattern={props.pattern} class="form-control" id={for_id} onChange={props.handle_on_change} placeholder={props.placeholder} value={props.value} required/>
                <div class="invalid-feedback" style={{fontFamily: font_style.fontFamily, fontSize: "0.8rem", fontWeight: "bold", paddingLeft: "1.5rem"}}>{props.invalid_feedback}</div>
            </div>
        )
    }else{
        return (
            <div>
                <label for={for_id} style={{fontFamily: font_style.fontFamily, color: Color.greyDark, fontWeight: "bold", paddingLeft: "1.5rem"}}>{props.label}</label>
                <input style={{background:"", border: `2px solid ${Color.blueLight}`, borderRadius: Shape.round_corner, paddingTop: "0.3rem", paddingBottom: "0.3rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", color: Color.greenDark, fontFamily: font_style.fontFamily, fontWeight: "bold"}} type="text" name={props.input_name} pattern={props.pattern} class="form-control" id={for_id} onChange={props.handle_on_change} placeholder={props.placeholder} value={props.value}/>
                <div class="invalid-feedback">{props.invalid_feedback}</div>
            </div>
        )
    }
}

export default TextBox