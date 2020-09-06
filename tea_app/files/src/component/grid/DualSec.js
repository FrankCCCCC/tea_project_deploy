import React from 'react'

/**
 * @param {Boolean} is_reverse - Whether swap the position of left and right params
 * @param {Html} left - The content on the left side
 * @param {Html} right - The content on the right side
 */

// class DualSec extends React.Component{
//     constructor(props){
//         super(props)
//     }

//     componentDidMount(){}

//     shouldComponentUpdate(nextProps, nextState){}

//     componentDidUpdate(prevProps, prevState, snapshot){}

//     render(){
//         return (
//             <div class={`row ${this.props.is_reverse? "flex-row-reverse" : "flex-row"} align-items-center`} style={{height:"100%"}}>
//                 <div class="col-lg-6" style={{textAlign: "center", verticalAlign: "middle", padding: ""}}>
//                     {this.props.left}
//                 </div>
//                 <div class="col-lg-6" style={{height: "100%", padding: 0}}>
//                     {this.props.right}
//                 </div>
//             </div>
//         )
//     }
// }

function DualSec(props) {
    return (
        <div style={{display: 'flex', width: "100%", height:"100%"}}>
            <div style={{height: "100%", padding: 0}}>
                {props.left}
            </div>
            <div style={{height: "100%", padding: 0}}>
                {props.right}
            </div>
        </div>
    )
}

export default DualSec