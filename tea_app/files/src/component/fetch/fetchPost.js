import get from './fetchDb'
import {query_posts_count_all_url, query_post_url, query_post_list_url, } from '../util/config'

function fetchPostsCountAll(){
  return get(query_posts_count_all_url,{
    method: 'GET'
  })
}

function fetchPost(id){
  return get(query_post_url,{
    method: 'POST',
    body: new URLSearchParams({
        id: Number(id)
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

function fetchPostList(count, offset){
  return get(query_post_list_url,{
    method: 'POST',
    body: new URLSearchParams({
        count: Number(count),
        offset: Number(offset)
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// exports.fetchPostsCountAll = fetchPostsCountAll;
// exports.fetchPost = fetchPost;
// exports.fetchPostList = fetchPostList;

export {fetchPostsCountAll, fetchPost, fetchPostList}