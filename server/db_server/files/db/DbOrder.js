const ds = require('./dataStructure');
const Util = require('../util/Util');
const Db = require('./Db')

/**
 * The createCommentType function would create a type called 'Comment' in Postgres DB
 */
function createCommentType(){
    let command = `DO $$ BEGIN
        CREATE TYPE ${ds.dataStructure.Comment.type_name} AS (${ds.dataStructure.Comment.note.schema}, ${ds.dataStructure.Comment.ext.schema});
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`;

    return Db.query(command)
}

/**
 * The creatSellTypeType function would create a ENUM type called 'SellType' in Postgres DB
 */
function createSellTypeType(){
    let command = `DO $$ BEGIN
        CREATE TYPE ${ds.dataStructure.SellType.type_name} AS ${ds.dataStructure.SellType.schema};
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`

    return Db.query(command)
}

/**
 * The creatOrderItemType function would create a type called 'OrderItem' in Postgres DB
 */
function createOrderItemType(){
    let command = `DO $$ BEGIN
        CREATE TYPE ${ds.dataStructure.OrderItem.type_name} AS (
            ${ds.dataStructure.OrderItem.id.schema}, 
            ${ds.dataStructure.OrderItem.name.schema}, 
            ${ds.dataStructure.OrderItem.quantity.schema}, 
            ${ds.dataStructure.OrderItem.price.schema}, 
            ${ds.dataStructure.OrderItem.unit.schema});
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`

    return Db.query(command)
}

function createExtensionUuid(){
    let command = `
    DO $$ BEGIN
        CREATE EXTENSION "uuid-ossp";
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`

    return Db.query(command)
}

function createOrdersTable(){
    let command = `CREATE TABLE IF NOT EXISTS ${ds.dataStructure.order.table_name}(
    ${ds.dataStructure.order.id.schema},
    ${ds.dataStructure.order.order_id.schema},
    ${ds.dataStructure.order.buyer_name.schema},
    ${ds.dataStructure.order.phone.schema},
    ${ds.dataStructure.order.email.schema},
    ${ds.dataStructure.order.bank_code.schema},
    ${ds.dataStructure.order.bank_account.schema},
    ${ds.dataStructure.order.country.schema},
    ${ds.dataStructure.order.zip.schema},
    ${ds.dataStructure.order.province.schema},
    ${ds.dataStructure.order.county.schema},
    ${ds.dataStructure.order.township.schema},
    ${ds.dataStructure.order.village.schema},
    ${ds.dataStructure.order.road.schema},
    ${ds.dataStructure.order.items.schema},
    ${ds.dataStructure.order.total_price.schema},
    ${ds.dataStructure.order.unit.schema},
    ${ds.dataStructure.order.total_quantity.schema},
    ${ds.dataStructure.order.block_id.schema},
    ${ds.dataStructure.order.block_link.schema},
    ${ds.dataStructure.order.transaction_id.schema},
    ${ds.dataStructure.order.agree_policy.schema},
    ${ds.dataStructure.order.agree_promotion.schema},
    ${ds.dataStructure.order.is_paid.schema},
    ${ds.dataStructure.order.is_send.schema},
    ${ds.dataStructure.order.is_recieved.schema},
    ${ds.dataStructure.order.comment.schema},
    ${ds.dataStructure.order.create_on.schema},
    ${ds.dataStructure.order.latest_modify.schema})`;

    return Db.query(command)
}

function queryOrdersCountAll(){
    let command = `SELECT COUNT(*) FROM ${ds.dataStructure.order.table_name};`;
    return Db.query(command)
}

