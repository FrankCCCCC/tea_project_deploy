const Db = require('./Db')
const ds = require('./dataStructure');
const Util = require('../util/Util');

function createSpecType(){
    let command = `
    DO $$ BEGIN
        CREATE TYPE ${ds.dataStructure.Spec.type_name} AS (${ds.dataStructure.Spec.property.schema}, ${ds.dataStructure.Spec.value.schema});
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`;
    return Db.query(command)
}

function createCommentType(){
    let command = `DO $$ BEGIN
        CREATE TYPE ${ds.dataStructure.Comment.type_name} AS (${ds.dataStructure.Comment.note.schema}, ${ds.dataStructure.Comment.ext.schema});
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`;

    return Db.query(command)
}

function createSellTypeType(){
    let command = `DO $$ BEGIN
        CREATE TYPE ${ds.dataStructure.SellType.type_name} AS 
            ${ds.dataStructure.SellType.schema};
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`;

    return Db.query(command)
}

function createSectionType(){
    let command = `DO $$ BEGIN
        CREATE TYPE ${ds.dataStructure.Section.type_name} AS (
            ${ds.dataStructure.Section.display.schema}, 
            ${ds.dataStructure.Section.img.schema}, 
            ${ds.dataStructure.Section.backgroundColor.schema}, 
            ${ds.dataStructure.Section.title.schema},
            ${ds.dataStructure.Section.subtitle.schema}, 
            ${ds.dataStructure.Section.description.schema},
            ${ds.dataStructure.Section.data.schema});
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`;

    return Db.query(command)
}

function createCertificationType(){
    let command = `DO $$ BEGIN
        CREATE TYPE ${ds.dataStructure.Certification.type_name} AS (
            ${ds.dataStructure.Certification.name.schema}, 
            ${ds.dataStructure.Certification.link.schema});
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;`;

    return Db.query(command)
}

function createItemsTable(){
    let command = `
    CREATE TABLE IF NOT EXISTS ${ds.dataStructure.item.table_name}(
    ${ds.dataStructure.item.id.schema},
    ${ds.dataStructure.item.enable.schema},
    ${ds.dataStructure.item.name.schema},
    ${ds.dataStructure.item.producer_id.schema},
    ${ds.dataStructure.item.producer_name.schema},
    ${ds.dataStructure.item.country.schema},
    ${ds.dataStructure.item.zip.schema},
    ${ds.dataStructure.item.province.schema},
    ${ds.dataStructure.item.county.schema},
    ${ds.dataStructure.item.township.schema},
    ${ds.dataStructure.item.village.schema},
    ${ds.dataStructure.item.road.schema},
    ${ds.dataStructure.item.sell_type.schema},
    ${ds.dataStructure.item.price.schema},
    ${ds.dataStructure.item.unit.schema},
    ${ds.dataStructure.item.amount.schema},
    ${ds.dataStructure.item.sold.schema},
    ${ds.dataStructure.item.slogan.schema},
    ${ds.dataStructure.item.description.schema},
    ${ds.dataStructure.item.content.schema},
    ${ds.dataStructure.item.certification.schema},
    ${ds.dataStructure.item.spec.schema},
    ${ds.dataStructure.item.cover_img.schema}, 
    ${ds.dataStructure.item.imgs.schema}, 
    ${ds.dataStructure.item.block_id.schema}, 
    ${ds.dataStructure.item.block_link.schema}, 
    ${ds.dataStructure.item.transaction_id.schema}, 
    ${ds.dataStructure.item.traceability_link.schema}, 
    ${ds.dataStructure.item.comment.schema}, 
    ${ds.dataStructure.item.create_on.schema}, 
    ${ds.dataStructure.item.latest_modify.schema}, 
    ${ds.dataStructure.item.expire_on.schema}, 
    ${ds.dataStructure.item.is_limited.schema}, 
    ${ds.dataStructure.item.has_expiration.schema},
    ${ds.dataStructure.item.constraint.schema});`
    
    return Db.query(command)
    
}

