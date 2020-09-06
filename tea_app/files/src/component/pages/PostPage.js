import React from 'react';
import Post from '../post/Post';
import LoadingPage from '../pages/LoadingPage'
import {title_style, subtitle_style, paragraph_style} from '../theme/font'
const fetchPost = require('../fetch/fetchPost')
const fetchMedia = require('../fetch/fetchMedia')

// @const postInput = {
//     title: "string",
//     subtitle: "string",
//     author: "string",
//     create_on: "ISO time format string",
//     lastest_modify: "ISO time format string",
//     content: "<html> string",
//     cover_img: "image url or null in string"
// };

/**
 * @param {Integer} postId
 */

class PostPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            is_loaded: false,
            props_id: Number(this.props.match.params.postId)
        }
    }

    componentDidMount(){
      
      if(typeof(this.state.props_id) != "number"){
        console.log("Error: PostPage parameter id is not number")
      }
      console.log(this.state.props_id)
        fetchPost.fetchPost(this.state.props_id).then(
          (resolve_post) => {
            fetchMedia.fetchImage(resolve_post.cover_img).then(
              (resolve_media) => {
                this.setState({
                  cover_img: resolve_media
                })
              }
            ).catch(
              (reject) => {
                console.log(reject)
              }
            )
            this.setState({
              id: resolve_post.id,
              title: resolve_post.title,
              subtitle: resolve_post.subtitle,
              author: resolve_post.author,
              description: resolve_post.description,
              create_on: resolve_post.create_on,
              lastest_modify: resolve_post.lastest_modify,
            });
            console.log(this.state)
            return (resolve_post);
          }
        ).then(
          (resolve_post) => {
            this.setState({
              is_loaded: true,
            });
          }
        ).catch(
          (reject) => {
            console.log(reject)
          }
        )
      }

    render(){
      // console.log("url("+ this.state.cover_img +")")
        return(
          <div>
            {this.state.is_loaded? 
              <div data-aos="fade-left">
                  <div class="" style={{background: `url(${this.state.cover_img})`, height: "100vh", minHeight: "350px", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
                      <div style={{width: "100%", height: "100%", textAlign: "left", backgroundColor: "rgba(0,0,0,0.5)"}}>
                          <div style={{position: "absolute", top: "50%", transform: "translateY(-50%)", marginLeft: "3rem", marginRight: "3rem"}}>
                              <h1 style={title_style}>{this.state.title}</h1>
                              <h4 style={subtitle_style}>{this.state.subtitle}</h4>
                              <p style={paragraph_style}>{this.state.author} Create At {this.state.create_on}</p>
                          </div>
                      </div>
                  </div>
                  <div class="container" data-aos="fade-right">
                      <Post content={this.state.description}/>
                  </div>
              </div> :
              <LoadingPage/>
            }
          </div>
        );
    }
}

// function PostPage() {
//     return(
//         <div>
//             <div class="" style={{backgroundImage: "url("+ props.cover_img +")", height: "100vh", minHeight: "350px", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
//                 <div style={{width: "100%", height: "100%", textAlign: "left", backgroundColor: "rgba(0,0,0,0.5)"}}>
//                     <div style={{position: "absolute", top: "50%", transform: "translateY(-50%)", marginLeft: "3rem", marginRight: "3rem"}}>
//                         <h1 style={title_style}>{props.title}</h1>
//                         <h4 style={subtitle_style}>{props.subtitle}</h4>
//                         <p style={paragraph_style}>{props.author} Create At {props.create_on}</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="container">
//                 <Post/>
//             </div>
//         </div>
//     );
// }

export default PostPage;
