const ds = require('./dataStructure');
const Util = require('../util/Util');
// const dbConfig = require('../config/dbConfig')
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
 * The createAppDatasTable function would create a table called 'createAppDatasTable' in Postgres DB
 * The table depends on  Type 'Comment'.
 */
function createAppDatasTable(){
    let command = `CREATE TABLE IF NOT EXISTS ${ds.dataStructure.app_data.table_name}(
    ${ds.dataStructure.app_data.id.schema},
    ${ds.dataStructure.app_data.property.schema},
    ${ds.dataStructure.app_data.data.schema},
    ${ds.dataStructure.app_data.comment.schema},
    ${ds.dataStructure.app_data.create_on.schema},
    ${ds.dataStructure.app_data.latest_modify.schema})`;

    return Db.query(command)
}

/**
 * The queryAppDatasCountAll function would query the number of rows in the table 'createAppDatasTable'
 */
function queryAppDatasCountAll(){
    let command = `SELECT COUNT(*) FROM ${ds.dataStructure.app_data.table_name};`;
    return Db.query(command)
}

/**
 * The queryAppDataById function would query the specific data in the table 'createAppDatasTable' according to the parameter appDataId
 * @param {Integer} appDataId - The id of the query data
 */
function queryAppDataById(appDataId){
    Util.checkInt(appDataId, "DbAppData.queryAppDataById appDataId")

    let command = `SELECT 
    ${ds.dataStructure.app_data.id.key},
    ${ds.dataStructure.app_data.property.key},
    ${ds.dataStructure.app_data.data.key},
    row_to_json(${ds.dataStructure.app_data.comment.key}) AS ${ds.dataStructure.app_data.comment.key},
    ${ds.dataStructure.app_data.create_on.key}, 
    ${ds.dataStructure.app_data.latest_modify.key}
    FROM ${ds.dataStructure.app_data.table_name} WHERE ${ds.dataStructure.app_data.id.key} = '${parseInt(appDataId, 10)}';`;

    return Db.query(command)
}

/**
 * The queryAppDataByProperty function would query the specific data in the table 'createAppDatasTable' according to the parameter appDataProperty
 * @param {String} appDataProperty - The property of the query data
 */
function queryAppDataByProperty(appDataProperty){
    Util.checkString(appDataProperty, 'DbAppData.queryAppDataByProperty appDataProperty')

    let command = `SELECT 
    ${ds.dataStructure.app_data.id.key},
    ${ds.dataStructure.app_data.property.key},
    ${ds.dataStructure.app_data.data.key},
    row_to_json(${ds.dataStructure.app_data.comment.key}) AS ${ds.dataStructure.app_data.comment.key},
    ${ds.dataStructure.app_data.create_on.key}, 
    ${ds.dataStructure.app_data.latest_modify.key}
    FROM ${ds.dataStructure.app_data.table_name} WHERE ${ds.dataStructure.app_data.property.key} = '${String(appDataProperty)}';`;

    return Db.query(command)
}

// function queryAppDataByItemId(itemId){
//     Util.checkInt(itemId, "DbAppData.queryAppDataByItemId itemId")

//     let command = `SELECT 
//     ${ds.dataStructure.app_data.id.key},
//     ${ds.dataStructure.app_data.name.key},
//     ${ds.dataStructure.app_data.country.key},
//     ${ds.dataStructure.app_data.province.key},
//     ${ds.dataStructure.app_data.county.key},
//     ${ds.dataStructure.app_data.township.key},
//     ${ds.dataStructure.app_data.village.key},
//     ${ds.dataStructure.app_data.road.key},
//     ${ds.dataStructure.app_data.slogan.key},
//     ${ds.dataStructure.app_data.description.key},
//     array_to_json(${ds.dataStructure.app_data.content.key}) AS ${ds.dataStructure.app_data.content.key},
//     array_to_json(${ds.dataStructure.app_data.items.key}) AS ${ds.dataStructure.app_data.items.key},
//     ${ds.dataStructure.app_data.cover_img.key},
//     array_to_json(${ds.dataStructure.app_data.imgs.key}) AS ${ds.dataStructure.app_data.imgs.key},
//     ${ds.dataStructure.app_data.create_on.key}, 
//     ${ds.dataStructure.app_data.latest_modify.key}
//     FROM ${ds.dataStructure.app_data.table_name} WHERE ${ds.dataStructure.app_data.id.key} IN (
//         SELECT ${ds.dataStructure.app_data.id.key} FROM (
//             SELECT ${ds.dataStructure.app_data.id.key}, unnest(${ds.dataStructure.app_data.items.key}) AS items_list FROM ${ds.dataStructure.app_data.table_name}
//             ) AS selected_items_list  WHERE (selected_items_list.items_list).${ds.dataStructure.Good.id.key} = '${parseInt(itemId, 10)}' );`;

