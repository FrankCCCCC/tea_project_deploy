const DbItem = require('../db/DbItem');
const util = require('../util/Util')
const actions = require('./actions')
const config = require('../config/serverConfig')
const express = require('express');
const { Remarkable } = require('remarkable');

var item_action = express();

item_action.on('mount', function (parent) {
    DbItem.createCommentType().then(
        (resolve) => {
            util.log(`Created Comment type`)
            DbItem.createSpecType().then(
                (resolve) => {
                    util.log(`Created Spec type`)
                    DbItem.createSellTypeType().then(
                        (resolve) => {
                            util.log(`Created SellType type`)
                            DbItem.createSectionType().then(
                                (resolve) => {
                                    util.log(`Created Section type`)
                                    DbItem.createCertificationType().then(
                                        (resolve) => {
                                            util.log(`Created Certification type`)
                                            DbItem.createItemsTable().then(
                                                (resolve) => {
                                                    util.log(`Created items_table`)
                                                    util.log(`item_action is mounted By ${parent}`)
                                                    item_action.emit('ready', null)
                                                    return resolve
                                            }).catch(
                                                (reject) => {
                                                    util.log(`Error: ${reject}`)
                                                    return reject;
                                            })
                                            return resolve
                                        }
                                    ).catch(
                                        (reject) => {
                                            util.log(`Error: ${reject}`)
                                            return reject;   
                                        }
                                    )
                                    return resolve
                                }
                            ).catch(
                                (reject) => {
                                    util.log(`Error: ${reject}`)
                                    return reject;   
                                }
                            )
                            return resolve
                        }
                    ).catch(
                        (reject) => {
                            util.log(`Error: ${reject}`)
                            return reject;
                        }
                    )
                    return resolve
            }).catch(
                (reject) => {
                    util.log(`Error: ${reject}`)
                    return reject;
            })
            return resolve
    }).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            return reject;
    })
})

item_action.get('/query_items_count_all', (req, res) => {
    DbItem.queryItemsCountAll().then(
        (resolve) => {
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send({count: parseInt(resolve.rows[0].count, 10)})
            res.json(util.makeRes({count: parseInt(resolve.rows[0].count, 10)}))
        }
    ).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(reject)
            res.json(util.makeRes(reject, false))
        }
    )
})

item_action.post('/insert_item', (req, res) => {
    console.log(req.body)
    DbItem.insertItem(
        String(req.body.name), 
        parseInt(req.body.producer_id, 10), 
        String(req.body.producer_name), 
        String(req.body.country), 
        String(req.body.zip), 
        String(req.body.province), 
        String(req.body.county), 
        String(req.body.township), 
        String(req.body.village), 
        String(req.body.road), 
        String(req.body.sell_type), 
        Number(req.body.price), 
        String(req.body.unit), 
        parseInt(req.body.amount, 10), 
        util.NaNUndefinedtoNull(req.body.slogan), 
        String(req.body.description), 
        JSON.parse(req.body.content), 
        JSON.parse(util.NaNUndefinedtoNull(req.body.certification)), 
        JSON.parse(util.NaNUndefinedtoNull(req.body.spec)), 
        String(req.body.cover_img), 
        JSON.parse(util.NaNUndefinedtoNull(req.body.imgs)),
        util.NaNUndefinedtoNull(req.body.block_id), 
        util.NaNUndefinedtoNull(req.body.block_link), 
        util.NaNUndefinedtoNull(req.body.transaction_id), 
        util.NaNUndefinedtoNull(req.body.traceability_link), 
        JSON.parse(util.NaNUndefinedtoNull(req.body.comment)), 
        util.NaNUndefinedtoNull(req.body.expire_on), 
        util.string2bool(req.body.is_limited), 
        util.string2bool(req.body.has_expiration), 
        ).then(
        (resolve) => {
            // console.log(resolve.rows[0])
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(resolve.rows[0])
            // console.log(util.makeRes(resolve.rows[0]))
            res.json(util.makeRes(resolve.rows[0]))
        }
    ).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(reject)
            res.json(util.makeRes(reject, false))
        }
    )
})

item_action.post('/query_item_by_id', (req, res) => {
    DbItem.queryItemById(parseInt(req.body.id, 10)).then(
        (resolve) => {
            // var md = new Remarkable({html: true})
            // var res_item = resolve.rows[0];
            
            // util.log(md.render(resolve.rows[0].content))
            // res_item.description = md.render(resolve.rows[0].description)
            var res_item = util.dataConverter(resolve.rows[0]);
            // res_item.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_item)
            res.json(util.makeRes(res_item))
        }
    ).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(reject)
            res.json(util.makeRes(reject, false))
        }
    );
})

item_action.post('/query_item_by_name', (req, res) => {
    DbItem.queryItemByName(String(req.body.name)).then(
        (resolve) => {
            let res_post = resolve.rows.map((item, index, array) => {
                let md = new Remarkable({html: true})
                let res_item = item;
            
                // util.log(md.render(resolve.rows[0].content))
                res_item.description = md.render(item.description)
                return res_item
            })
            
            // res_item.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_post)
            res.json(util.makeRes(res_post))
        }
    ).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(reject)
            res.json(util.makeRes(reject, false))
        }
    );
})

item_action.post('/query_item_by_producer_id', (req, res) => {
    DbItem.queryItemByProducerId(parseInt(req.body.id, 10)).then(
        (resolve) => {
            let res_post = resolve.rows.map((item, index, array) => {
                let md = new Remarkable({html: true})
                let res_item = item;
            
                // util.log(md.render(resolve.rows[0].content))
                res_item.description = md.render(item.description)
                return res_item
            })
            
            // res_item.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_post)
            res.json(util.makeRes(res_post))
        }
    ).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(reject)
            res.json(util.makeRes(reject, false))
        }
    );
})

item_action.post('/query_item_by_producer_name', (req, res) => {
    DbItem.queryItemByProducerName(String(req.body.name)).then(
        (resolve) => {
            let res_post = resolve.rows.map((item, index, array) => {
                let md = new Remarkable({html: true})
                let res_item = item;
            
                // util.log(md.render(resolve.rows[0].content))
                res_item.description = md.render(item.description)
                return res_item
            })
            
            // res_item.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_post)
            res.json(util.makeRes(res_post))
        }
    ).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(reject)
            res.json(util.makeRes(reject, false))
        }
    );
})

item_action.post('/query_item_list', (req, res) => {
    DbItem.queryItemList(parseInt(req.body.count, 10), parseInt(req.body.offset, 10)).then(
        (resolve) => {
            let res_items = resolve.rows.map(
                (item, index, array) => {
                    let new_item = item
                    new_item.cover_img = actions.make_img_url(item.cover_img)
                    return new_item
                }
            )
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(JSON.stringify(resolve.rows));
            // res.send(resolve.rows)
            res.json(util.makeRes(res_items))
    }).catch(
        (reject) => {
        res.header("Access-Control-Allow-Origin", "*");
        util.log(`Error: ${reject}`)
        // res.send(reject)
        res.json(util.makeRes(reject, false))
    });
});

exports.actions = item_action;