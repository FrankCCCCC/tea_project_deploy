import React from 'react';

import Color from '../theme/color'
import Slider from '../slider/Slider'
import HeroTitle from '../hero_title/HeroTitle'
import Gallery from '../gallery/Gallery'
import FlexGrid from '../grid/FlexGrid'
import AsymmetricGrid from '../grid/AsymmetricGrid'
import Quote from '../quote/Quote'
import MiniCard from '../card/MiniCard'
import {fetchAppDataByProperty} from '../fetch/fetchAppData'
import LoadingPage from '../pages/LoadingPage'
import {hero_title_home, hero_paragraph_home} from '../theme/text';

import Farmer3 from '../img/farmer3.jpg'
import Hill1 from '../img/hill1.jpg'
import Hill2 from '../img/hill2.jpg'

class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            is_loaded: false
        }
    }

    makeCards(){
        let cards = []
        cards[0] = <MiniCard uuid={0} background={`url(${Farmer3})`} top={<h5 style={{color: Color.white}}>每年約有</h5>} head={<h1 style={{color: Color.white, letterSpacing: "0.3rem"}}>5 位</h1>} title={<h5 style={{color: Color.white}}>茶農轉作四季豆</h5>} min_height={"20rem"} min_width={"20rem"} mask={"rgba(0, 0, 0, 0.3)"}/>
        cards[1] = <MiniCard uuid={1} background={`url(${Hill1})`} top={<h5 style={{color: Color.white}}>在台灣</h5>} head={<h1 style={{color: Color.white, letterSpacing: "0.3rem"}}>3 倍</h1>} title={<h5 style={{color: Color.white}}>四季豆利潤比茶葉高出</h5>} min_height={"20rem"} min_width={"20rem"} mask={"rgba(0, 0, 0, 0.3)"}/>
        cards[3] = <MiniCard uuid={1} background={`url(${Hill2})`} top={<h5 style={{color: Color.white}}>但市面上卻有</h5>} head={<h1 style={{color: Color.white, letterSpacing: "0.3rem"}}>90%</h1>} title={<h5 style={{color: Color.white}}>的台灣茶是假的</h5>} min_height={"20rem"} min_width={"20rem"} mask={"rgba(0, 0, 0, 0.3)"}/>

        return (
            <FlexGrid items={cards}/>
        )
    }

    makeItems(array){
        return array.map((item, index, array) => {
            return <Gallery uuid={index} id={item.id} catergory={item.catergory} img={item.img} caption_title={item.caption_title} caption_subtitle={item.caption_subtitle} title={item.title} subtitle={item.subtitle} badge={item.badge} route={"item"}/>
        })
    }

    fetchLoader(){
        let loadSlider = fetchAppDataByProperty('home_slider').then(
            (resolve) => {
                // console.log(resolve)
                this.setState({
                    sliderInput: resolve[0].data
                })
            }
        ).catch(
            (reject) => {
                console.log(reject)
            }
        )

        let loadGallery = fetchAppDataByProperty('home_gallery').then(
            (resolve) => {
                // console.log(resolve)
                this.setState({
                    galleryInput: this.makeItems(resolve[0].data)
                })
            }
        ).catch(
            (reject) => {
                console.log(reject)
            }
        )

        return [loadSlider, loadGallery]
    }

    componentDidMount(){
        Promise.all(this.fetchLoader()).then(
            (resolve) => {
                this.setState({
                    is_loaded: true
                })
            }
        ).catch(
            (reject) => {
                console.log(reject)
            }
        )
    }

    render(){
        return (
        <div>
            {this.state.is_loaded?
                <div>
                    <Slider sliderInput = {this.state.sliderInput} is_show_indicator = {true} is_show_control = {true}/>
                    {/* <div class="container" style={{margin: "2rem"}}>
                        <Quote media="http://localhost:5000/img/tea_tree.jpg" backgroundColor="rgba(150,150,150,1)" html_content={<h3 style={{color: Color.blueDark}}>"賣茶葉賺大錢的方法也不是沒有，但是茶葉這東西，生我養我的，我做不到"</h3>}/>
                    </div> */}
                    <HeroTitle title={"凍頂烏龍茶  正在消逝"} paragraph={"茶葉生存的最後危機"}/>
                    <div class="container">
                        {this.makeCards()}
                    </div>
                    <HeroTitle title={hero_title_home} paragraph={hero_paragraph_home}/>
                    <div class="container">
                        <AsymmetricGrid items={this.state.galleryInput} column_count={3} column_width={"2rem"} column_width={"20rem"}/>
                    </div>
                </div> :
                <LoadingPage/>
            }
        </div>
        );
    }
}

export default HomePage;