//     return Db.query(command)
// }

// function queryAppDataByItemName(itemName){
//     Util.checkString(itemName, 'DbAppData.queryAppDataByItemName itemName')

//     let command = `SELECT 
//     ${ds.dataStructure.app_data.id.key},
//     ${ds.dataStructure.app_data.name.key},
//     ${ds.dataStructure.app_data.country.key},
//     ${ds.dataStructure.app_data.province.key},
//     ${ds.dataStructure.app_data.county.key},
//     ${ds.dataStructure.app_data.township.key},
//     ${ds.dataStructure.app_data.village.key},
//     ${ds.dataStructure.app_data.road.key},
//     ${ds.dataStructure.app_data.slogan.key},
//     ${ds.dataStructure.app_data.description.key},
//     array_to_json(${ds.dataStructure.app_data.content.key}) AS ${ds.dataStructure.app_data.content.key},
//     array_to_json(${ds.dataStructure.app_data.items.key}) AS ${ds.dataStructure.app_data.items.key},
//     ${ds.dataStructure.app_data.cover_img.key},
//     array_to_json(${ds.dataStructure.app_data.imgs.key}) AS ${ds.dataStructure.app_data.imgs.key},
//     ${ds.dataStructure.app_data.create_on.key}, 
//     ${ds.dataStructure.app_data.latest_modify.key}
//     FROM ${ds.dataStructure.app_data.table_name} WHERE ${ds.dataStructure.app_data.id.key} IN (
//         SELECT ${ds.dataStructure.app_data.id.key} FROM (
//             SELECT ${ds.dataStructure.app_data.id.key}, unnest(${ds.dataStructure.app_data.items.key}) AS items_list FROM ${ds.dataStructure.app_data.table_name}
//             ) AS selected_items_list  WHERE (selected_items_list.items_list).${ds.dataStructure.Good.name.key} = '${String(itemName)}' );`;

//     return Db.query(command)
// }
/**
 * The queryAppDataList function would query a list of the data in the table 'createAppDatasTable' according to the parameter count and offset
 * @param {Integer} count - The length of the queried list data
 * @param {Integer} offset - The shift offset of the query data. It would skip off the data before the offset
 */
