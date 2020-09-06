import React from 'react'
import Carousel from '../carousel/Carousel'
import {font_style} from '../theme/font'
import Color from '../theme/color'
import {Head5} from '../typography/Typography'

/**
 * @param {String} text - Quote text
 * @param {String} backgroundColor - Background color code
 * @param {String} link - Hyper link activate on click
 */

function Quote(props){
    var html_content = (
        <div style={{display: 'table', width: '100%', height: '100%'}}>
            <div style={{display: 'table-cell', width: '100%', textAlign: 'center', verticalAlign: 'middle'}}>
                {/* <h2 style={{color: Color.blueDark, fontSize: '4rem', fontFamily: font_style.fontFamily, fontWeight: "bold", textAlign: 'center'}}>{props.text}</h2> */}
                <Head5 text={props.text} font_weight={"bold"}/>
            </div>
        </div>
    )
    var carouselInput = [{
        media: "http://localhost:5000/img/tea_tree.jpg",
        backgroundColor: 'rgba(150,150,150,1)',
        html_content: html_content,
        link: '',
    }]

    return (
        // <div style={{backgroundColor: "white", boxShadow: "1px 1px 5px grey", border: "", borderRadius: '20px', width: "100%", height: "100%", padding: "3rem", display: "table"}}>
            // <div style={{display: "table-cell", verticalAlign: "middle", textAlign: "center"}}>
                
                <a href={props.link}>
                    <div style={{fontFamily: font_style.fontFamily, fontWeight: "bold", opacity: props.opacity, padding: "1rem"}}>
                        {html_content}
                    </div>
                </a>
                
            // </div>
            // {/* <Carousel carouselInput = {carouselInput} is_show_indicator = {false} is_show_control = {false} opacity = {1}/> */}
        // </div>
    )
}

export default Quote