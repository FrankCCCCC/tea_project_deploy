import React from 'react';
import {useRouteMatch, Link} from 'react-router-dom'
import {caption_subtitle_style, caption_title_style} from '../theme/font'

function VideoSlide(props) {
    if(!Array.isArray(props.videoSliderInput)){
        console.log("Error videoSliderInput is not array")
        throw "Error videoSliderInput is not array";
        return -1;
    }

    var content = []
    let {path, url} = useRouteMatch();
    for(let i=0; i<props.videoSliderInput.length; i++){
        if(i==0){var classA = "carousel-item active video_slider";}
        else{var classA = "carousel-item video_slider";}
        content.push(
            <div class={classA}>
                {/* <Link to={`${url}post/${props.videoSliderInput[i].id}`}> */}
                <a  href={props.videoSliderInput[i].link}>
                {/* style={{width: "100%", height: "100%"}} */}
                    <div>
                        <video class="video-fluid" autoPlay loop muted style={{width: "100%"}}>
                            <source src={props.videoSliderInput[i].video} type="video/mp4"/>
                        </video>
                        <div class="carousel-caption d-none d-md-block" style={{textAlign: "left"}}>
                            <h2 class="display-4" style={caption_title_style}>{props.videoSliderInput[i].caption_title}</h2>
                            <p class="lead" style={caption_subtitle_style}>{props.videoSliderInput[i].caption_subtitle}</p>
                        </div>
                    </div>
                </a>
                    
                {/* </Link> */}
            </div>  
        );
    }

    return (
        <div>
            <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel" style={{height: 'auto', minHeight: 'auto'}}>
                {props.is_show_indicator?
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol> : ""}
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

export default VideoSlide;