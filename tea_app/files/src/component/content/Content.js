import React from 'react'
import {assertString, assertObject} from '../util/Util'
import {font_style} from '../theme/font'
import Color from '../theme/color'

/**
 * @param {String} title - The title of the content
 * @param {String} bar_color - The color of the solid bar
 * @param {Html Object} subtitle - The subtitle of the content
 * @param {Html Object} paragraph - The paragraph of the content
 */

function Content(props) { 
    assertString(props.title)
    assertString(props.bar_color)
    assertObject(props.subtitle)
    assertObject(props.paragraph)

    return (
        <div style={{ width: "100%", height:"100%"}}>
            <h3 style={{marginBottom: "0rem", fontFamily: font_style.fontFamily, fontWeight: "bold"}}>{props.title}</h3>
            <div style={{marginBottom: "1rem", height: "0.2rem", width: "5rem", backgroundColor: props.bar_color}}></div>
                <div style={{marginBottom: "0.3rem", fontFamily: font_style.fontFamily}}>{props.subtitle}</div>
                <div style={{fontFamily: font_style.fontFamily, fontSize: "1rem"}}>{props.paragraph}</div>
        </div>
    )
}

Content.defaultProps = {
    bar_color: Color.greenDark
}

export default Content