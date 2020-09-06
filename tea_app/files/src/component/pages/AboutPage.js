import React from 'react'
import {useSpring} from 'react-spring'
import {AnimateNumber} from '../animate/Animate'
import Toast from '../toast/Toast'
import {Head1, Head2, Head3, Head4, Head5, Head6} from '../typography/Typography'
import {Alert, makeAlert} from '../popUps/Alert'
import {popUpAddPopUp} from '../popUps/PopUpAction'

import {font_style} from '../theme/font'
import Color from '../theme/color'

function AboutPage(props){
    // makeAlert("TestTitle", "TestMessage", 3)
    return (
        <div>
            
            {/* <div style={{paddingTop: "3rem"}}></div>
            <AnimateNumber number={5}/>
            <h1 style={{fontFamily: font_style.fontFamily, color: props.color}}>這是 Head1</h1>
            <Head1 text="這是 Head1"/>
            <h2 style={{fontFamily: font_style.fontFamily, color: props.color}}>這是 Head2</h2>
            <Head2 text="這是 Head2"/>
            <h3 style={{fontFamily: font_style.fontFamily, color: props.color}}>這是 Head3</h3>
            <Head3 text="這是 Head3"/>
            <h4 style={{fontFamily: font_style.fontFamily, color: props.color}}>這是 Head4</h4>
            <Head4 text="這是 Head4"/>
            <h5 style={{fontFamily: font_style.fontFamily, color: props.color}}>這是 Head5</h5>
            <Head5 text="這是 Head5"/>
            <h6 style={{fontFamily: font_style.fontFamily, color: props.color}}>這是 Head6</h6>
            <Head6 text="這是 Head6"/> */}


        </div>
    )
}

export default AboutPage