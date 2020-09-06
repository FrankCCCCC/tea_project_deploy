require('custom-env').env(process.argv[2])

const post_action = '/post_action'
const item_action = '/item_action'
const farmer_action = '/farmer_action'
const order_action = '/order_action'
const app_data_action = '/app_data_action'
// const local_url = 'http://localhost'
// const port = 8000
const port = process.env.SERVER_PORT

const success = 'SUCCESS'
const error = 'ERROR'

const pre_sell = '預售'
const in_stock = '現貨'

// const item_action_url = local_url + ':'  + String(port) + item_action
// const farmer_action_url = local_url + ':'  + String(port) + farmer_action
// const order_action_url = local_url + ':'  + String(port) + order_action

const query_app_datas_count_all = '/query_app_datas_count_all'
const insert_app_data = '/insert_app_data'
const query_app_data_by_id = '/query_app_data_by_id'
const query_app_data_by_property = '/query_app_data_by_property'
const query_app_data_list = '/query_app_data_list'
// const app_data_action_url = local_url + ':'  + String(port) + app_data_action

const query_posts_count_all = '/query_posts_count_all'
const insert_post = '/insert_post'
const query_post_by_id = '/query_post_by_id'
const query_post_list = '/query_post_list'
// const post_action_url = local_url + ':' + String(port) + post_action

const media_targets = ['img', "imgs", 'image', 'images', 'cover_img', 'cover_image', 'video', 'media']
const markdown_targets = ['description']

exports.post_action = post_action
exports.item_action = item_action
exports.farmer_action = farmer_action
exports.order_action = order_action
exports.app_data_action = app_data_action
exports.port = port
// exports.local_url = local_url

exports.success = success
exports.error = error

exports.pre_sell = pre_sell
exports.in_stock = in_stock

// exports.item_action_url = item_action_url
// exports.farmer_action_url = farmer_action_url
// exports.order_action_url = order_action_url

exports.query_app_datas_count_all = query_app_datas_count_all
exports.insert_app_data = insert_app_data
exports.query_app_data_by_id = query_app_data_by_id
exports.query_app_data_by_property = query_app_data_by_property
exports.query_app_data_list = query_app_data_list
// exports.app_data_action_url = app_data_action_url

exports.query_posts_count_all = query_posts_count_all
exports.insert_post = insert_post
exports.query_post_by_id = query_post_by_id
exports.query_post_list = query_post_list
// exports.post_action_url = post_action_url

exports.media_targets = media_targets
exports.markdown_targets = markdown_targets