function queryAppDataList(count, offset){
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
    ${ds.dataStructure.app_data.id.key},
    ${ds.dataStructure.app_data.property.key},
    ${ds.dataStructure.app_data.data.key},
    row_to_json(${ds.dataStructure.app_data.comment.key}) AS ${ds.dataStructure.app_data.comment.key},
    ${ds.dataStructure.app_data.create_on.key}, 
    ${ds.dataStructure.app_data.latest_modify.key}
    FROM ${ds.dataStructure.app_data.table_name} ORDER BY ${ds.dataStructure.app_data.latest_modify.key} DESC ${row_counts} ${row_offset};`

    return Db.query(command)
}

/**
 * The insertAppData function would insert the data into the table 'createAppDatasTable'
 * @param {Integer} property - The name of the attribute
 * @param {Object} data - The value of the attribute
 * @param {Object} comment - The comment of the attribute
 */
function insertAppData(property, data, comment) {
    Util.checkString(property, 'DbAppData.insertAppData property')
    let reData = Util.checkObject(data, 'DbAppData.insertAppData data', false)
    let reComment = Util.checkObject(comment, 'DbAppData.insertAppData comment', false)

    if(reData === null) {
        reData = `null`
    }else{
        reData = `'${JSON.stringify(reData)}'`
    }

    if(reComment === null){
        reComment = `null`
    }else{
        reComment = `json_populate_record(null::Comment, '${JSON.stringify(reComment)}')`
    }

    let command = `INSERT INTO ${ds.dataStructure.app_data.table_name}(
        ${ds.dataStructure.app_data.property.key},
        ${ds.dataStructure.app_data.data.key},
        ${ds.dataStructure.app_data.comment.key})
        VALUES('${property}', ${reData}, ${reComment}
        ) RETURNING ${ds.dataStructure.app_data.id.key};`;
    return Db.query(command)
}

function insertDummy(){
    let comment = {note: "", ext: null}
    const sliderInput = [{
        id: 1,
        media: "tea_farmer.gif",
        caption_title: "南投鹿谷鳳凰村",
        caption_subtitle: "南投鹿谷鳳凰村",
        link: "https://www.youtube.com/watch?v=DGAs2Ld-Uyo&feature=youtu.be&fbclid=IwAR2Hvh3AVWSESXap6Ykjmfr2AXh80OZsps8EJP4eKSviOzVd2va8fi3Ake8"
      },
      {
        id: 2,
        media: "hill1.jpg",
        caption_title: "Leafhopper",
        caption_subtitle: "Leafhopper"
      },
      {
        id: 3,
        media: "tea.jpg",
        caption_title: "林氏凍頂烏龍茶",
        caption_subtitle: "林氏凍頂烏龍茶"
      }];
    insertAppData(`home_slider`, sliderInput, comment)
    const galleryInput = [{
        img: "farmer1.jpg",
        caption_title: "陳朝鳳",
        caption_subtitle: "鹿谷 凍頂",
        title: "陳朝鳳",
        subtitle: "鹿谷 凍頂",
        id: 1
      },
      {
        img: "farmer2.jpg",
        caption_title: "張大春",
        caption_subtitle: "鹿谷 鳳凰",
        title: "張大春",
        subtitle: "鹿谷 鳳凰",
        id: 2
      },
      {
        img: "farmer3.jpg",
        caption_title: "林大宇",
        caption_subtitle: "鹿谷 鳳凰",
        title: "林大宇",
        subtitle: "鹿谷 鳳凰",
        id: 3
      },
      {
        img: "farmer4.jpg",
        caption_title: "林大宇",
        caption_subtitle: "鹿谷 鳳凰",
        title: "林大宇",
        subtitle: "鹿谷 鳳凰",
        id: 1
      },
      {
        img: "tea_tree.jpg",
        caption_title: "林大宇",
        caption_subtitle: "鹿谷 鳳凰",
        title: "林大宇",
        subtitle: "鹿谷 鳳凰",
        id: 1
      },
      {
        img: "child.jpg",
        caption_title: "林大宇",
        caption_subtitle: "鹿谷 鳳凰",
        title: "林大宇",
        subtitle: "鹿谷 鳳凰",
        id: 1
      },
      {
        img: "farmer7.jpg",
        caption_title: "林大宇",
        caption_subtitle: "鹿谷 鳳凰",
        title: "林大宇",
        subtitle: "鹿谷 鳳凰",
        id: 1
      }]
      insertAppData(`home_gallery`, galleryInput, comment)
    for(let i=0; i<5; i++){
        let now = new Date
        insertAppData(`Test ${now.toISOString()}`, undefined, comment)
    }
}

// createCommentType()
// createAppDatasTable()


// let comment = {note: "", ext: null}


// console.log(queryAppDatasCountAll())
// for(let i=0; i<4; i++){
//     let now = new Date
//     insertAppData(`Test ${now.toISOString()}`, undefined, comment)
// }
// console.log(queryAppDataById(1))
// console.log(queryAppDataByProperty("test"))

// console.log(queryAppDataList(-1,0))


exports.createCommentType = createCommentType;
exports.createAppDatasTable = createAppDatasTable;
exports.queryAppDatasCountAll = queryAppDatasCountAll;
exports.insertAppData = insertAppData;
exports.queryAppDataById = queryAppDataById;
exports.queryAppDataByProperty = queryAppDataByProperty;
exports.queryAppDataList = queryAppDataList;
exports.insertDummy = insertDummy
// exports.queryAppDataByItemId = queryAppDataByItemId;
// exports.queryAppDataByItemName = queryAppDataByItemName;