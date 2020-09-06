import React from 'react'
import {font_style} from '../theme/font'
import Color from '../theme/color'
import Shape from '../theme/Shape'
import $ from 'jquery'

/**
 * @param {String} title - The title of the toast
 * @param {String} header_img - The header image of the toast
 * @param {String} message - The message of the toast
 * @param {Integer} delay - The display duration for the toast
 * @param {Boolean} is_auto_hide - Whether the toast hide automatically
 * @param {Boolean} is_cancelable - Whether the toast can be canceled manually
 */

function Toast(props) {
    $(document).ready(function(){
        $('.toast').toast('show');
      });
    return (
        // Taost Position
        <div aria-live="polite" aria-atomic="true" style={{position: "relative", minHeight: "200px", width: "100%", zIndex: 100}}>
            <div style={{position: "absolute", top: "100%", right: "0", width: "30rem"}}>
                {/* Taost instance */}
                <div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide={String(props.is_auto_hide)} data-delay={props.delay} style={{boxShadow: Shape.box_shadow, width: "100%", margin: "0px", borderRadius: Shape.round_corner}}>
                    <div class="toast-header">
                        <img src={props.header_img} class="rounded mr-2" style={{borderRadius: Shape.round_corner}}/>
                        <strong class="mr-auto" style={{fontFamily: font_style.fontFamily, fontSize: "1rem"}}>{props.title}</strong>
                        {/* <small>11 mins ago</small> */}
                        {props.cancelable? "" : <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>}
                    </div>
                    <div class="toast-body"  style={{fontFamily: font_style.fontFamily, fontSize: "1rem"}}>
                        {props.message}
                    </div>
                </div>

                <div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide={String(props.is_auto_hide)} data-delay={props.delay} style={{boxShadow: Shape.box_shadow, width: "100%", margin: "0px", borderRadius: Shape.round_corner}}>
                    <div class="toast-header">
                        <img src={props.header_img} class="rounded mr-2" style={{borderRadius: Shape.round_corner}}/>
                        <strong class="mr-auto" style={{fontFamily: font_style.fontFamily, fontSize: "1rem"}}>{props.title}</strong>
                        {/* <small>11 mins ago</small> */}
                        {props.cancelable? "" : <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>}
                    </div>
                    <div class="toast-body"  style={{fontFamily: font_style.fontFamily, fontSize: "1rem"}}>
                        {props.message}
                    </div>
                </div>
            </div>
        </div>
        
        )
}

Toast.defaultProps = {
    delay: 5000,
    is_auto_hide: true,
    is_cancelable: true
}

export default Toast