import React from 'react';
import fb_icon from '../img/facebook.svg';
import ig_icon from '../img/instagram.svg';
import fb_icon_dark from '../img/facebook_dark.svg';
import ig_icon_dark from '../img/instagram_dark.svg';
import {ig_link, fb_link} from '../theme/text'
import {mini_caption} from '../theme/font'

function Footer(){

    return(
        <div style={mini_caption}>
            <nav class="navbar navbar-light bg-light variant-light">
              <a class="" href="#" style={{color: "grey"}}>2019@Leafhopper</a>
                <ul class="navbar-nav ml-auto">
                </ul>
                    <a class="nav-link" href="#">
                        <img src={fb_icon_dark} style={{width: "1.5rem", height: "1.5rem", color: ""}}></img>
                    </a>
                    <a class="nav-link" href="#">
                        <img src={ig_icon_dark} style={{width: "1.5rem", height: "1.5rem", color: ""}}></img>
                    </a>
            </nav>
        </div>
        // <div>
        //     <div class="container">
        //         <div class="row justify-contnent-md-center">
        //             <div class="col col-lg-6">
        //                 <p>2019@Leafhopper All Right Reserved</p>
        //             </div>
        //             <div class="col col-lg-1">
        //                 <i href={fb_link}>
        //                     <img src={fb_icon} style={{width: "1.5rem", height: "1.5rem", color: ""}}></img>
        //                 </i>
        //             </div>
        //             <div class="col col-lg-1">
        //                 <i href={fb_link}>
        //                     <img src={ig_icon} style={{width: "1.5rem", height: "1.5rem", color: ""}}></img>
        //                 </i>
        //             </div>
        //         </div>

        //     </div>
        // </div>
    );
}

export default Footer;