import React from 'react';
import HeroTitle from '../hero_title/HeroTitle'
import Gallery from '../gallery/Gallery';
// import GalleryList from '../galleryList/GalleryList';
import {fetchItemList, fetchItemCountAll, fetchItemList_p} from '../fetch/fetchItem';
import AsymmetricGrid from '../grid/AsymmetricGrid'
import InfiniteScroller from '../infiniteScroller/InfiniteScroller'
import {PillBadge} from '../badge/Badge'
import Color from '../theme/color'
import {hero_title_item_list_page, hero_paragraph_item_list_page} from '../theme/text'
import {mapSellTypeToText} from '../util/Util'

// function ItemListPage(props) {
//     let loadRequest = fetchItemList(1,3).then(
//         (resolve) => {
//             console.log("loadRequest")
//             console.log(resolve)
//             return resolve.map(
//                 (item, index, array) => {
//                     let list_item = {
//                         id: item.id,
//                         cover_img: item.cover_img,
//                         title: item.name,
//                         subtitle: item.producer_name
//                     }
//                     return list_item
//                 }
//             )
//         }
//     ).catch(
//         (reject) => {return reject}
//     )
//     return (
//         <div>
//             <div style={{height: "3rem"}}></div>
//             <HeroTitle title="我們的茶" paragraph="最傳統的凍頂烏龍茶"/>
//             <div class="container">
//                 {/* <GalleryList countAll={fetchItemCountAll().then((response) => {return response.count})} loadrequest={fetchItemList_p} route="item"/> */}
//             </div>
//         </div>
//     );
// }

class ItemListPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            is_loaded: false, 
        }
    }

    handleLoadMore(count, offset){
        return fetchItemList(count, offset).then(
            (resolve) => {
                return resolve.map((item, index, array) => {
                    let sell_type = mapSellTypeToText(item.sell_type)
                    
                    return {
                        id: parseInt(item.id, 10), 
                        img: String(item.cover_img), 
                        category: item.sell_type,
                        // caption_title: item.title,
                        // caption_subtitle: item.subtitle,
                        title: String(item.name),
                        subtitle: String(item.producer_name),
                        badge: <PillBadge textColor={Color.white} backgroundColor={Color.yellowHightLight} text={sell_type}/>
                    }
                })
            }
        ).then((resolve) => {
            return resolve.map((item, index, array) => {
                return <Gallery uuid={parseInt(index, 10)} id={parseInt(item.id, 10)} catergory={item.catergory} img={item.img} caption_title={item.caption_title} caption_subtitle={item.caption_subtitle} title={item.title} subtitle={item.subtitle} badge={item.badge} route={"item"}/>
            })
        })
    }

    adapter(grid_items){
        return (
            <AsymmetricGrid items={grid_items} column_count={3} column_width={"2rem"} column_width={"20rem"}/>
        )
    }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

    render(){
        return (
            <div>
                <div style={{height: "3rem"}}></div>
                <HeroTitle title={hero_title_item_list_page} paragraph={hero_paragraph_item_list_page}/>
                <div class="container">
                    {/* <GalleryList countAll={fetchItemCountAll().then((response) => {return response.count})} loadrequest={fetchItemList_p} route="item"/> */}
                    <InfiniteScroller count_all={fetchItemCountAll().then((response) => {return response.count})} load_request={this.handleLoadMore} grid_adapter={this.adapter} load_item_number_per_time={3}/>
                </div>
            </div>
        )
    }
}

export default ItemListPage;