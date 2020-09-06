import React from 'react'

import {assertArray, assertString} from '../util/Util'

/**
 * @param {Object[]} items - Array of elements in asymmetric grid
 * @param {String} flex_direction -
 * @param {String} flex_wrap -
 * @param {String} justify_content -content-
 * @param {String} align_items - 
 * @param {String} align_content - 
 */

// class Grid extends React.Component{
//     constructor(props){
//         super(props)
//         // this.mapPropToState = this.mapPropToState.bind(this)
//         if(!Array.isArray(this.props.items)){
//             console.log("Error Grid items is not array")
//             throw "Error Grid items is not array";
//             return -1;
//         }
//         this.state = this.mapPropToState(props, this.state)
//     }

//     mapPropToState(props, state){
//         return {
//             items: props.items,
//             flex_direction: props.flex_direction === undefined? "row" : props.flex_direction,
//             flex_wrap: props.flex_wrap === undefined? "wrap" : props.flex_wrap,
//             justify_content: props.justify_content === undefined? "center" : props.justify_content,
//             align_items: props.align_items === undefined? "stretch" : props.align_items,
//             align_content: props.align_content === undefined? "stretch" : props.align_content,
//             prevProps: props
//         }
//     }

//     componentDidMount(){}

//     shouldComponentUpdate(nextProps, nextState){}

//     componentDidUpdate(prevProps, prevState, snapshot){
//         if(this.props !== prevProps){
//             this.setState(this.mapPropToState(this.props, this.state))
//         }
//     }

//     render(){
//         return (
//             <div style={{display: "flex", minWidth: "100%", flexDirection: this.state.flex_direction, flexWrap: this.state.flex_wrap, justifyContent: this.state.justify_content, alignItems: this.state.align_items, alignContent: this.state.align_content}}>
//                 {this.state.items}
//             </div>
//         )
//     }
// }

function FlexGrid(props) {
    assertArray(props.items)
    assertString(props.flex_direction)
    assertString(props.flex_wrap)
    assertString(props.justify_content)
    assertString(props.align_items)
    assertString(props.align_content)

    return (
        <div style={{display: "flex", minWidth: "100%", flexDirection: props.flex_direction, flexWrap: props.flex_wrap, justifyContent: props.justify_content, alignItems: props.align_items, alignContent: props.align_content}}>
            {props.items}
        </div>
    )
}

FlexGrid.defaultProps = {
    flex_direction: "row", 
    flex_wrap: "wrap", 
    justify_content: "center", 
    align_items: "stretch", 
    align_content: "stretch"
}

export default FlexGrid