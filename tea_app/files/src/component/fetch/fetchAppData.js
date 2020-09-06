import get from './fetchDb'
import {
    query_app_data_by_id_url, 
    query_app_data_by_property_url, 
    query_app_datas_count_all_url, 
    query_app_data_list_url
} from '../util/config'

function fetchAppDataCountAll(){
  return get(query_app_datas_count_all_url,{
    method: 'GET'
  })
}

function fetchAppDataById(id){
  return get(query_app_data_by_id_url,{
    method: 'POST',
    body: new URLSearchParams({
        id: Number(id)
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

function fetchAppDataByProperty(property){
    console.log(query_app_data_by_property_url)
    return get(query_app_data_by_property_url,{
      method: 'POST',
      body: new URLSearchParams({
          property: String(property)
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
}

function fetchAppDataList(count, offset){
  return get(query_app_data_list_url,{
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

export {fetchAppDataCountAll, fetchAppDataById, fetchAppDataByProperty, fetchAppDataList}