import get from './fetchDb'
import {query_items_count_all_url, query_item_by_id_url, query_item_list_url, } from '../util/config'

function fetchItemCountAll(){
  return get(query_items_count_all_url,{
    method: 'GET'
  })
}

function fetchItemById(id){
  return get(query_item_by_id_url,{
    method: 'POST',
    body: new URLSearchParams({
        id: Number(id)
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

async function fetchItemList(count, offset){
  return await get(query_item_list_url,{
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

var fetchItemList_p = (count, offset) => get(query_item_list_url,{
  method: 'POST',
  body: new URLSearchParams({
      count: Number(count),
      offset: Number(offset)
  }),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}).then(
  (resolve) => {
      console.log("loadRequest")
      console.log(resolve)
      return resolve.map(
          (item, index, array) => {
              let list_item = {
                  id: item.id,
                  cover_img: item.cover_img,
                  title: item.name,
                  subtitle: item.producer.name
              }
              return list_item
          }
      )
  }
)

// let kk = list_p.then(
//   (resolve) => {
//     console.log(resolve)
//       return resolve.map(
//           (item, index, array) => {
//               let list_item = {
//                   id: item.id,
//                   cover_img: item.cover_img,
//                   title: item.name,
//                   subtitle: item.producer.name
//               }
//               return list_item
//           }
//       )
//   }
// ).catch(
//   (reject) => {return reject}
// )

// exports.countAll = countAll;
// exports.byId = byId;
// exports.list = list;
// exports.list_p = list_p;

export {fetchItemCountAll, fetchItemById, fetchItemList, fetchItemList_p}