function queryOrderById(id){
    Util.checkInt(id, "DbOrder.queryOrderById id")

    let command = `SELECT 
    ${ds.dataStructure.order.id.key},
    ${ds.dataStructure.order.order_id.key},
    ${ds.dataStructure.order.buyer_name.key},
    ${ds.dataStructure.order.phone.key},
    ${ds.dataStructure.order.email.key},
    ${ds.dataStructure.order.bank_code.key},
    ${ds.dataStructure.order.bank_account.key},
    ${ds.dataStructure.order.country.key},
    ${ds.dataStructure.order.zip.key},
    ${ds.dataStructure.order.province.key},
    ${ds.dataStructure.order.county.key},
    ${ds.dataStructure.order.township.key},
    ${ds.dataStructure.order.village.key},
    ${ds.dataStructure.order.road.key},
    array_to_json(${ds.dataStructure.order.items.key}) AS ${ds.dataStructure.order.items.key},
    ${ds.dataStructure.order.total_price.key},
    ${ds.dataStructure.order.unit.key},
    ${ds.dataStructure.order.total_quantity.key},
    ${ds.dataStructure.order.block_id.key},
    ${ds.dataStructure.order.block_link.key},
    ${ds.dataStructure.order.transaction_id.key},
    ${ds.dataStructure.order.agree_policy.key},
    ${ds.dataStructure.order.agree_promotion.key},
    ${ds.dataStructure.order.is_paid.key},
    ${ds.dataStructure.order.is_send.key},
    ${ds.dataStructure.order.is_recieved.key},
    row_to_json(${ds.dataStructure.order.comment.key}) AS ${ds.dataStructure.order.comment.key},
    ${ds.dataStructure.order.create_on.key}, 
    ${ds.dataStructure.order.latest_modify.key}
    FROM ${ds.dataStructure.order.table_name} WHERE ${ds.dataStructure.order.id.key} = '${parseInt(id, 10)}';`;

    return Db.query(command)
}

function queryOrderByOrderId(orderId){
    Util.checkInt(orderId, "DbOrder.queryOrderByOrderId orderId")

    let command = `SELECT 
    ${ds.dataStructure.order.id.key},
    ${ds.dataStructure.order.order_id.key},
    ${ds.dataStructure.order.buyer_name.key},
    ${ds.dataStructure.order.phone.key},
    ${ds.dataStructure.order.email.key},
    ${ds.dataStructure.order.bank_code.key},
    ${ds.dataStructure.order.bank_account.key},
    ${ds.dataStructure.order.country.key},
    ${ds.dataStructure.order.zip.key},
    ${ds.dataStructure.order.province.key},
    ${ds.dataStructure.order.county.key},
    ${ds.dataStructure.order.township.key},
    ${ds.dataStructure.order.village.key},
    ${ds.dataStructure.order.road.key},
    array_to_json(${ds.dataStructure.order.items.key}) AS ${ds.dataStructure.order.items.key},
    ${ds.dataStructure.order.total_price.key},
    ${ds.dataStructure.order.unit.key},
    ${ds.dataStructure.order.total_quantity.key},
    ${ds.dataStructure.order.block_id.key},
    ${ds.dataStructure.order.block_link.key},
    ${ds.dataStructure.order.transaction_id.key},
    ${ds.dataStructure.order.agree_policy.key},
    ${ds.dataStructure.order.agree_promotion.key},
    ${ds.dataStructure.order.is_paid.key},
    ${ds.dataStructure.order.is_send.key},
    ${ds.dataStructure.order.is_recieved.key},
    row_to_json(${ds.dataStructure.order.comment.key}) AS ${ds.dataStructure.order.comment.key},
    ${ds.dataStructure.order.create_on.key}, 
    ${ds.dataStructure.order.latest_modify.key}
    FROM ${ds.dataStructure.order.table_name} WHERE ${ds.dataStructure.order.order_id.key} = '${parseInt(orderId, 10)}';`;

    return Db.query(command)
}

