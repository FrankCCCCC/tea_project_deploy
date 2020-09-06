import React from 'react'
import {font_style, hero_title_style, hero_paragraph_style} from '../theme/font'
import Color from '../theme/color'
import {Head1, Head2, Head6} from '../typography/Typography'

/**
 * @param {String} title - The title of the hero object
 * @param {String} paragraph - The paragraph subtitle of the hero object
 */


 function HeroTitle(props){
    return (
        <div data-aos="fade-up" class="" style={{backgroundColor: Color.white, textAlign: "left", marginTop: "4rem", marginBottom: "4rem"}}>
            <div class="container">
                <Head1 text={props.title}/>
                <Head6 text={props.paragraph}/>
            </div>
        </div>
    );
 }
// class HeroTitle extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             title: this.props.title,
//             paragraph: this.props.paragraph
//         }
//     }

//     componentDidMount(){
//         this.setState({
//             title: this.props.title,
//             paragraph: this.props.paragraph
//         })
//     }

//     // componentDidUpdate(){
//     //     if(this.state !== this.props){
//     //         this.setState({
//     //             title: this.props.title,
//     //             paragraph: this.props.paragraph
//     //         })
//     //     }
//     // }

//     render(){
//         return (
//             <div class="jumbotron jumbotron-fluid" style={{backgroundColor: Color.white, textAlign: "left", margin: "0px"}}>
//                 <div class="container">
//                     <h1 class="display-4" style={{fontFamily: font_style.fontFamily, color: Color.greyDark}}><strong>{this.state.title}</strong></h1>
//                     <p class="lead" style={{fontFamily: font_style.fontFamily, color: Color.greyDark}}><strong>{this.state.paragraph}</strong></p>
//                 </div>
//             </div>
//         );
//     }
// }

export default HeroTitle;