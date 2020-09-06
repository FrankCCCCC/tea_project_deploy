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
import ShoppingCart from '../img/shopping_cart.svg'
import {font_style, title_style, subtitle_style, paragraph_style} from '../theme/font';
import {cartAddItem, cartGetState} from '../redux/action'

let data1 = (
<div style={{textAlign: "center"}}>
  <h4 style={{fontWeight: "bold"}}>發酵溫度</h4>
  <h1 style={{color: Color.greenDark, fontSize: '3rem'}}>26.3<span style={{fontSize: '2rem'}}>度</span></h1>
</div>)

let data2 = (<div style={{textAlign: "center" }}>
    <h4 style={{fontWeight: "bold"}}>發酵濕度</h4>
    <h1 style={{color: Color.greenDark, fontSize: '3rem'}}>63<span style={{fontSize: '2rem'}}>%</span></h1>
</div>)

let data = (
    <div style={{color: "grey", fontFamily: font_style.fontFamily, fontWeight: "bold"}}>
        <FlexGrid items={[data1, data2]} flex_wrap={"nowrap"} justify_content="space-around"/>
    </div>
)
  
var sectionInput1 = {
    id: 1,
    title: "曬青、涼青",
    subtitle: "在瞬息萬變的現代 傳承百年的好味道",
    paragraph: `製茶過程獨特之處在於：
    凍頂烏龍茶的採制工藝十分講究，採摘青心烏龍等良種芽葉，經曬青、涼青、浪青、炒青、揉捻、初烘、多次反復的團揉(包揉)、復烘、再焙火而製成`,
    img: 'http://localhost:5000/img/tea_tree.jpg',
    data: [{property: "發酵溫度", index: 26.3, unit: "度"}, {property: "發酵濕度", index: 63, unit: "%"}],
    is_reverse: true
};
var sectionInput2 = {
    id: 2,
    title: "揉捻、初烘",
    subtitle: "在瞬息萬變的現代 傳承百年的好味道",
    paragraph: `製茶過程獨特之處在於：
    凍頂烏龍茶的採制工藝十分講究，採摘青心烏龍等良種芽葉，經曬青、涼青、浪青、炒青、揉捻、初烘、多次反復的團揉(包揉)、復烘、再焙火而製成。
    尤其茶葉烘乾後需再重複以布包成球狀揉捻茶葉，使其成半發酵、半球狀，稱為「布揉製茶」或「熱團揉」。揉捻後，茶葉帶有隱隱金黃色。`,
    img: 'http://localhost:5000/img/tea.jpg',
    data: [{property: "發酵溫度", index: 26.3, unit: "度"}, {property: "發酵濕度", index: 63, unit: "%"}],
    is_reverse: false
};
var sectionInput3 = {
    id: 3,
    title: "團揉、復烘、焙火",
    subtitle: "在瞬息萬變的現代 傳承百年的好味道",
    paragraph: `林氏傳統古典凍頂烏龍茶」，歷經無數次高低起伏的炭火淬煉焙製，冰火輪迴、起伏滋味，門外兵馬、壺中水沸。烘焙過程中，稍有閃失，不是炭焦味，就是失去好茶韻味，可謂舉棋，起手無回。其迭有層次的風韻，把杯，無酒也醉，足可讓您拋開人生成敗起伏，休兵楚河漢界。`,
    img: 'http://localhost:5000/img/tea.jpg',
    data: [{property: "發酵溫度", index: 26.3, unit: "度"}, {property: "發酵濕度", index: 63, unit: "%"}],
    is_reverse: true
};
var sectionList = [sectionInput1, sectionInput2, sectionInput3]