function queryOrderByBuyerName(buyerName){
    Util.checkString(buyerName, 'DbOrder.queryOrderByBuyerName buyerName')

    let command = `SELECT 
    ${ds.dataStructure.order.id.key},
    ${ds.dataStructure.order.order_id.key},
    ${ds.dataStructure.order.buyer_name.key},
    ${ds.dataStructure.order.phone.key},
    ${ds.dataStructure.order.email.key},
    ${ds.dataStructure.order.bank_code.key},
    ${ds.dataStructure.order.bank_account.key},
    ${ds.dataStructure.order.country.key},
    ${ds.dataStructure.order.zip.key},
    ${ds.dataStructure.order.province.key},
    ${ds.dataStructure.order.county.key},
    ${ds.dataStructure.order.township.key},
    ${ds.dataStructure.order.village.key},
    ${ds.dataStructure.order.road.key},
    array_to_json(${ds.dataStructure.order.items.key}) AS ${ds.dataStructure.order.items.key},
    ${ds.dataStructure.order.total_price.key},
    ${ds.dataStructure.order.unit.key},
    ${ds.dataStructure.order.total_quantity.key},
    ${ds.dataStructure.order.block_id.key},
    ${ds.dataStructure.order.block_link.key},
    ${ds.dataStructure.order.transaction_id.key},
    ${ds.dataStructure.order.agree_policy.key},
    ${ds.dataStructure.order.agree_promotion.key},
    ${ds.dataStructure.order.is_paid.key},
    ${ds.dataStructure.order.is_send.key},
    ${ds.dataStructure.order.is_recieved.key},
    row_to_json(${ds.dataStructure.order.comment.key}) AS ${ds.dataStructure.order.comment.key},
    ${ds.dataStructure.order.create_on.key}, 
    ${ds.dataStructure.order.latest_modify.key}
    FROM ${ds.dataStructure.order.table_name} WHERE ${ds.dataStructure.order.buyer_name.key} = '${String(buyerName)}';`;

    return Db.query(command)
}

function queryOrderByItemId(itemId){
    Util.checkInt(itemId, "DbOrder.queryOrderByItemId itemId")

    let command = `SELECT 
    ${ds.dataStructure.order.id.key},
    ${ds.dataStructure.order.order_id.key},
    ${ds.dataStructure.order.buyer_name.key},
    ${ds.dataStructure.order.phone.key},
    ${ds.dataStructure.order.email.key},
    ${ds.dataStructure.order.bank_code.key},
    ${ds.dataStructure.order.bank_account.key},
    ${ds.dataStructure.order.country.key},
    ${ds.dataStructure.order.zip.key},
    ${ds.dataStructure.order.province.key},
    ${ds.dataStructure.order.county.key},
    ${ds.dataStructure.order.township.key},
    ${ds.dataStructure.order.village.key},
    ${ds.dataStructure.order.road.key},
    array_to_json(${ds.dataStructure.order.items.key}) AS ${ds.dataStructure.order.items.key},
    ${ds.dataStructure.order.total_price.key},
    ${ds.dataStructure.order.unit.key},
    ${ds.dataStructure.order.total_quantity.key},
    ${ds.dataStructure.order.block_id.key},
    ${ds.dataStructure.order.block_link.key},
    ${ds.dataStructure.order.transaction_id.key},
    ${ds.dataStructure.order.agree_policy.key},
    ${ds.dataStructure.order.agree_promotion.key},
    ${ds.dataStructure.order.is_paid.key},
    ${ds.dataStructure.order.is_send.key},
    ${ds.dataStructure.order.is_recieved.key},
    row_to_json(${ds.dataStructure.order.comment.key}) AS ${ds.dataStructure.order.comment.key},
    ${ds.dataStructure.order.create_on.key}, 
    ${ds.dataStructure.order.latest_modify.key}
    FROM ${ds.dataStructure.order.table_name} WHERE ${ds.dataStructure.order.id.key} IN (
        SELECT ${ds.dataStructure.order.id.key} FROM (
            SELECT ${ds.dataStructure.order.id.key}, unnest(${ds.dataStructure.order.items.key}) AS items_list FROM ${ds.dataStructure.order.table_name}
            ) AS selected_items_list  WHERE (selected_items_list.items_list).${ds.dataStructure.OrderItem.id.key} = '${parseInt(itemId, 10)}' );`;

    return Db.query(command)
}

