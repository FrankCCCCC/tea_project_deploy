import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from '../gallery/Gallery0'

/**
 * @param {Object[]} items - Array of elements in asymmetric grid
 */

class GalleryList extends React.Component{
    constructor(props){
        super(props);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.state = {
            loadrequest: this.props.loadrequest,
            items_count: 0,
            is_has_more: true,
            loaded_item_number: 0,
            load_item_number_per_time: 3,
            posts: []
        }
    }
    componentDidMount(){
        this.props.countAll.then(
            (resolve) => {
                this.setState({
                    items_count: Number(resolve)
                })
            }
        ).catch(
            (reject) => {
                console.log("Error: ", reject)
                return reject
            }
        )
    }

    handleLoadMore(page){
        // console.log(this.state.items_count)
        // console.log(this.state.loaded_item_number)
        if(this.state.loaded_item_number < this.state.items_count){
            this.state.loadrequest(this.state.load_item_number_per_time,this.state.loaded_item_number).then(
                (response) => {
                    // console.log(response);
                    var temp = this.state.posts;
                    response.map((item, index, array) => {
                        console.log(this.state.posts);
                        temp.push(
                            {
                                id: item.id,
                                img: item.cover_img,
                                caption_title: item.title,
                                caption_subtitle: item.subtitle,
                                title: item.title,
                                subtitle: item.subtitle
                            }
                        );
                    })
                    // console.log(this.state.posts[0].id);
                    this.setState({
                        loaded_item_number: this.state.loaded_item_number + this.state.load_item_number_per_time,
                        posts: temp
                    })
                    return response;
                }
            ).catch(
                (reject) => {
                    console.log("Error: ", reject)
                    return reject
                }
            )
        }else{
            this.setState({
                is_has_more: false
            })
        }
    }

    render(){
        return (
            <div style={{}}>
                <InfiniteScroll useWindow={false} pageStart={0} hasMore={this.state.loaded_item_number < this.state.items_count} loadMore={this.handleLoadMore}>
                    <Gallery galleryInput={this.state.posts} route={this.props.route}/>
                </InfiniteScroll>
            </div>
        );
    }
}

export default GalleryList;