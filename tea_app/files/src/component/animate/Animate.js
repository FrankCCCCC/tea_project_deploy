import React from 'react';
import {useSpring, animated} from 'react-spring'
import {Spring} from 'react-spring/renderprops'

function AnimateNumber(props){
    return (
        <Spring from={{ number: 0 }} to={{ number: props.number}} delay={2000}> 
            {props => <span>{props.number.toFixed(1)}</span>}
        </Spring>
    )
}

export {AnimateNumber}