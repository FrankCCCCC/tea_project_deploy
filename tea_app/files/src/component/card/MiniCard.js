import React from 'react'

import {Link} from 'react-router-dom';
import Color from '../theme/color'
import {font_style} from '../theme/font'
import Shape from '../theme/Shape'

/**
 * @param {Integer} uuid
 * @param {String} background - The background property of the card
 * @param {String} mask
 * @param {String} opacity
 * @param {Html} top
 * @param {Html} head
 * @param {Html} title
 * @param {Html} subtitle
 * @param {String} horizontal_align - The horizotal alignment of the elements in the card. Options: left, center, right
 * @param {String} vertical_align - The vetical alignment of the elements in the card. Options: top, middle, bottom
 * @param {String} min_width - The min-width property of the card
 * @param {String} min_height - The min-height property of the card
 * @param {String} link - The hyper link for click events
 */

class MiniCard extends React.Component {
    constructor(props) {
        super(props)
        let empty = <div></div>
        this.state = {
            uuid: 0,
            background: "",
            mask: "rgba(255, 255, 255, 0.3)",
            opacity: "0",
            top: empty,
            head: empty,
            title: empty,
            subtitle: empty,
            horizontal_align: "right",
            vertical_align: "middle",
            min_width: "100%",
            min_height: "100%", 
            link: ""
        }
    }

    // makeItem(i, background, top, head, title, subtitle, horizontal_align, vertical_align, minHeight, minWidth){
    //     console.log(background)
    //     return (
    //         // <div key={i} style={{margin: "1rem", backgroundColor: Color.blueDark, borderRadius: "20px", display: "inline-block", boxShadow: "5px 5px 20px grey", minHeight: "5rem", minWidth: "20rem"}}>
    //         <div key={i} style={{display: "inline-block"}}>
    //             <div key={i} style={{display: "table", background: background, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", boxShadow: "5px 5px 20px grey", minWidth: minWidth, minHeight: minHeight, borderRadius: "20px", display: "inline-block"}}>
    //                 <div style={{display: "table-cell", tableLayout: "auto", minWidth: minWidth, minHeight: minHeight, verticalAlign: vertical_align, textAlign: horizontal_align, padding: "3rem", backgroundColor: "rgba(255, 255, 255, 0.3)", borderRadius: "20px", fontFamily: font_style.fontFamily}}>
    //                     <div style={{}}>
    //                         {top}
    //                         {/* <img src={Facebook}></img> */}
    //                         {head}
    //                     </div>
    //                     <div style={{marginTop: "1rem"}}>
    //                         <h5 style={{color: Color.white, fontFamily: font_style.fontFamily, fontWeight: "bold", marginBottom: "2px"}}>{title}</h5>
    //                         <span style={{color: Color.greyLight, fontFamily: font_style.fontFamily, fontSize: "1rem", marginBottom: "2px", textAlign: "right"}}>{subtitle}</span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    componentDidMount() {
        this.setState({
            uuid: this.props.uuid === undefined ? 0 : this.props.uuid, 
            background: this.props.background, 
            mask: this.props.mask,
            opacity: this.props.opacity,
            top: this.props.top, 
            head: this.props.head, 
            title: this.props.title, 
            subtitle: this.props.subtitle, 
            horizontal_align: this.props.horizontal_align === undefined ? "left" : this.props.horizontal_align,
            vertical_align: this.props.vertical_align === undefined ? "middle" : this.props.vertical_align, 
            min_height: this.props.min_height === undefined ? "100%" : this.props.min_height, 
            min_width: this.props.min_width === undefined ? "100%" : this.props.min_width,
            link: this.props.link === undefined ? "" : this.props.link
        })
    }

    render(){
        return (
            // <div key={i} style={{margin: "1rem", backgroundColor: Color.blueDark, borderRadius: "20px", display: "inline-block", boxShadow: "5px 5px 20px grey", minHeight: "5rem", minWidth: "20rem"}}>
            <div data-aos="fade-up" key={this.state.uuid} style={{background: this.props.background, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", boxShadow: Shape.box_shadow, minWidth: this.state.min_width, minHeight: this.state.min_height, borderRadius: Shape.round_corner, display: "inline-block", opacity: this.state.opacity, margin: "1rem"}} href={this.state.link}>
                <div style={{display: "table", minWidth: this.props.min_width, minHeight: this.props.min_height, backgroundColor: this.state.mask, borderRadius: Shape.round_corner}}>
                    <div style={{display: "table-cell", tableLayout: "fixed", verticalAlign: this.state.vertical_align, textAlign: this.state.horizontal_align}}>
                        <div style={{padding: "3rem", fontFamily: font_style.fontFamily}}>
                                <div style={{}}>
                                    {this.state.top}
                                    {/* <img src={Facebook}></img> */}
                                    {this.state.head}
                                </div>
                                <div style={{marginTop: "1rem"}}>
                                    {this.state.title}
                                    {this.state.subtitle}
                                    {/* <h5 style={{fontFamily: font_style.fontFamily, fontWeight: "bold", marginBottom: "2px"}}>{this.state.title}</h5> */}
                                    {/* <span style={{fontFamily: font_style.fontFamily, fontSize: "1rem", marginBottom: "2px"}}>{this.state.subtitle}</span> */}
                                </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default MiniCard