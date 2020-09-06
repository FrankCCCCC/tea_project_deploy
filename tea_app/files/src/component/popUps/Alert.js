import React from 'react'

import {font_style} from '../theme/font'
import Color from '../theme/color'
import Shape from '../theme/Shape'
import X from '../img/x-grey-dark.svg'
import {popUpSubscribe, popUpGetState, popUpAddPopUp, popUpDeletePopUp} from './PopUpAction'
import $ from 'jquery'

/**
 * @param {String} title - The title of the toast
 * @param {String} message - The message of the toast
 * @param {Integer} delay - The display duration for the toast
 * @param {Boolean} is_auto_hide - Whether the toast hide automatically
 * @param {Boolean} is_cancelable - Whether the toast can be canceled manually
 */

export class Alert extends React.Component{
    constructor(props){
        super(props)
        this.handleAlertChange = this.handleAlertChange.bind(this)

        this.state = {
            pop_up: (<div></div>),
            pop_up_detail: []
        }
    }

    handleAlertChange(){
        let store_content = popUpGetState().pop_up
        // console.log(popUpGetState())
        // console.log(store_content)
        let pop_up_list = (<div></div>)
        let pop_up_list_detail = []
        if(store_content !== undefined && store_content !== []){
            pop_up_list = store_content.map((item, index, array) => {
                return (
                    item.pop_up
                )
            })

            pop_up_list_detail = store_content.map((item, index, array) => {
                return (
                    item
                )
            })
        }
        this.setState({
            pop_up: pop_up_list,
            pop_up_detail: pop_up_list_detail
        })
        
    }

    componentDidMount(){
        popUpSubscribe(this.handleAlertChange)
        
        let pop_up_detail = this.state.pop_up_detail
        console.log(pop_up_detail)
        if(Array.isArray(pop_up_detail)){
            for(let item in pop_up_detail){
                console.log(item)
                setTimeout(()  => {popUpDeletePopUp(item.id)}, item.delay)
            }
        }
        
    }

    componentDidUpdate(prevProps, prevState, snapshot){}

    render(){
        return (
            <div style={{display: "table", position: "fixed", bottom: "3rem", right: "3rem", zIndex: 100}}>
                <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center"}}>
                    {this.state.pop_up}
                </div>
            </div>
            // Taost Position
            // <div aria-live="polite" aria-atomic="true" style={{position: "fixed", minHeight: "200px", width: "100%", zIndex: 100}}>
            //     <div style={{top: "100%", right: "1rem", width: "30rem"}}>
            //         {/* Taost instance */}
            //         {pop_up_list}
            //     </div>
            // </div>
            )
    }
}

/**
 * 
 * @param {String} title - The title of the alert
 * @param {Sting} message - The message of the alert
 * @param {Number} delay - The delay in milliseconds of the alert
 */

export function makeAlert(title, message, delay) {
    let alert = (
        <div class={`alert`} role="alert" style={{color: Color.grey, background: Color.greenLight, borderRadius: Shape.round_corner, boxShadow: `5px 5px 20px ${Color.greenLight}`, fontFamily: font_style.fontFamily, fontSize: "1rem", fontWeight: "bold"}}>
            <strong>{title}</strong>{message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" style={{marginLeft: "2rem"}}>
                <img src={X} style={{width: "0.8rem", height: "0.8rem"}}/>
            </button>
        </div>
    )
    let id = Date.now()
    popUpAddPopUp(id, alert, delay)

    return id
}

// popUpSubscribe(Alert)

// export function Alert(props) {
//     let store_content = popUpGetState().pop_up
//     console.log(popUpGetState())
//     console.log(store_content)
//     let pop_up_list = (<div></div>)
//     if(store_content !== undefined && store_content !== []){
//         pop_up_list = store_content.map((item, index, array) => {
//             return (
//                 item.pop_up
//             )
//         })
//     }
//     return (
//         <div style={{display: "table", position: "fixed", bottom: "3rem", right: "3rem", zIndex: 100}}>
//             <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center"}}>
//                 {pop_up_list}
//             </div>
//         </div>
//         // Taost Position
//         // <div aria-live="polite" aria-atomic="true" style={{position: "fixed", minHeight: "200px", width: "100%", zIndex: 100}}>
//         //     <div style={{top: "100%", right: "1rem", width: "30rem"}}>
//         //         {/* Taost instance */}
//         //         {pop_up_list}
//         //     </div>
//         // </div>
//         )
// }

// Alert.defaultProps = {
//     delay: 5000,
//     is_auto_hide: true,
//     is_cancelable: true
// }

// export default Alert