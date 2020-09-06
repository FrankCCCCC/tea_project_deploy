const ds = require('./dataStructure');
const Util = require('../util/Util');
const dbConfig = require('../config/dbConfig')
const Db = require('./Db')

/**
 * The createGoodType function would create a type called 'Good' in Postgres DB
 */
function createGoodType(){
    let command = `DO $$ BEGIN
        CREATE TYPE ${ds.dataStructure.Good.type_name} AS (${ds.dataStructure.Good.id.schema}, ${ds.dataStructure.Good.name.schema});
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`;

    return Db.query(command)
}

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

function createFarmersTable(){
    let command = `CREATE TABLE IF NOT EXISTS ${ds.dataStructure.farmer.table_name}(
    ${ds.dataStructure.farmer.id.schema},
    ${ds.dataStructure.farmer.name.schema},
    ${ds.dataStructure.farmer.cover_img.schema},
    ${ds.dataStructure.farmer.items.schema},
    ${ds.dataStructure.farmer.comment.schema},
    ${ds.dataStructure.farmer.create_on.schema},
    ${ds.dataStructure.farmer.latest_modify.schema})`;

    return Db.query(command)
}

function queryFarmersCountAll(){
    let command = `SELECT COUNT(*) FROM ${ds.dataStructure.farmer.table_name};`;
    return Db.query(command)
}

function queryFarmerById(farmerId){
    Util.checkInt(farmerId, "DbFarmer.queryFarmerById farmerId")

    let command = `SELECT 
    ${ds.dataStructure.farmer.id.key},
    ${ds.dataStructure.farmer.name.key},
    ${ds.dataStructure.farmer.cover_img.key},
    array_to_json(${ds.dataStructure.farmer.items.key}) AS ${ds.dataStructure.farmer.items.key},
    row_to_json(${ds.dataStructure.farmer.comment.key}) AS ${ds.dataStructure.farmer.comment.key},
    ${ds.dataStructure.farmer.create_on.key}, 
    ${ds.dataStructure.farmer.latest_modify.key}
    FROM ${ds.dataStructure.farmer.table_name} WHERE ${ds.dataStructure.farmer.id.key} = '${parseInt(farmerId, 10)}';`;

    return Db.query(command)
}

function queryFarmerByName(farmerName){
    Util.checkString(farmerName, 'DbFarmer.queryFarmerByName farmerName')

    let command = `SELECT 
    ${ds.dataStructure.farmer.id.key},
    ${ds.dataStructure.farmer.name.key},
    ${ds.dataStructure.farmer.cover_img.key},
    array_to_json(${ds.dataStructure.farmer.items.key}) AS ${ds.dataStructure.farmer.items.key},
    row_to_json(${ds.dataStructure.farmer.comment.key}) AS ${ds.dataStructure.farmer.comment.key},
    ${ds.dataStructure.farmer.create_on.key}, 
    ${ds.dataStructure.farmer.latest_modify.key}
    FROM ${ds.dataStructure.farmer.table_name} WHERE ${ds.dataStructure.farmer.name.key} = '${String(farmerName)}';`;

    return Db.query(command)
}

function queryFarmerByItemId(itemId){
    Util.checkInt(itemId, "DbFarmer.queryFarmerByItemId itemId")

    let command = `SELECT 
    ${ds.dataStructure.farmer.id.key},
    ${ds.dataStructure.farmer.name.key},
    ${ds.dataStructure.farmer.cover_img.key},
    array_to_json(${ds.dataStructure.farmer.items.key}) AS ${ds.dataStructure.farmer.items.key},
    row_to_json(${ds.dataStructure.farmer.comment.key}) AS ${ds.dataStructure.farmer.comment.key},
    ${ds.dataStructure.farmer.create_on.key}, 
    ${ds.dataStructure.farmer.latest_modify.key}
    FROM ${ds.dataStructure.farmer.table_name} WHERE ${ds.dataStructure.farmer.id.key} IN (
        SELECT ${ds.dataStructure.farmer.id.key} FROM (
            SELECT ${ds.dataStructure.farmer.id.key}, unnest(${ds.dataStructure.farmer.items.key}) AS items_list FROM ${ds.dataStructure.farmer.table_name}
            ) AS selected_items_list  WHERE (selected_items_list.items_list).${ds.dataStructure.Good.id.key} = '${parseInt(itemId, 10)}' );`;

    return Db.query(command)
}