function queryOrderByItemName(itemName){
    Util.checkString(itemName, 'DbOrder.queryOrderByItemName itemName')

    let command = `SELECT 
    ${ds.dataStructure.order.id.key},
    ${ds.dataStructure.order.order_id.key},
    ${ds.dataStructure.order.buyer_name.key},
    ${ds.dataStructure.order.phone.key},
    ${ds.dataStructure.order.email.key},
    ${ds.dataStructure.order.bank_code.key},
    ${ds.dataStructure.order.bank_account.key},
    ${ds.dataStructure.order.country.key},
    ${ds.dataStructure.order.zip.key},
    ${ds.dataStructure.order.province.key},
    ${ds.dataStructure.order.county.key},
    ${ds.dataStructure.order.township.key},
    ${ds.dataStructure.order.village.key},
    ${ds.dataStructure.order.road.key},
    array_to_json(${ds.dataStructure.order.items.key}) AS ${ds.dataStructure.order.items.key},
    ${ds.dataStructure.order.total_price.key},
    ${ds.dataStructure.order.unit.key},
    ${ds.dataStructure.order.total_quantity.key},
    ${ds.dataStructure.order.block_id.key},
    ${ds.dataStructure.order.block_link.key},
    ${ds.dataStructure.order.transaction_id.key},
    ${ds.dataStructure.order.agree_policy.key},
    ${ds.dataStructure.order.agree_promotion.key},
    ${ds.dataStructure.order.is_paid.key},
    ${ds.dataStructure.order.is_send.key},
    ${ds.dataStructure.order.is_recieved.key},
    row_to_json(${ds.dataStructure.order.comment.key}) AS ${ds.dataStructure.order.comment.key},
    ${ds.dataStructure.order.create_on.key}, 
    ${ds.dataStructure.order.latest_modify.key}
    FROM ${ds.dataStructure.order.table_name} WHERE ${ds.dataStructure.order.id.key} IN (
        SELECT ${ds.dataStructure.order.id.key} FROM (
            SELECT ${ds.dataStructure.order.id.key}, unnest(${ds.dataStructure.order.items.key}) AS items_list FROM ${ds.dataStructure.order.table_name}
            ) AS selected_items_list  WHERE (selected_items_list.items_list).${ds.dataStructure.OrderItem.name.key} = '${String(itemName)}' );`;

    return Db.query(command)
}

function queryOrderList(count, offset){
    Util.checkInt(count)
    Util.checkInt(offset)

    let row_counts = ""
    let row_offset = ""
    if(count == -1){
    }else{
        row_counts = `LIMIT ${count}`;
    }

    if(offset < 0){
    }else{
        row_offset = `OFFSET ${offset}`;
    }

    let command = `SELECT 
    ${ds.dataStructure.order.id.key},
    ${ds.dataStructure.order.order_id.key},
    ${ds.dataStructure.order.buyer_name.key},
    ${ds.dataStructure.order.phone.key},
    ${ds.dataStructure.order.email.key},
    ${ds.dataStructure.order.bank_code.key},
    ${ds.dataStructure.order.bank_account.key},
    ${ds.dataStructure.order.country.key},
    ${ds.dataStructure.order.zip.key},
    ${ds.dataStructure.order.province.key},
    ${ds.dataStructure.order.county.key},
    ${ds.dataStructure.order.township.key},
    ${ds.dataStructure.order.village.key},
    ${ds.dataStructure.order.road.key},
    array_to_json(${ds.dataStructure.order.items.key}) AS ${ds.dataStructure.order.items.key},
    ${ds.dataStructure.order.total_price.key},
    ${ds.dataStructure.order.unit.key},
    ${ds.dataStructure.order.total_quantity.key},
    ${ds.dataStructure.order.block_id.key},
    ${ds.dataStructure.order.block_link.key},
    ${ds.dataStructure.order.transaction_id.key},
    ${ds.dataStructure.order.agree_policy.key},
    ${ds.dataStructure.order.agree_promotion.key},
    ${ds.dataStructure.order.is_paid.key},
    ${ds.dataStructure.order.is_send.key},
    ${ds.dataStructure.order.is_recieved.key},
    row_to_json(${ds.dataStructure.order.comment.key}) AS ${ds.dataStructure.order.comment.key},
    ${ds.dataStructure.order.create_on.key}, 
    ${ds.dataStructure.order.latest_modify.key}
    FROM ${ds.dataStructure.order.table_name} ORDER BY ${ds.dataStructure.order.latest_modify.key} DESC ${row_counts} ${row_offset};`

    return Db.query(command)
}

