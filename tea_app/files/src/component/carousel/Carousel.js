import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {caption_title_style, caption_subtitle_style} from '../theme/font'
import './Carousel.css'

/**
 * @param {Object[]} carouselInput - The object array of Carousel
 * @param {String} carouselInput[].media - The backgraound image of item
 * @param {String} carouselInput[].backgroundColor - The backgraound color of item
 * @param {String} carouselInput[].html_content - The html content inner carousel of item
 * @param {String} carouselInput[].link - The hyper link of item
 * @param {Number} opacity - The backgraound color opacity of item
 * @param {Boolean} is_show_control - Is show left, right controlor
 * @param {Boolean} is_show_indicator - Is show indicator
 */

function Carousel(props){
    if(!Array.isArray(props.carouselInput)){
        console.log("Error carouselInput is not array")
        throw "Error carouselInput is not array";
        return -1;
    }

    var content = []
    var indicators = []
    // let {path, url} = useRouteMatch();
    console.log(props.carouselInput)
    for(let i=0; i<props.carouselInput.length; i++){
        if(props.is_show_indicator === true){
            indicators.push(
                <li data-target="#carouselExampleIndicators" data-slide-to={`${i}`} class={i===0? "active" : ""}></li>
            )
        }

        if(i==0){var classA = "carousel-item active";}
        else{var classA = "carousel-item";}

        let spilit_array = ''
        let media_format = ''
        if(props.carouselInput[i].media !== undefined && props.carouselInput[i].media !== null){
            spilit_array = props.carouselInput[i].media.split('.')
            media_format = spilit_array[spilit_array.length-1]
        }
        
        if(media_format === 'jpg' || media_format === 'png' || media_format === 'svg'|| media_format === 'gif' || media_format === ''){
            content.push(
                <div class={classA + " carousel"} style={{backgroundImage: "url("+ props.carouselInput[i].media +")"}}>
                    {/* <Link to={`${url}post/${props.carouselInput[i].id}`}> */}
                    <a href={props.carouselInput[i].link}>
                        <div style={{height: "100%", width: "100%", backgroundColor: props.carouselInput[i].backgroundColor, opacity: props.opacity}}>
                            {props.carouselInput[i].html_content}
                        </div>
                    </a>
                    {/* </Link> */}
                </div>
            );
        }else if(media_format === 'avi' || media_format === 'mp4'){
            content.push(
                <div class={classA}>
                    <a  href={props.carouselInput[i].link}>
                    {/* style={{width: "100%", height: "100%"}} */}
                        <div>
                            <video class="video-fluid" autoPlay loop muted style={{width: "100%"}}>
                                <source src={props.carouselInput[i].media} type={`video/${media_format}`}/>
                            </video>
                            <div style={{height: "100%", width: "100%", backgroundColor: props.carouselInput[i].backgroundColor, opacity: props.opacity}}>
                                {props.carouselInput[i].html_content}
                            </div>
                        </div>
                    </a>
                </div>
            )
        }
    }



    return (
        <div>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel"  style={{height: 'auto', minHeight: 'auto'}}>
                <ol class="carousel-indicators">
                    {indicators}
                </ol>
                <div class="carousel-inner" role="listbox">
                    {content}
                {props.is_show_control?
                <div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                    : ""}
                </div>
            </div>
        </div>    
    );
}

export default Carousel;