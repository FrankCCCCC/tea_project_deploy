// const base_url = "http://localhost"
const base_url = 'http://leafhopper_service.nctu.me'
// const base_url = 'https://tea-deploy.herokuapp.com'
// const base_url = 'http://140.114.218.111'
const app_server_port = 3000;
const db_server_port = 8000;
const db_port = 5432;
const static_server_port = 5000;
const app_server_cluster = 1;
const static_server_cluster = 1;

const app_server_url = base_url + ":" + app_server_port.toString();
const static_server_url = base_url + ":" + static_server_port.toString();
const db_server_url = base_url + ":" + db_server_port.toString()

const image_fetch_url = static_server_url + "/img/";
const video_fetch_url = static_server_url + "/video/";

const app_data_action = "app_data_action";
const query_app_data_list = "query_app_data_list";
const query_app_data_by_id = "query_app_data_by_id";
const query_app_data_by_property = "query_app_data_by_property"
const query_app_datas_count_all = "query_app_datas_count_all";
const app_data_action_url = db_server_url + "/" + app_data_action;
const query_app_data_by_id_url = app_data_action_url + "/" + query_app_data_by_id;
const query_app_data_by_property_url = app_data_action_url + "/" + query_app_data_by_property;
const query_app_data_list_url = app_data_action_url + "/" + query_app_data_list;
const query_app_datas_count_all_url = app_data_action_url + "/" + query_app_datas_count_all;

const post_action = "post_action";
const query_post_list = "query_post_list";
const query_post = "query_post_by_id";
const query_posts_count_all = "query_posts_count_all";
const post_action_url = db_server_url + "/" + post_action;
const query_post_url = post_action_url + "/" + query_post;
const query_post_list_url = post_action_url + "/" + query_post_list;
const query_posts_count_all_url = post_action_url + "/" + query_posts_count_all;

const item_action = "item_action";
const query_item_list = "query_item_list";
const query_item_by_id = "query_item_by_id";
const query_items_count_all = "query_items_count_all";
const item_action_url = db_server_url + "/" + item_action;
const query_item_by_id_url = item_action_url + "/" + query_item_by_id;
const query_item_list_url = item_action_url + "/" + query_item_list;
const query_items_count_all_url = item_action_url + "/" + query_items_count_all;
export const pre_sale = "pre_sale"
export const in_stock = "in_stock"

const order_action = "order_action";
const query_order_list = "query_order_list";
const query_order_by_id = "query_order_by_id";
const query_order_by_buyer_name = "query_order_by_buyer_name";
const query_orders_count_all = "query_orders_count_all";
const insert_order = "insert_order";
const order_action_url = db_server_url + "/" + order_action;
const query_order_by_id_url = order_action_url + "/" + query_order_by_id;
const query_order_by_buyer_name_url = order_action_url + "/" + query_order_by_buyer_name;
const query_order_list_url = order_action_url + "/" + query_order_list;
const query_orders_count_all_url = order_action_url + "/" + query_orders_count_all;
const insert_order_url = order_action_url + "/" + insert_order;

// exports.base_url = base_url;
// exports.app_server_port = app_server_port;
// exports.db_server_port = db_server_port;
// exports.db_port = db_port;
// exports.static_server_port = static_server_port;
// exports.app_server_cluster = app_server_cluster;
// exports.static_server_cluster = static_server_cluster;

// exports.app_server_url = app_server_url;
// exports.static_server_url = static_server_url;
// exports.db_server_url = db_server_url;

// exports.image_fetch_url = image_fetch_url;
// exports.video_fetch_url = video_fetch_url;

// exports.post_action_url = post_action_url;
// exports.query_post_url = query_post_url;
// exports.query_post_list_url = query_post_list_url;
// exports.query_posts_count_all_url = query_posts_count_all_url;

// exports.item_action_url = item_action_url;
// exports.query_item_by_id_url = query_item_by_id_url;
// exports.query_item_list_url = query_item_list_url;
// exports.query_items_count_all_url = query_items_count_all_url;

// exports.static_server_port = static_server_port;
export {base_url, app_server_port, db_server_port, db_port, static_server_port, app_server_cluster, static_server_cluster,
        app_server_url, static_server_url, db_server_url,
        image_fetch_url, video_fetch_url,
        query_app_data_by_id_url, query_app_data_by_property_url, query_app_data_list_url, query_app_datas_count_all_url, 
        post_action_url, query_post_url, query_post_list_url, query_posts_count_all_url,
        item_action_url, query_item_by_id_url, query_item_list_url, query_items_count_all_url,
        query_order_by_id_url, query_order_by_buyer_name_url, query_order_list_url, query_orders_count_all_url, insert_order_url}