function insertOrder(buyer_name, phone, email, bank_code, bank_account, country, zip, province, county, township, village, road, items, total_price, unit, total_quantity, block_id, block_link, transaction_id, agree_policy, agree_promotion, is_paid, is_send, is_recieved, comment) {
    Util.checkString(buyer_name, 'DbOrder.insertOrder buyer_name')
    Util.checkString(phone, 'DbOrder.insertOrder phone')
    Util.checkString(email, 'DbOrder.insertOrder email')
    Util.checkString(bank_code, 'DbOrder.insertOrder bank_code')
    Util.checkString(bank_account, 'DbOrder.insertOrder bank_account')
    Util.checkString(country, 'DbOrder.insertOrder country')
    Util.checkString(province, 'DbOrder.insertOrder province')
    Util.checkString(county, 'DbOrder.insertOrder county')
    Util.checkString(zip, 'DbOrder.insertOrder zip')
    Util.checkString(township, 'DbOrder.insertOrder township')
    Util.checkString(village, 'DbOrder.insertOrder village')
    Util.checkString(road, 'DbOrder.insertOrder road')
    Util.checkArray(items, 'DbOrder.insertOrder items')
    Util.checkNumber(total_price, 'DbOrder.insertOrder total_price')
    Util.checkString(unit, 'DbOrder.insertOrder unit')
    Util.checkInt(total_quantity, 'DbOrder.insertOrder total_quantity')
    let re_block_id = Util.checkString(block_id, 'DbOrder.insertOrder block_id', false)
    let re_block_link = Util.checkString(block_link, 'DbOrder.insertOrder block_link', false)
    let re_transaction_id = Util.checkString(transaction_id, 'DbOrder.insertOrder transaction_id', false)
    Util.checkBool(agree_policy, 'DbOrder.insertOrder agree_policy')
    Util.checkBool(agree_promotion, 'DbOrder.insertOrder agree_promotion')
    Util.checkBool(is_paid, 'DbOrder.insertOrder is_paid')
    Util.checkBool(is_send, 'DbOrder.insertOrder is_send')
    Util.checkBool(is_recieved, 'DbOrder.insertOrder is_recieved')
    let re_comment = Util.checkObject(comment, 'DbAppData.insertOrder comment', false)

    if(re_block_id === null) {
        re_block_id = `null`
    }else{
        re_block_id = `'${re_block_id}'`
    }

    if(re_block_link === null) {
        re_block_link = `null`
    }else{
        re_block_link = `'${re_block_link}'`
    }

    if(re_transaction_id === null) {
        re_transaction_id = `null`
    }else{
        re_transaction_id = `'${re_transaction_id}'`
    }

    if(re_comment === null){
        re_comment = `null`
    }else{
        re_comment = `json_populate_record(null::Comment, '${JSON.stringify(re_comment)}')`
    }

    let command = `INSERT INTO ${ds.dataStructure.order.table_name}(
        ${ds.dataStructure.order.buyer_name.key},
        ${ds.dataStructure.order.phone.key},
        ${ds.dataStructure.order.email.key},
        ${ds.dataStructure.order.bank_code.key},
        ${ds.dataStructure.order.bank_account.key},
        ${ds.dataStructure.order.country.key},
        ${ds.dataStructure.order.zip.key},
        ${ds.dataStructure.order.province.key},
        ${ds.dataStructure.order.county.key},
        ${ds.dataStructure.order.township.key},
        ${ds.dataStructure.order.village.key},
        ${ds.dataStructure.order.road.key},
        ${ds.dataStructure.order.items.key},
        ${ds.dataStructure.order.total_price.key},
        ${ds.dataStructure.order.unit.key},
        ${ds.dataStructure.order.total_quantity.key},
        ${ds.dataStructure.order.block_id.key},
        ${ds.dataStructure.order.block_link.key},
        ${ds.dataStructure.order.transaction_id.key},
        ${ds.dataStructure.order.agree_policy.key},
        ${ds.dataStructure.order.agree_promotion.key},
        ${ds.dataStructure.order.is_paid.key},
        ${ds.dataStructure.order.is_send.key},
        ${ds.dataStructure.order.is_recieved.key},
        ${ds.dataStructure.order.comment.key})
        VALUES('${buyer_name}', '${phone}', '${email}', '${bank_code}', '${bank_account}', '${country}', '${zip}', '${province}', '${county}', '${township}', 
        '${village}', '${road}', ARRAY(SELECT json_populate_record(null::OrderItem, json_array_elements('${JSON.stringify(items)}'))), 
        '${total_price}', '${total_price}', '${total_quantity}', ${re_block_id}, ${re_block_link}, ${re_transaction_id}, '${agree_policy}', '${agree_promotion}', '${is_paid}', '${is_send}', '${is_recieved}', ${re_comment}
        ) RETURNING ${ds.dataStructure.order.id.key};`;
    return Db.query(command)
}

