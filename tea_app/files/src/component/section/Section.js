import React from 'react';
import {font_style, title_style, subtitle_style, paragraph_style} from '../theme/font';
import Gallery from '../gallery/Gallery'
import MiniCard from '../card/MiniCard'
import FlexGrid from '../grid/FlexGrid'
import Carousel from '../carousel/Carousel'
import Content from '../content/Content'
import {ButtonPillarBlueDark} from '../button/Button'
import {cartAddItem, cartGetState} from '../redux/action'
import './Section.css';
import Color from '../theme/color'
import Shape from '../theme/Shape'
import ShoppingCart from '../img/shopping_cart.svg'
// const sectionInput = {
//     title: "林氏傳統凍頂烏龍茶",
//     subtitle: "在瞬息萬變的現代 傳承百年的好味道",
//     paragraph: `製茶過程獨特之處在於：
//     凍頂烏龍茶的採制工藝十分講究，採摘青心烏龍等良種芽葉，經曬青、涼青、浪青、炒青、揉捻、初烘、多次反復的團揉(包揉)、復烘、再焙火而製成。
//     尤其茶葉烘乾後需再重複以布包成球狀揉捻茶葉，使其成半發酵、半球狀，稱為「布揉製茶」或「熱團揉」。揉捻後，茶葉帶有隱隱金黃色。
//     傳統古典凍頂烏龍茶帶明顯焙火味。
     
//     最優秀的凍頂烏龍茶又稱鳳茶，為當地存放十年以上的好茶，在古時最尊貴富人家婚禮上奉獻給父母喝！以表尊敬與地位上的尊貴。
     
//     「林氏傳統古典凍頂烏龍茶」，歷經無數次高低起伏的炭火淬煉焙製，冰火輪迴、起伏滋味，門外兵馬、壺中水沸。烘焙過程中，稍有閃失，不是炭焦味，就是失去好茶韻味，可謂舉棋，起手無回。其迭有層次的風韻，把杯，無酒也醉，足可讓您拋開人生成敗起伏，休兵楚河漢界。`,
//     img: 'http://192.168.43.203:5000/img/farmer2.jpg',
//     is_reverse: true
// };

// var props = {
//     sectionInput: sectionInput
// };

/**
 * @param {Integer} id - The ID of the the section for the list
 * @param {Integer} uuid - The ID of the the section for React to identify
 * @param {String} title - The title of the content in the section
 * @param {String} subtitle - The subtitle of the content in the section
 * @param {String} paragraph - The paragraph of the content in the section
 * @param {String} img - The img of the section
 * @param {Boolean} is_reverse - Whether the content and the image swap
 * @param {Object} extra - The data and index of the content in the section
 */

function Section(props){
    let classVar = `row ${props.is_reverse? "flex-row-reverse" : "flex-row"} align-items-center`;
    return(
        <div data-aos="fade-up">
            <div class={classVar} style={{height:"100%"}}>
                <div class="col-lg-6" style={{textAlign: "center", verticalAlign: "middle", padding: ""}}>
                    <div style={{textAlign: "left", color: "grey", padding: "3rem"}}>
                        <Content title={props.title} subtitle={props.subtitle} paragraph={props.paragraph}/>
                        <div style={{marginTop: "2rem"}}>
                            {props.extra}
                        </div>
                    </div>
                    
                </div>
                <div class="col-lg-6" style={{height: "100%", padding: 0}}>
                    {/* <div class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            <div class="carousel-item active section" style={{backgroundImage: "url("+ props.img +")", width: "100%"}}>
                            </div>
                        </div>
                    </div> */}
                    <div style={{width: "80%", margin: "auto"}}>
                        <MiniCard uuid={props.id} background={`url(${props.img})`} min_height={"70vh"} min_width={"100%"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section;