function insertItem(name, producer_id, producer_name, country, zip, province, county, township, village, road, sell_type, price, unit, amount, slogan, description, content, certification, spec, cover_img, imgs, block_id, block_link, transaction_id, traceability_link, comment, expire_on, is_limited, has_expiration){
    // Util.checkBoolean(enable, `DbItem.insertItem enable`)
    Util.checkString(name, `DbItem.insertItem name`)
    Util.checkInt(producer_id, `DbItem.insertItem producer_id`)
    Util.checkString(producer_name, `DbItem.insertItem producer_name`)
    Util.checkString(country, `DbItem.insertItem country`)
    Util.checkString(zip, `DbItem.insertItem zip`)
    Util.checkString(province, `DbItem.insertItem province`)
    Util.checkString(county, `DbItem.insertItem county`)
    Util.checkString(township, `DbItem.insertItem township`)
    Util.checkString(village, `DbItem.insertItem village`)
    Util.checkString(road, `DbItem.insertItem road`)
    Util.checkString(sell_type, `DbItem.insertItem sell_type`)
    Util.checkNumber(price, `DbItem.insertItem price`)
    Util.checkString(unit, `DbItem.insertItem unit`)
    let re_amount = Util.checkInt(amount, `DbItem.insertItem amount`, false)
    let re_slogan = Util.checkString(slogan, `DbItem.insertItem slogan`, false)
    Util.checkString(description, `DbItem.insertItem description`)
    Util.checkArray(content, 'DbItem.insertItem content')
    let re_certification = Util.checkObject(certification, 'DbItem.insertItem certification', false)
    let re_spec = Util.checkArray(spec, `DbItem.insertItem spec`, false)
    Util.checkString(cover_img, `DbItem.insertItem cover_img`)
    let re_imgs =  Util.checkArray(imgs, `DbItem.insertItem imgs`, false)
    let re_block_id = Util.checkString(block_id, `DbItem.insertItem block_id`, false)
    let re_block_link = Util.checkString(block_link, `DbItem.insertItem block_link`, false)
    let re_transaction_id = Util.checkString(transaction_id, `DbItem.insertItem transaction_id`, false)
    let re_traceability_link = Util.checkString(traceability_link, `DbItem.insertItem traceability_link`, false)
    let re_comment =  Util.checkObject(comment, 'DbItem.insertItem comment', false)
    let re_expire_on =  Util.checkString(expire_on, 'DbItem.insertItem expire_on', false)
    Util.checkBool(is_limited, 'DbItem.insertItem is_limited')
    Util.checkBool(has_expiration, 'DbItem.insertItem has_expiration')

    var description_new = description.replace(/'/g, `''`);

    re_amount = Util.nullhandler(re_amount, `'${re_amount}'`)
    re_slogan = Util.nullhandler(re_slogan, `'${re_slogan}'`)
    re_certification = Util.nullhandler(re_certification, `ARRAY( SELECT json_populate_record(null::Certification, json_array_elements('${JSON.stringify(re_certification)}')))`)
    re_spec = Util.nullhandler(re_spec, `ARRAY( SELECT json_populate_record(null::Spec, json_array_elements('${JSON.stringify(re_spec)}')))`)
    re_imgs = Util.nullhandler(re_imgs, `ARRAY(SELECT json_array_elements_text('${JSON.stringify(re_imgs)}'))`)
    re_block_id = Util.nullhandler(re_block_id, `'${re_block_id}'`)
    re_block_link = Util.nullhandler(re_block_link, `'${re_block_link}'`)
    re_transaction_id = Util.nullhandler(re_transaction_id, `'${re_transaction_id}'`)
    re_traceability_link = Util.nullhandler(re_traceability_link, `'${re_traceability_link}'`)
    re_comment = Util.nullhandler(re_comment, `json_populate_record(null::Comment, '${JSON.stringify(re_comment)}')`)
    re_expire_on = Util.nullhandler(re_expire_on, `'${re_expire_on}'`)
    

    // if(re_amount === null) {
    //     re_amount = `null`
    // }else{
    //     re_amount = `'${re_amount}'`
    // }

    // if(re_slogan === null) {
    //     re_slogan = `null`
    // }else{
    //     re_slogan = `'${re_slogan}'`
    // }

    // if(re_certification === null) {
    //     re_certification = `null`
    // }else{
    //     re_certification = `ARRAY( SELECT json_populate_record(null::Certification, json_array_elements('${JSON.stringify(re_certification)}')))`
    // }

    // if(re_spec === null) {
    //     re_spec = `null`
    // }else{
    //     re_spec = `ARRAY( SELECT json_populate_record(null::Spec, json_array_elements('${JSON.stringify(re_spec)}')))`
    // }

    // if(re_imgs === null){
    //     re_imgs = `null`
    // }else{
    //     re_imgs = `ARRAY(SELECT json_array_elements_text('${JSON.stringify(re_imgs)}'))`
    // }

    // if(re_comment === null){
    //     re_comment = `null`
    // }else{
    //     re_comment = `json_populate_record(null::Comment, '${JSON.stringify(re_comment)}')`
    // }

    // if(re_expire_on === null) {
    //     re_expire_on = `null`
    // }else{
    //     re_expire_on = `'${re_expire_on}'`
    // }

    let command = `
        INSERT INTO ${ds.dataStructure.item.table_name}(
            ${ds.dataStructure.item.enable.key},
            ${ds.dataStructure.item.name.key},
            ${ds.dataStructure.item.producer_id.key},
            ${ds.dataStructure.item.producer_name.key},
            ${ds.dataStructure.item.country.key},
            ${ds.dataStructure.item.zip.key},
            ${ds.dataStructure.item.province.key},
            ${ds.dataStructure.item.county.key},
            ${ds.dataStructure.item.township.key},
            ${ds.dataStructure.item.village.key},
            ${ds.dataStructure.item.road.key},
            ${ds.dataStructure.item.sell_type.key},
            ${ds.dataStructure.item.price.key},
            ${ds.dataStructure.item.unit.key},
            ${ds.dataStructure.item.amount.key},
            ${ds.dataStructure.item.sold.key},
            ${ds.dataStructure.item.slogan.key},
            ${ds.dataStructure.item.description.key},
            ${ds.dataStructure.item.content.key},
            ${ds.dataStructure.item.certification.key},
            ${ds.dataStructure.item.spec.key},
            ${ds.dataStructure.item.cover_img.key},
            ${ds.dataStructure.item.imgs.key},
            ${ds.dataStructure.item.block_id.key},
            ${ds.dataStructure.item.block_link.key},
            ${ds.dataStructure.item.transaction_id.key},
            ${ds.dataStructure.item.traceability_link.key},
            ${ds.dataStructure.item.comment.key},
            ${ds.dataStructure.item.expire_on.key},
            ${ds.dataStructure.item.is_limited.key},
            ${ds.dataStructure.item.has_expiration.key})
        VALUES('false', '${name}', '${producer_id}', '${producer_name}', '${country}', '${zip}', '${province}', '${county}', '${township}', '${village}', '${road}', '${sell_type}',
        '${price}', '${unit}', ${re_amount}, '0', ${re_slogan}, '${description_new}', ARRAY( SELECT json_populate_record(null::Section, json_array_elements('${JSON.stringify(content)}'))), ${re_certification}, ${re_spec}, '${cover_img}', ${re_imgs}, 
        ${re_block_id}, ${re_block_link}, ${re_transaction_id}, ${re_traceability_link}, 
        ${re_comment}, ${re_expire_on}, ${is_limited}, ${has_expiration}
        ) RETURNING id;`;
    return Db.query(command)
}

function queryItemsCountAll(){
    let command = `SELECT COUNT(*) FROM ${ds.dataStructure.item.table_name};`;
    return Db.query(command)
}

function queryItemById(itemId){
    Util.checkInt(itemId, `DbItem.queryItemById itemId`)
    let command = `SELECT 
        ${ds.dataStructure.item.id.key},
        ${ds.dataStructure.item.enable.key},
        ${ds.dataStructure.item.name.key},
        ${ds.dataStructure.item.producer_id.key},
        ${ds.dataStructure.item.producer_name.key},
        ${ds.dataStructure.item.country.key},
        ${ds.dataStructure.item.zip.key},
        ${ds.dataStructure.item.province.key},
        ${ds.dataStructure.item.county.key},
        ${ds.dataStructure.item.township.key},
        ${ds.dataStructure.item.village.key},
        ${ds.dataStructure.item.road.key},
        ${ds.dataStructure.item.sell_type.key},
        ${ds.dataStructure.item.price.key},
        ${ds.dataStructure.item.unit.key},
        ${ds.dataStructure.item.amount.key},
        ${ds.dataStructure.item.sold.key},
        ${ds.dataStructure.item.slogan.key},
        ${ds.dataStructure.item.description.key},
        array_to_json(${ds.dataStructure.item.content.key}) AS ${ds.dataStructure.item.content.key},
        array_to_json(${ds.dataStructure.item.certification.key}) AS ${ds.dataStructure.item.certification.key},
        array_to_json(${ds.dataStructure.item.spec.key}) AS ${ds.dataStructure.item.spec.key},
        ${ds.dataStructure.item.cover_img.key},
        array_to_json(${ds.dataStructure.item.imgs.key}) AS ${ds.dataStructure.item.imgs.key},
        ${ds.dataStructure.item.block_id.key},
        ${ds.dataStructure.item.block_link.key},
        ${ds.dataStructure.item.transaction_id.key},
        ${ds.dataStructure.item.traceability_link.key},
        row_to_json(${ds.dataStructure.item.comment.key}) AS ${ds.dataStructure.item.comment.key},
        ${ds.dataStructure.item.create_on.key},
        ${ds.dataStructure.item.latest_modify.key},
        ${ds.dataStructure.item.expire_on.key},
        ${ds.dataStructure.item.is_limited.key},
        ${ds.dataStructure.item.has_expiration.key}
    FROM ${ds.dataStructure.item.table_name} WHERE ${ds.dataStructure.item.id.key} = '${parseInt(itemId, 10)}';`;
    return Db.query(command)
}

function queryItemByName(itemName){
    Util.checkString(itemName, `DbItem.queryItemByName itemName`)
    let command = `SELECT 
    ${ds.dataStructure.item.id.key},
    ${ds.dataStructure.item.enable.key},
    ${ds.dataStructure.item.name.key},
    ${ds.dataStructure.item.producer_id.key},
    ${ds.dataStructure.item.producer_name.key},
    ${ds.dataStructure.item.country.key},
    ${ds.dataStructure.item.zip.key},
    ${ds.dataStructure.item.province.key},
    ${ds.dataStructure.item.county.key},
    ${ds.dataStructure.item.township.key},
    ${ds.dataStructure.item.village.key},
    ${ds.dataStructure.item.road.key},
    ${ds.dataStructure.item.sell_type.key},
    ${ds.dataStructure.item.price.key},
    ${ds.dataStructure.item.unit.key},
    ${ds.dataStructure.item.amount.key},
    ${ds.dataStructure.item.sold.key},
    ${ds.dataStructure.item.slogan.key},
    ${ds.dataStructure.item.description.key},
    array_to_json(${ds.dataStructure.item.content.key}) AS ${ds.dataStructure.item.content.key},
    array_to_json(${ds.dataStructure.item.certification.key}) AS ${ds.dataStructure.item.certification.key},
    array_to_json(${ds.dataStructure.item.spec.key}) AS ${ds.dataStructure.item.spec.key},
    ${ds.dataStructure.item.cover_img.key},
    array_to_json(${ds.dataStructure.item.imgs.key}) AS ${ds.dataStructure.item.imgs.key},
    ${ds.dataStructure.item.block_id.key},
    ${ds.dataStructure.item.block_link.key},
    ${ds.dataStructure.item.transaction_id.key},
    ${ds.dataStructure.item.traceability_link.key},
    row_to_json(${ds.dataStructure.item.comment.key}) AS ${ds.dataStructure.item.comment.key},
    ${ds.dataStructure.item.create_on.key},
    ${ds.dataStructure.item.latest_modify.key},
    ${ds.dataStructure.item.expire_on.key},
    ${ds.dataStructure.item.is_limited.key},
    ${ds.dataStructure.item.has_expiration.key}
    FROM ${ds.dataStructure.item.table_name} WHERE ${ds.dataStructure.item.name.key} = '${String(itemName)}';`;
    return Db.query(command)
}

function queryItemByProducerId(producerId){
    Util.checkInt(producerId, `DbItem.queryItemByProducerId producerId`)
    let command = `SELECT 
    ${ds.dataStructure.item.id.key},
        ${ds.dataStructure.item.enable.key},
        ${ds.dataStructure.item.name.key},
        ${ds.dataStructure.item.producer_id.key},
        ${ds.dataStructure.item.producer_name.key},
        ${ds.dataStructure.item.country.key},
        ${ds.dataStructure.item.zip.key},
        ${ds.dataStructure.item.province.key},
        ${ds.dataStructure.item.county.key},
        ${ds.dataStructure.item.township.key},
        ${ds.dataStructure.item.village.key},
        ${ds.dataStructure.item.road.key},
        ${ds.dataStructure.item.sell_type.key},
        ${ds.dataStructure.item.price.key},
        ${ds.dataStructure.item.unit.key},
        ${ds.dataStructure.item.amount.key},
        ${ds.dataStructure.item.sold.key},
        ${ds.dataStructure.item.slogan.key},
        ${ds.dataStructure.item.description.key},
        array_to_json(${ds.dataStructure.item.content.key}) AS ${ds.dataStructure.item.content.key},
        ${ds.dataStructure.item.certification.key},
        array_to_json(${ds.dataStructure.item.spec.key}) AS ${ds.dataStructure.item.spec.key},
        array_to_json(${ds.dataStructure.item.certification.key}) AS ${ds.dataStructure.item.certification.key},
        array_to_json(${ds.dataStructure.item.imgs.key}) AS ${ds.dataStructure.item.imgs.key},
        ${ds.dataStructure.item.block_id.key},
        ${ds.dataStructure.item.block_link.key},
        ${ds.dataStructure.item.transaction_id.key},
        ${ds.dataStructure.item.traceability_link.key},
        row_to_json(${ds.dataStructure.item.comment.key}) AS ${ds.dataStructure.item.comment.key},
        ${ds.dataStructure.item.create_on.key},
        ${ds.dataStructure.item.latest_modify.key},
        ${ds.dataStructure.item.expire_on.key},
        ${ds.dataStructure.item.is_limited.key},
        ${ds.dataStructure.item.has_expiration.key}
    FROM ${ds.dataStructure.item.table_name} WHERE ${ds.dataStructure.item.producer_id.key} = '${parseInt(producerId, 10)}';`;
    return Db.query(command)
}

function queryItemByProducerName(producerName){
    Util.checkString(producerName, `DbItem.queryItemByProducerName producerName`)
    let command = `SELECT 
    ${ds.dataStructure.item.id.key},
        ${ds.dataStructure.item.enable.key},
        ${ds.dataStructure.item.name.key},
        ${ds.dataStructure.item.producer_id.key},
        ${ds.dataStructure.item.producer_name.key},
        ${ds.dataStructure.item.country.key},
        ${ds.dataStructure.item.zip.key},
        ${ds.dataStructure.item.province.key},
        ${ds.dataStructure.item.county.key},
        ${ds.dataStructure.item.township.key},
        ${ds.dataStructure.item.village.key},
        ${ds.dataStructure.item.road.key},
        ${ds.dataStructure.item.sell_type.key},
        ${ds.dataStructure.item.price.key},
        ${ds.dataStructure.item.unit.key},
        ${ds.dataStructure.item.amount.key},
        ${ds.dataStructure.item.sold.key},
        ${ds.dataStructure.item.slogan.key},
        ${ds.dataStructure.item.description.key},
        array_to_json(${ds.dataStructure.item.content.key}) AS ${ds.dataStructure.item.content.key},
        array_to_json(${ds.dataStructure.item.certification.key}) AS ${ds.dataStructure.item.certification.key},
        array_to_json(${ds.dataStructure.item.spec.key}) AS ${ds.dataStructure.item.spec.key},
        ${ds.dataStructure.item.cover_img.key},
        array_to_json(${ds.dataStructure.item.imgs.key}) AS ${ds.dataStructure.item.imgs.key},
        ${ds.dataStructure.item.block_id.key},
        ${ds.dataStructure.item.block_link.key},
        ${ds.dataStructure.item.transaction_id.key},
        ${ds.dataStructure.item.traceability_link.key},
        row_to_json(${ds.dataStructure.item.comment.key}) AS ${ds.dataStructure.item.comment.key},
        ${ds.dataStructure.item.create_on.key},
        ${ds.dataStructure.item.latest_modify.key},
        ${ds.dataStructure.item.expire_on.key},
        ${ds.dataStructure.item.is_limited.key},
        ${ds.dataStructure.item.has_expiration.key}
    FROM ${ds.dataStructure.item.table_name} WHERE ${ds.dataStructure.item.producer_name.key} = '${String(producerName)}';`;
    return Db.query(command)
}

function queryItemList(count, offset){
    // if(typeof(count) != "number"){util.log("Error: query_post_list parameter count is not a number");}
    // if(typeof(offset) != "number"){util.log("Error: query_post_list parameter offset is not a number");}
    Util.checkInt(count, `DbItem.queryItemList count`)
    Util.checkInt(offset, `DbItem.queryItemList offset`)

    let row_counts = ""
    let row_offset = ""
    if(count == -1){
    }else{
        row_counts = "LIMIT " + String(count);
    }

    if(offset < 0){
    }else{
        row_offset = "OFFSET " + String(offset);
    }
    let command = `SELECT 
    ${ds.dataStructure.item.id.key},
        ${ds.dataStructure.item.enable.key},
        ${ds.dataStructure.item.name.key},
        ${ds.dataStructure.item.producer_id.key},
        ${ds.dataStructure.item.producer_name.key},
        ${ds.dataStructure.item.country.key},
        ${ds.dataStructure.item.zip.key},
        ${ds.dataStructure.item.province.key},
        ${ds.dataStructure.item.county.key},
        ${ds.dataStructure.item.township.key},
        ${ds.dataStructure.item.village.key},
        ${ds.dataStructure.item.road.key},
        ${ds.dataStructure.item.sell_type.key},
        ${ds.dataStructure.item.price.key},
        ${ds.dataStructure.item.unit.key},
        ${ds.dataStructure.item.amount.key},
        ${ds.dataStructure.item.sold.key},
        ${ds.dataStructure.item.slogan.key},
        ${ds.dataStructure.item.description.key},
        array_to_json(${ds.dataStructure.item.content.key}) AS ${ds.dataStructure.item.content.key},
        array_to_json(${ds.dataStructure.item.certification.key}) AS ${ds.dataStructure.item.certification.key},
        array_to_json(${ds.dataStructure.item.spec.key}) AS ${ds.dataStructure.item.spec.key},
        ${ds.dataStructure.item.cover_img.key},
        array_to_json(${ds.dataStructure.item.imgs.key}) AS ${ds.dataStructure.item.imgs.key},
        ${ds.dataStructure.item.block_id.key},
        ${ds.dataStructure.item.block_link.key},
        ${ds.dataStructure.item.transaction_id.key},
        ${ds.dataStructure.item.traceability_link.key},
        row_to_json(${ds.dataStructure.item.comment.key}) AS ${ds.dataStructure.item.comment.key},
        ${ds.dataStructure.item.create_on.key},
        ${ds.dataStructure.item.latest_modify.key},
        ${ds.dataStructure.item.expire_on.key},
        ${ds.dataStructure.item.is_limited.key},
        ${ds.dataStructure.item.has_expiration.key}
    FROM ${ds.dataStructure.item.table_name} AS ${ds.dataStructure.item.table_name} ORDER BY ${ds.dataStructure.item.create_on.key} DESC ${row_counts} ${row_offset};`
    return Db.query(command)
}

function insertDummy(){
    let content = [
        {
            display: "section",
            img: "process1.gif",
            backgroundColor: "",
            title: "炒茶",
            subtitle: "林國村",
            description: "林國村：鹿谷鄉鳳凰村人－林秋冬之子　現年55歲秉其父之精神在茶藝這塊領域上繼續專研，尤其在炒茶這塊更是加以研究，並傳授幫助台灣高山茶改良之傳統技術上不足！研發一套專屬於林氏的炒茶技術。", // Markdown Format
            data: [{property: "溫度", index: "25", unit: "c"}, {property: "濕度", index: "30", unit: "%"}],
            comment: "comment"
        },
        {
            display: "section",
            img: "process2.gif",
            backgroundColor: "",
            title: "萎凋",
            subtitle: "林國棟",
            description: "凍頂茶的原產地在南投縣的鹿谷鄉其中海拔最高的地方莫屬於鳳凰產區，主要是以青心烏龍為原料製成的半發酵茶，傳統上，其發酵程度在高達50%左右。", // Markdown Format
            data: [{property: "溫度", index: "25", unit: "c"}, {property: "濕度", index: "30", unit: "%"}],
            comment: "comment"
        },
        {
            display: "section",
            img: "process3.gif",
            backgroundColor: "",
            title: "烘焙",
            subtitle: "蔡培火",
            description: "茶葉烘乾後需再重複以布包成球狀揉捻茶葉，使其成半發酵、半球狀，稱為「布揉製茶」或「熱團揉」。揉捻後，茶葉帶有隱隱金黃色。傳統古典凍頂烏龍茶帶明顯焙火味。", // Markdown Format
            data: [{property: "溫度", index: "25", unit: "c"}, {property: "濕度", index: "30", unit: "%"}],
            comment: "comment"
        },
        {
            display: "section",
            img: "process4.gif",
            backgroundColor: "",
            title: "揉捻",
            subtitle: "張大春",
            description: "茶葉烘乾後需再重複以布包成球狀揉捻茶葉，使其成半發酵、半球狀，稱為「布揉製茶」或「熱團揉」。揉捻後，茶葉帶有隱隱金黃色。傳統古典凍頂烏龍茶帶明顯焙火味。", // Markdown Format
            data: [{property: "溫度", index: "25", unit: "c"}, {property: "濕度", index: "30", unit: "%"}],
            comment: "comment"
        }
    ]
    let cert = [{
        name: "SGS", 
        link: "www.sgs.com"
    }, {
        name: "產地檢測", 
        link: "www.sgs.com"
    }]
    let spec = [{property: "100g", value: "Heavily Baked", comment: "Strongest"}, {property: "100g", value: "Heavily Baked", comment: "Strongest"}]
    let comment = {note: "Sample Comment", ext: {}}
    let isotime = "2020-10-05T14:48:00.000Z"

    for(let i=0; i<5; i++){
        insertItem(
            "林氏傳統凍頂烏龍茶", 
            3, 
            "林大宇", 
            "臺灣", 
            "30013", 
            "台灣省", 
            "南投縣", 
            "鹿谷鄉", 
            "鳳凰村", 
            "產業道路", 
            "in_stock", 
            500, 
            "NTD",
            3, 
            "這是我們林氏家族百年多來好幾代人努力保存於世的味道，即使站在這時代改變口味的交鋒上，仍然堅持住這最古老的味道。", 
            "# 即使在改變口味的尖峰上，仍然堅持住最古老的好味道", 
            content, 
            cert,
            spec,
            "the_tea_farmer.jpg", 
            ['tea_farmer.gif', 'group.jpg', 'tea_red.jpg'],
            "Sample block_id", 
            "Sample block_link",
            "Sample transaction_id",
            "Sample traceability_link",
            comment,
            isotime,
            true,
            true
        )
    }

    for(let i=0; i<5; i++){
        insertItem(
            "林氏傳統凍頂烏龍茶", 
            3, 
            "林大宇", 
            "臺灣", 
            "30013", 
            "台灣省", 
            "南投縣", 
            "鹿谷鄉", 
            "鳳凰村", 
            "產業道路", 
            "in_stock", 
            500, 
            "NTD",
            3, 
            "這是我們林氏家族百年多來好幾代人努力保存於世的味道，即使站在這時代改變口味的交鋒上，仍然堅持住這最古老的味道。", 
            "# 即使在改變口味的尖峰上，仍然堅持住最古老的好味道", 
            content, 
            cert,
            spec,
            "tea_red.jpg", 
            ['tea_farmer.gif', 'group.jpg', 'tea_red.jpg'],
            "Sample block_id", 
            "Sample block_link",
            "Sample transaction_id",
            "Sample traceability_link",
            comment,
            isotime,
            true,
            true
        )
    }
}

// createProducerType();
// createSpecType();
// createItemsTable();
// createSectionType()

// queryItemsCountAll();
// queryItemById(1);
// queryItemByName(`1=1`);
// queryItemByProducerId(2);
// queryItemByProducerName('dai');
// queryItemList(3,2);

// pool.end()

// exports.createProducerType = createProducerType;
exports.createSellTypeType = createSellTypeType;
exports.createSpecType = createSpecType;
exports.createSectionType = createSectionType;
exports.createCertificationType = createCertificationType;
exports.createCommentType = createCommentType;
exports.createItemsTable = createItemsTable;
exports.insertItem = insertItem;
exports.queryItemsCountAll = queryItemsCountAll;
exports.queryItemById = queryItemById;
exports.queryItemByName = queryItemByName;
exports.queryItemByProducerId = queryItemByProducerId;
exports.queryItemByProducerName = queryItemByProducerName;
exports.queryItemList = queryItemList;
exports.insertDummy = insertDummy