function queryFarmerByItemName(itemName){
    Util.checkString(itemName, 'DbFarmer.queryFarmerByItemName itemName')

    let command = `SELECT 
    ${ds.dataStructure.farmer.id.key},
    ${ds.dataStructure.farmer.name.key},
    ${ds.dataStructure.farmer.cover_img.key},
    array_to_json(${ds.dataStructure.farmer.items.key}) AS ${ds.dataStructure.farmer.items.key},
    row_to_json(${ds.dataStructure.farmer.comment.key}) AS ${ds.dataStructure.farmer.comment.key},
    ${ds.dataStructure.farmer.create_on.key}, 
    ${ds.dataStructure.farmer.latest_modify.key}
    FROM ${ds.dataStructure.farmer.table_name} WHERE ${ds.dataStructure.farmer.id.key} IN (
        SELECT ${ds.dataStructure.farmer.id.key} FROM (
            SELECT ${ds.dataStructure.farmer.id.key}, unnest(${ds.dataStructure.farmer.items.key}) AS items_list FROM ${ds.dataStructure.farmer.table_name}
            ) AS selected_items_list  WHERE (selected_items_list.items_list).${ds.dataStructure.Good.name.key} = '${String(itemName)}' );`;

    return Db.query(command)
}

function queryFarmerList(count, offset){
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
    ${ds.dataStructure.farmer.id.key},
    ${ds.dataStructure.farmer.name.key},
    ${ds.dataStructure.farmer.cover_img.key},
    array_to_json(${ds.dataStructure.farmer.items.key}) AS ${ds.dataStructure.farmer.items.key},
    row_to_json(${ds.dataStructure.farmer.comment.key}) AS ${ds.dataStructure.farmer.comment.key},
    ${ds.dataStructure.farmer.create_on.key}, 
    ${ds.dataStructure.farmer.latest_modify.key}
    FROM ${ds.dataStructure.farmer.table_name} ORDER BY ${ds.dataStructure.farmer.latest_modify.key} DESC ${row_counts} ${row_offset};`

    return Db.query(command)
}

function insertFarmer(name, cover_img, items, comment) {
    Util.checkString(name, 'DbFarmer.insertFarmer name')
    Util.checkString(cover_img, 'DbFarmer.insertFarmer cover_img')
    let re_items = Util.checkArray(items, 'DbFarmer.insertFarmer items', false)
    let re_comment = Util.checkObject(comment, 'DbFarmer.insertOrder comment', false)

    if(re_items === null){
        re_items = `null`
    }else{
        re_items = `ARRAY(SELECT json_populate_record(null::Good, json_array_elements('${JSON.stringify(items)}')))`
    }

    if(re_comment === null){
        re_comment = `null`
    }else{
        re_comment = `json_populate_record(null::Comment, '${JSON.stringify(re_comment)}')`
    }

    let command = `INSERT INTO ${ds.dataStructure.farmer.table_name}(
        ${ds.dataStructure.farmer.name.key},
        ${ds.dataStructure.farmer.cover_img.key},
        ${ds.dataStructure.farmer.items.key},
        ${ds.dataStructure.farmer.comment.key})
        VALUES('${name}', '${cover_img}', ${re_items}, ${re_comment}) RETURNING ${ds.dataStructure.farmer.id.key};`;
        
    return Db.query(command)
}

function insertDummy(){
    let comment = {note: "First", ext: {}}

    let items = [
        {id: 2, name: "Green Tea",},
        {id: 1, name: "Oolong Tea"}
    ]

    for(let i=0; i<5; i++){
        insertFarmer("Da", "farmer1.jpg", items, comment)
    }
}
// queryFarmersCountAll()
// createGoodType()
// createSectionType()
// createFarmersTable()



// queryFarmerById(1)
// queryFarmerByItemId(1)
// queryFarmerByItemName('Oolong Tea')
// queryFarmerList(-1,1)


exports.createGoodType = createGoodType;
exports.createCommentType = createCommentType;
exports.createFarmersTable = createFarmersTable;
exports.queryFarmersCountAll = queryFarmersCountAll;
exports.insertFarmer = insertFarmer;
exports.queryFarmerById = queryFarmerById;
exports.queryFarmerByName = queryFarmerByName;
exports.queryFarmerList = queryFarmerList;
exports.queryFarmerByItemId = queryFarmerByItemId;
exports.queryFarmerByItemName = queryFarmerByItemName;
exports.insertDummy = insertDummy;