const props = {
    name: "林氏傳統凍頂烏龍茶",
    producer_id: 3,
    producer_name: "Lin",
    country: "Taiwan",
    zip: "30013",
    province: "Taiwan",
    county: "NanTou",
    township: "Lu Gu",
    village: "FongHuang", 
    road: "GuangFu Rd.", 
    sell_type: "in_stock", 
    price: 500, 
    unit: "NTD",
    amount: 3, 
    slogan: "# Traditional Flavor", 
    description:"即使在改變口味的尖峰上，仍然堅持住最古老的好味道", 
    content: sectionList,
    certification: [{name: "SGS", link: "www.sgs.com"}],
    spec: [{property: "100g", value: "Heavily Baked", comment: "Strongest"}, {property: "100g", value: "Heavily Baked", comment: "Strongest"}],
    cover_img: "http://localhost:5000/img/farmer1.jpg", 
    imgs: ['http://localhost:5000/img/hill1.jpg', 'http://localhost:5000/img/tea.jpg', 'http://localhost:5000/img/child.jpg'], 
    block_id: undefined,
    block_link: undefined,
    transaction_id: undefined,
    traceability_link: undefined,
    comment: {note: "Sample Comment", ext: {}},
    expire_on: "2020-10-05T14:48:00.000Z",
    is_limited: true,
    has_expiration: true
}

function FarmerPage() {
    var handleBuyClick = () => {
        console.log(cartGetState())
        cartAddItem(props.id, props.cover_img, props.name, props.sell_type, 1, props.price, props.unit)
        console.log(cartGetState())
      }
      
    var button = (
    <button onClick={handleBuyClick} style={{color: Color.blueDark, border: `2px solid ${Color.blueDark}`, paddingTop: "0.8rem", paddingBottom: "0.8rem", paddingRight: "1.5rem", paddingLeft: "1.5rem", marginBottom: "3rem", backgroundColor: "rgba(255, 255, 255, 0)", borderRadius: Shape.half_circle}}>
    <div>
        <img style={{width: "1.2rem", marginRight: "0.5rem", marginBottom: "0.3rem"}} src={ShoppingCart} />
        <span style={{fontFamily: font_style.fontFamily, fontWeight: "bold", fontSize: "1.1rem"}}>加入購物車</span>
    </div>
    </button>)

    var content = props.content.map((item, index, array) => {
      return <Section id={index} title={item.title} subtitle={item.subtitle} paragraph={item.paragraph} img={item.img} is_reverse={item.is_reverse} extra={mapDataToPresent(item.data)}/>
    })
  
  return (
    <div>
      <Slider sliderInput = {mapToSlider(props.imgs)} is_show_indicator = {true} is_show_control = {true}/>
      <Quote/>
      <HeroTitle title={props.name} paragraph={props.description}/>
      <Section title={props.name} subtitle={props.description} img={props.cover_img} is_reverse={false} extra={button}/>
      {content}
      <HeroTitle title={"檢驗認證"} paragraph={"我們只給你最好的"}/>
      <div style={{marginRight: "2rem", marginLeft: "2rem"}}>
        <FlexGrid items={mapToCerti(props.certification)} justify_content={"left"} flex_wrap={"wrap"}/>
      </div>
    </div>
  );
}

function mapToSlider(imgs){
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

function mapToCerti(certis){
    return certis.map((item, index, array) => {
        return <MiniCard uuid={index} background={"url(http://localhost:5000/img/hill2.jpg)"} head={<h1 style={{color: Color.white, letterSpacing: "0.3rem"}}>SGS</h1>} title={<h5 style={{color: Color.white}}>檢驗合格</h5>} min_width={"10rem"} mask={"rgba(0, 0, 0, 0.3)"}/>
    })
}

function mapDataToPresent(datas){
    let data_list = datas.map((item, index, array) => {
        return (
        <div style={{textAlign: "center"}}>
            <h4 style={{fontWeight: "bold", fontFamily: font_style.fontFamily}}>{item.property}</h4>
            <h1 style={{color: Color.greenDark, fontSize: '3rem', fontFamily: font_style.fontFamily}}>{item.index}<span style={{fontSize: '2rem'}}>{item.unit}</span></h1>
        </div>)
    })
    return <FlexGrid items={data_list} flex_wrap={"nowrap"} justify_content={"space-around"}/>
}

export default FarmerPage;
