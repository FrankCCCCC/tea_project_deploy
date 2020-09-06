import React from 'react';
import Slider from '../slider/Slider'
import HeroTitle from '../hero_title/HeroTitle'
import Gallery from '../gallery/Gallery'
import MiniCard from '../card/MiniCard'
import Section from '../section/Section'
import VideoSlide from '../videoSlide/VideoSlider'
import Quote from '../quote/Quote'
import FlexGrid from '../grid/FlexGrid'
import {slide1_caption, slide2_caption, slide3_caption} from '../theme/text'
import Color from '../theme/color'
import Shape from '../theme/Shape'
import {makeAlert} from '../popUps/Alert'
import {font_style, title_style, subtitle_style, paragraph_style} from '../theme/font';
import {cartAddItem, cartGetState} from '../redux/action'
import {fetchItemById} from '../fetch/fetchItem'
import LoadingPage from '../pages/LoadingPage'
import {removeHtmlTag} from '../util/Util'
import {AnimateNumber} from '../animate/Animate'
import {hero_title_item_page_ceritfication, hero_paragraph_item_page_ceritfication, add_to_cart, already_in_cart, alert_add_to_cart} from '../theme/text'

import Hill2 from '../img/hill2.jpg'

class ItemPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            is_loaded: false,
            props_id: Number(this.props.match.params.itemId)
        }
    }

    mapToSlider(imgs){
        return imgs.map((item, index, array) => {
            return {
                id: index,
                media: item,
                caption_title: "",
                caption_subtitle: "",
                link: item
            }
        })
    }
    
    mapToCerti(certis){
        return certis.map((item, index, array) => {
        return <MiniCard uuid={index} background={`url(${Hill2})`} head={<h1 style={{color: Color.white, letterSpacing: "0.3rem"}}>{item.name}</h1>} title={<h5 style={{color: Color.white}}>檢驗合格</h5>} min_width={"10rem"} mask={"rgba(0, 0, 0, 0.3)"}/>
        })
    }
    
    mapDataToPresent(datas){
        let data_list = datas.map((item, index, array) => {

            return (
            <div style={{textAlign: "center"}}>
                <h4 style={{fontWeight: "bold", fontFamily: font_style.fontFamily}}>{item.property}</h4>
                <h1 style={{color: Color.greenDark, fontSize: '3rem', fontFamily: font_style.fontFamily}}><AnimateNumber number={item.index}/><span style={{fontSize: '2rem'}}>{item.unit}</span></h1>
            </div>)
        })
        return <FlexGrid items={data_list} flex_wrap={"nowrap"} justify_content={"space-around"}/>
    }

    makeBuyButton(){
        var handleBuyClick = (event) => {
            cartAddItem(this.state.props.id, this.state.props.cover_img, this.state.props.name, this.state.props.sell_type, 1, this.state.props.price, this.state.props.unit)
            // console.log(cartGetState())
            event.currentTarget.innerHTML = already_in_cart
            event.currentTarget.style.color = Color.greyLight
            event.currentTarget.style.borderColor = Color.greyLight
            event.currentTarget.setAttribute("disabled", "disabled")
            makeAlert(alert_add_to_cart, "", 10000)
          }

        var handleHoverIn = (event) => {
            // console.log("hi")
            event.currentTarget.style.color = Color.greyLight
            event.currentTarget.style.borderColor = Color.greyLight
        }

        var handleHoverOut = (event) => {
            // console.log("hi")
            event.currentTarget.style.color = Color.blueDark
            event.currentTarget.style.borderColor = Color.blueDark
        }
          
        return (
        <button onClick={handleBuyClick.bind(this)} onMouseOver={handleHoverIn.bind(this)} onMouseLeave={handleHoverOut.bind(this)} style={{color: Color.blueDark, border: `2px solid ${Color.blueDark}`, paddingTop: "0.8rem", paddingBottom: "0.8rem", paddingRight: "1.5rem", paddingLeft: "1.5rem", marginTop: "3rem", marginBottom: "3rem", backgroundColor: "rgba(255, 255, 255, 0)", borderRadius: Shape.half_circle, fontFamily: font_style.fontFamily, fontWeight: "bold", fontSize: "1.1rem"}}>
        {/* <div> */}
            {/* <img style={{width: "1.2rem", marginRight: "0.5rem", marginBottom: "0.3rem"}} src={ShoppingCart} /> */}
            {/* <span style={{fontFamily: font_style.fontFamily, fontWeight: "bold", fontSize: "1.1rem"}}>{add_to_cart}</span> */}
            {add_to_cart}
        {/* </div> */}
        </button>)
    }

    componentDidMount(){
        if(typeof(this.state.props_id) != "number"){
            console.log("Error: ItemPage parameter id is not number")
        }
        console.log(this.state.props_id)
        fetchItemById(this.state.props_id).then((resolve) => {
            this.setState({
                is_loaded: true,
                props: resolve
            })
        }).catch((reject) => {console.log(reject)})
    }

    componentDidUpdate(){}

    render(){
        if(this.state.is_loaded){
            console.log(this.state)
            // var handleBuyClick = () => {
            //     // console.log(cartGetState())
            //     cartAddItem(this.state.props.id, this.state.props.cover_img, this.state.props.name, this.state.props.sell_type, 1, this.state.props.price, this.state.props.unit)
            //     // console.log(cartGetState())

            //   }
              
            // var button = (
            // <button onClick={handleBuyClick.bind(this)} style={{color: Color.blueDark, border: `2px solid ${Color.blueDark}`, paddingTop: "0.8rem", paddingBottom: "0.8rem", paddingRight: "1.5rem", paddingLeft: "1.5rem", marginTop: "3rem", marginBottom: "3rem", backgroundColor: "rgba(255, 255, 255, 0)", borderRadius: Shape.half_circle}}>
            // <div>
            //     <img style={{width: "1.2rem", marginRight: "0.5rem", marginBottom: "0.3rem"}} src={ShoppingCart} />
            //     <span style={{fontFamily: font_style.fontFamily, fontWeight: "bold", fontSize: "1.1rem"}}>加入購物車</span>
            // </div>
            // </button>)
        
            var content = this.state.props.content.map((item, index, array) => {
              return <Section id={index} title={item.title} subtitle={item.subtitle} paragraph={removeHtmlTag(item.description)} img={item.img} is_reverse={index % 2 === 0? true : false} extra={this.mapDataToPresent(item.data)}/>
            })

            var description = removeHtmlTag(this.state.props.description)
    
            return (
                <div>
                    <Slider sliderInput = {this.mapToSlider(this.state.props.imgs)} is_show_indicator = {true} is_show_control = {true}/>
                    <div style={{margin: "3rem"}}>
                        <Quote text={`'${this.state.props.slogan}'`} font/>
                    </div>
                    {/* <HeroTitle title={this.state.props.name} paragraph={description}/> */}
                    <Section title={this.state.props.name} paragraph={description} img={this.state.props.cover_img} is_reverse={false} extra={this.makeBuyButton()}/>
                    {content}
                    <HeroTitle title={hero_title_item_page_ceritfication} paragraph={hero_paragraph_item_page_ceritfication}/>
                    <div style={{marginRight: "2rem", marginLeft: "2rem"}}>
                        <FlexGrid items={this.mapToCerti(this.state.props.certification)} justify_content={"left"} flex_wrap={"wrap"}/>
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                    <LoadingPage/>
                </div>
            )
        }
        
    }
}

export default ItemPage;
