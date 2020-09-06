const DbFarmer = require('../db/DbFarmer');
const util = require('../util/Util')
const config = require('../config/serverConfig')
const express = require('express');
const { Remarkable } = require('remarkable');

var farmer_action = express();

farmer_action.on('mount', function (parent) {
    DbFarmer.createGoodType().then(
        (resolve) => {
            util.log(`Created Good type`)
            DbFarmer.createCommentType().then(
                (resolve) => {
                    util.log(`Created Comment type`)
                    DbFarmer.createFarmersTable().then(
                        (resolve) => {
                            util.log(`Created farmers_table`)
                            util.log(`farmer_action is mounted By ${parent}`)
                            farmer_action.emit('ready', null)
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
            return resolve
    }).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            return reject;
    })
})

farmer_action.get('/query_farmers_count_all', (req, res) => {
    DbFarmer.queryFarmersCountAll().then(
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

farmer_action.post('/insert_farmer', (req, res) => {
    // console.log(req.body)
    // console.log(req.body.content)
    // console.log(JSON.parse(util.NaNUndefinedtoNull(req.body.content)))
    DbFarmer.insertFarmer(
        String(req.body.name), 
        String(req.body.cover_img), 
        // util.NaNUndefinedtoNull(req.body.items), 
        JSON.parse(util.NaNUndefinedtoNull(req.body.items)), 
        JSON.parse(util.NaNUndefinedtoNull(req.body.comment))
    ).then(
        (resolve) => {
            console.log(resolve.rows[0])
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(resolve.rows[0])
            console.log(util.makeRes(resolve.rows[0]))
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

farmer_action.post('/query_farmer_by_id', (req, res) => {
    DbFarmer.queryFarmerById(parseInt(req.body.id, 10)).then(
        (resolve) => {
            // var md = new Remarkable({html: true})
            var res_farmer = resolve.rows[0];
            
            // util.log(md.render(resolve.rows[0].content))
            // res_farmer.description = md.render(resolve.rows[0].description)
            // res_farmer.content = res_farmer.content.map((item ,index, array) => {
            //     let section = item
            //     section.description = md.render(item.description)
            //     return section
            // })
            // res_farmer.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_farmer)
            res.json(util.makeRes(res_farmer))
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

farmer_action.post('/query_farmer_by_name', (req, res) => {
    DbFarmer.queryFarmerByName(String(req.body.name)).then(
        (resolve) => {
            var res_farmer = resolve.rows;
            // let res_post = resolve.rows.map((farmer, index, array) => {
            //     let md = new Remarkable({html: true})
            //     let res_farmer = farmer;
            
            //     // util.log(md.render(resolve.rows[0].content))
            //     res_farmer.description = md.render(farmer.description)
            //     res_farmer.content = res_farmer.content.map((item ,index, array) => {
            //         let section = item
            //         section.description = md.render(item.description)
            //         return section
            //     })
            //     return res_farmer
            // })
            
            // res_farmer.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_post)
            res.json(util.makeRes(res_farmer))
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

farmer_action.post('/query_farmer_by_item_id', (req, res) => {
    DbFarmer.queryFarmerByItemId(parseInt(req.body.id, 10)).then(
        (resolve) => {
            var res_farmer = resolve.rows;
            // let res_post = resolve.rows.map((farmer, index, array) => {
            //     let md = new Remarkable({html: true})
            //     let res_farmer = farmer;
            
            //     // util.log(md.render(resolve.rows[0].content))
            //     res_farmer.description = md.render(farmer.description)
            //     res_farmer.content = res_farmer.content.map((item ,index, array) => {
            //         let section = item
            //         section.description = md.render(item.description)
            //         return section
            //     })
            //     return res_farmer
            // })
            
            // res_farmer.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_post)
            res.json(util.makeRes(res_farmer))
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

farmer_action.post('/query_farmer_by_item_name', (req, res) => {
    DbFarmer.queryFarmerByItemName(String(req.body.name)).then(
        (resolve) => {
            var res_farmer = resolve.rows;
            // let res_post = resolve.rows.map((farmer, index, array) => {
            //     let md = new Remarkable({html: true})
            //     let res_farmer = farmer;
            
            //     // util.log(md.render(resolve.rows[0].content))
            //     res_farmer.description = md.render(farmer.description)
            //     res_farmer.content = res_farmer.content.map((item ,index, array) => {
            //         let section = item
            //         section.description = md.render(item.description)
            //         return section
            //     })
            //     return res_farmer
            // })
            
            // res_farmer.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_post)
            res.json(util.makeRes(res_farmer))
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

farmer_action.post('/query_farmer_list', (req, res) => {
    DbFarmer.queryFarmerList(parseInt(req.body.count, 10), parseInt(req.body.offset, 10)).then(
        (resolve) => {
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(JSON.stringify(resolve.rows));
            // res.send(resolve.rows)
            res.json(util.makeRes(resolve.rows))
    }).catch(
        (reject) => {
        res.header("Access-Control-Allow-Origin", "*");
        util.log(`Error: ${reject}`)
        // res.send(reject)
        res.json(util.makeRes(reject, false))
    });
});

exports.actions = farmer_action;