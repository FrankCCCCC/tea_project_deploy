import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
// import Gallery from '../gallery/Gallery'

/**
 * @param {Promise} count_all - The fetch promise that can count the number of all items
 * @param {Function} load_request - The function that can load specific number of items after speific item
 * @param {Function} grid_adapter - The function that adapt elements to specify grid system
 * @param {Integer} load_item_number_per_time - The number of items to load every time
 */

class InfiniteScroller extends React.Component{
    constructor(props){
        super(props);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.state = {
            load_request: this.props.load_request,
            grid_adapter: this.props.grid_adapter,
            items_count: 0,
            is_has_more: true,
            loaded_item_number: 0,
            load_item_number_per_time: this.props.load_item_number_per_time,
            items: []
        }
    }
    componentDidMount(){
        this.props.count_all.then(
            (resolve) => {
                console.log(resolve)
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
        // console.log(this.state.load_item_number_per_time)
        if(this.state.loaded_item_number < this.state.items_count){
            // console.log(this.state.)
            this.props.load_request(this.state.load_item_number_per_time, this.state.loaded_item_number).then(
                (resolve) => {
                    var temp = this.state.items;
                    resolve.map((item, index, array) => {
                        temp.push(item);
                    })
                    this.setState({
                        loaded_item_number: this.state.loaded_item_number + this.state.load_item_number_per_time,
                        items: temp
                    })
                }
            ).catch(
                (reject) => {
                    console.log("Error: ", reject)
                    return reject
                }
            )
            // this.state.load_request(this.state.load_item_number_per_time, this.state.loaded_item_number).then(
            //     (response) => {
            //         // console.log(response);
            //         var temp = this.state.items;
            //         response.map((item, index, array) => {
            //             // console.log(this.state.items);
            //             temp.push(item);
            //         })
            //         // console.log(this.state.items[0].id);
            //         this.setState({
            //             loaded_item_number: this.state.loaded_item_number + this.state.load_item_number_per_time,
            //             items: temp
            //         })
            //         return response;
            //     }
            // ).catch(
            //     (reject) => {
            //         console.log("Error: ", reject)
            //         return reject
            //     }
            // )
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
                    {/* <Gallery galleryInput={this.state.posts} route={this.props.route}/> */}
                    {this.state.grid_adapter(this.state.items)}
                </InfiniteScroll>
            </div>
        );
    }
}

export default InfiniteScroller;