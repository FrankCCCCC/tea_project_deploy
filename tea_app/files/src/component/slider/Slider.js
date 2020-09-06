import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {caption_title_style, caption_subtitle_style} from '../theme/font'
import Carousel from '../carousel/Carousel'
import './Slider.css'
import './VideoSlider.css'

// @sliderInput = [{
//     media: 'media_url string',
//     caption_title: 'string',
//     caption_subtitle: 'string'
//     link: 'string'
// }];
// @is_show_indicator = 'boolean';
// @is_show_control = 'boolean';

/**
 * @param {Array} sliderInput - The parameter to set up the slider
 * @param {String} sliderInput[].media - The media URL of each slider
 * @param {String} sliderInput[].caption_title - The caption title of each slider
 * @param {String} sliderInput[].caption_subtitle - The caption subtitle of each slider
 * @param {String} sliderInput[].link - The hyper link of each slider, click to go
 * @param {Boolean} is_show_indicator - Control whether to show indicator below
 * @param {Boolean} is_show_control - Control whether to show controler on the right and left side
 */

function Slider(props){

    if(!Array.isArray(props.sliderInput)){
        console.log("Error sliderInput is not array")
        // throw "Error sliderInput is not array";
        return -1;
    }
    var carouselInput = props.sliderInput.map(
        (item, index, array) => {
            var captions_html = (
                <div class="carousel-caption d-none d-md-block" style={{textAlign: "left"}}>
                    <h2 class="display-4" style={caption_title_style}>{item.caption_title}</h2>
                    <p class="lead" style={caption_subtitle_style}>{item.caption_subtitle}</p>
                </div>)
            return {
                media: item.media,
                backgroundColor: '',
                html_content: captions_html,
                link: item.link
            }
        }
    )

    return (
        <div data-aos="fade-up">
            <Carousel carouselInput = {carouselInput} is_show_indicator = {props.is_show_indicator} is_show_control = {props.is_show_control} opacity = {props.opacity}/>
        </div>
    )
}

export default Slider;