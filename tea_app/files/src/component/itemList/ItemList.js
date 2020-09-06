import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Gallery from '../gallery/Gallery'
const fetchPost = require('../fetch/fetchPost');

class PostList extends React.Component{
    constructor(props){
        super(props);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.state = {
            posts_count: 0,
            is_has_more: true,
            loaded_item_number: 0,
            load_item_number_per_time: 3,
            posts: []
        }
    }
    componentDidMount(){
        fetchPost.fetchPostsCountAll().then(
            (response) => {
                console.log(response);
                console.log(response.count);
                this.setState({
                    posts_count: Number(response.count)
                })
                return response;
            }
        ).catch(
            (reject) => {
                console.log("Error: ", reject)
                return reject
            }
        )
        // fetchPost.fetchPostList(this.state.load_item_number_per_time,this.state.loaded_item_number).then(
        //     (response) => {
        //         console.log(response);
        //         var postList = response.map((item, index, array) => {
        //             return {
        //                 id: item.id,
        //                 img: item.cover_img,
        //                 caption_title: item.title,
        //                 caption_subtitle: item.subtitle
        //             }
        //         })
        //         console.log(postList);
        //         this.setState({
        //             loaded_item_number: this.state.loaded_item_number + this.state.load_item_number_per_time,
        //             posts: postList
        //         })
        //         return response;
        //     }
        // ).catch(
        //     (reject) => {
        //         console.log("Error: ", reject)
        //         return reject
        //     }
        // )
    }

    handleLoadMore(page){
        console.log("HI")
        console.log(this.state.posts_count)
        console.log(this.state.loaded_item_number)
        if(this.state.loaded_item_number < this.state.posts_count){
            fetchPost.fetchPostList(this.state.load_item_number_per_time,this.state.loaded_item_number).then(
                (response) => {
                    console.log(response);
                    var temp = this.state.posts;
                    response.map((item, index, array) => {
                        console.log(this.state.posts);
                        temp.push(
                            {
                                id: item.id,
                                img: item.cover_img,
                                caption_title: item.title,
                                caption_subtitle: item.subtitle
                            }
                        );
                        
                        // return 
                    })
                    // if(this.state.loaded_item_number > 0){
                    //     postList.push(this.state.posts);
                    // }
                    console.log(this.state.posts[0].id);
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
                <InfiniteScroll useWindow={false} pageStart={0} hasMore={this.state.loaded_item_number < this.state.posts_count} loadMore={this.handleLoadMore}>
                    <Gallery galleryInput={this.state.posts} route="post"/>
                </InfiniteScroll>
            </div>
        );
    }
}

export default PostList;