function insertDummy(){
    let items = [
        {id: 1, name: "Green Tea", quantity: 1, price: 300, unit: "NTD"},
        {id: 2, name: "Oolong Tea", quantity: 2, price: 200, unit: "NTD"}
    ]
    
    let comment = {note: "First", ext: {}}
    for(let i=0; i<5; i++){
        insertOrder(
            "Da", 
            "0908293456", 
            "example@gmail.com", 
            "301", 
            "88882222444", 
            "Taiwan", 
            "50010", 
            "Taiwan", 
            "Nantou", 
            "LuGu", 
            "FongHuang", 
            "indus.rd", 
            items, 
            700, 
            "NTD", 
            3, 
            undefined, 
            undefined, 
            undefined, 
            true, 
            true, 
            true, 
            true, 
            false, 
            comment
        )
    }
    
}

// createCommentType()
// creatSellTypeType()
// creatOrderItemType()
// createOrdersTable()

// let comment = {note: "First", ext: {}}
// let items = [
//     {id: 1, name: "Green Tea", quantity: 1, price: 300, unit: "NTD"},
//     {id: 2, name: "Oolong Tea", quantity: 2, price: 200, unit: "NTD"}
// ]
// queryOrdersCountAll()

// queryOrderById(1)
// queryOrderByItemId(1)
// queryOrderByItemName('Oolong Tea')
// queryOrderByBuyerName('Da')
// queryOrderList(-1,1)


exports.createCommentType = createCommentType;
exports.createSellTypeType = createSellTypeType;
exports.createOrderItemType = createOrderItemType;
exports.createExtensionUuid = createExtensionUuid;
exports.createOrdersTable = createOrdersTable;
exports.queryOrdersCountAll = queryOrdersCountAll;
exports.insertOrder = insertOrder;
exports.queryOrderById = queryOrderById;
exports.queryOrderByBuyerName = queryOrderByBuyerName;
exports.queryOrderList = queryOrderList;
exports.queryOrderByItemId = queryOrderByItemId;
exports.queryOrderByItemName = queryOrderByItemName;
exports.insertDummy = insertDummy