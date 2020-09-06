import React from 'react';
import {Link, Switch, Route, useParams, useRouteMatch} from 'react-router-dom';
import {font_style} from '../theme/font';
import {PillBadge} from '../badge/Badge'
import Color from '../theme/color'

/**
* @param {String} uuid - The UUID of the item to distinguish for ReactDOM
* @param {Integer} id - The identification number of items
* @param {String} catergory - The categories of items
* @param {String} img - The cover image of the item
* @param {String} caption_title - The title caption of the image
* @param {String} caption_subtitle - The subtitle caption of the image
* @param {String} title - The title of the item
* @param {String} subtitle - The subtitle of the item
* @param {String} badge - The badge of the item
* @param {String} route - The URL route that added to current URL and it would direct to the page of link
*/

class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: []
        }
    }

    makeItem(i, id, img, caption_title, caption_subtitle, route, title, subtitle, badge){
        return (
            <div data-aos="fade-up" key={i} style={{marginBottom: "1rem", display: "inline-block"}}>
                <Link to={`${route}/${id}`}>
                    <div style={{position: "relative", textAlign: "", color: "white"}}>
                        <img class="img-fluid" src={img} alt="Card image cap" style={{width: "100%", borderRadius: "20px", boxShadow: "5px 5px 20px grey"}}/>
                        <div style={{position: "absolute", bottom: "0rem", right: "0rem", width: "100%", height: "100%", background: "linear-gradient(to top, rgba(0,0,0,0.9), 5rem, rgba(0,0,0,0))", borderRadius: "20px"}}>
                            <div style={{position: "absolute", bottom: "0rem", right: "0rem", width: "100%", paddingRight: "0.5rem", paddingLeft: "1rem", marginBottom: "1rem"}}>
                                <div style={{textAlign: "left"}}>
                                    <h5 style={{fontWeight: "bold", marginBottom: "0.2rem"}}>{caption_title}</h5>
                                    <span style={{fontSize: "1rem", marginBottom: "0.2rem", textAlign: "right"}}>{caption_subtitle}</span>
                                </div>
                            </div>
                            <div style={{position: "absolute", top: "0.7rem", right: "1rem"}}>
                                <span style={{textAlign: "right"}}>
                                    {/* <PillBadge color={Color.yellowHightLight} text={"預售"}/> */}
                                    {badge}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
                <div style={{width: "100%", paddingTop: "1rem", paddingRight: "0rem", paddingLeft: "0rem", marginBottom: "0rem"}}>
                    <div style={{textAlign: "left", marginLeft: "1rem"}}>
                        <h5 style={{fontWeight: "bold", color: Color.greyDark, marginBottom: "0.2rem"}}>{title}</h5>
                        <span style={{color: Color.grey}}>{subtitle}</span>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.setState({
            content: this.makeItem(this.props.uuid, this.props.id, this.props.img, this.props.caption_title, this.props.caption_subtitle, this.props.route, this.props.title, this.props.subtitle, this.props.badge)
        })
        // console.log(this.state.content)
    }

    componentDidUpdate(prevProps, prevState, snapshot){
    }

    render(){
        
        return (
            <div style={font_style}>
                {this.state.content}
            </div>
        );
    }
}

export default Gallery;