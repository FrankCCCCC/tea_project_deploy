import get from './fetchDb'
import {query_orders_count_all_url, query_order_by_id_url, query_order_list_url, insert_order_url} from '../util/config'

/**
 * 
 * @param {string} buyer_name - The name of the buyer of the order
 * @param {string} phone - The phone number of the buyer of the order
 * @param {string} email - The email address of the buyer of the order
 * @param {string} bank_code - The bank code of the buyer of the order
 * @param {string} bank_account - The bank_account of the buyer of the order
 * @param {string} country - The delivery country of the buyer of the order
 * @param {string} zip - The delivery address zip number of the buyer of the order
 * @param {string} province - The delivery address province of the buyer of the order
 * @param {string} county - The delivery address county of the buyer of the order
 * @param {string} township - The delivery address township of the buyer of the order
 * @param {string} village - The delivery address village of the buyer of the order
 * @param {string} road - The delivery address road of the buyer of the order
 * @param {object} items - The items of the order
 * @param {number} total_price - The total price of the order
 * @param {string} unit - The currency unit of the order
 * @param {integer} total_quantity - The total quantity of the order
 * @param {boolean} agree_policy - Whether the buyer agree to the private policy
 * @param {boolean} agree_promotion - Whether the buyer agree to the promotion policy
 * @param {object} comment - The extra comment of the order
 */
export function fetchInsertOrder(buyer_name, phone, email, bank_code, bank_account, country, zip, province, county, township, village, road, items, total_price, unit, total_quantity, agree_policy, agree_promotion, comment){
  return get(insert_order_url,{
    method: 'POST',
    body: new URLSearchParams({
      buyer_name: buyer_name, 
      phone: phone, 
      email: email, 
      bank_code: bank_code, 
      bank_account: bank_account, 
      country: country, 
      zip: zip, 
      province: province, 
      county: county, 
      township: township, 
      village: village, 
      road: road, 
      items: JSON.stringify(items), 
      total_price: total_price, 
      unit: unit, 
      total_quantity: total_quantity, 
      agree_policy: agree_policy, 
      agree_promotion: agree_promotion, 
      comment: JSON.stringify({note: comment, ext: {}})
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function fetchOrdersCountAll(){
  return get(query_orders_count_all_url,{
    method: 'GET'
  })
}

export function fetchOrder(id){
  return get(query_order_by_id_url,{
    method: 'POST',
    body: new URLSearchParams({
        id: Number(id)
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function fetchOrderList(count, offset){
  return get(query_order_list_url,{
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

// export {fetchOrdersCountAll, fetchOrder, fetchOrderList, fetchInsertOrder}