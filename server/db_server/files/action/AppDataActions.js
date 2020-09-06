const DbAppData = require('../db/DbAppData');
const util = require('../util/Util')
const Config = require('../config/serverConfig')
// const actions = require('./actions')
const express = require('express');
// const { Remarkable } = require('remarkable');

var app_data_action = express();

app_data_action.on('mount', function (parent) {
    DbAppData.createCommentType().then(
        (resolve) => {
            util.log(`Created Comment type`)
            DbAppData.createAppDatasTable().then(
                (resolve) => {
                    util.log(`Created app_datas_table`)
                    util.log(`app_data_action is mounted By ${parent}`)
                    app_data_action.emit('ready', null)
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

app_data_action.get(Config.query_app_datas_count_all, (req, res) => {
    DbAppData.queryAppDatasCountAll().then(
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

app_data_action.post(Config.insert_app_data, (req, res) => {
    DbAppData.insertAppData(String(req.body.property), String(req.body.data), JSON.parse(String(req.body.comment))).then(
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

app_data_action.post(Config.query_app_data_by_id, (req, res) => {
    DbAppData.queryAppDataById(parseInt(req.body.id, 10)).then(
        (resolve) => {
            // var md = new Remarkable({html: true})
            var res_app_data = resolve.rows[0];
            res_app_data = util.dataConverter(res_app_data)
            // util.log(md.render(resolve.rows[0].content))
            // res_app_data.description = md.render(resolve.rows[0].description)
            // res_app_data.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_app_data)
            res.json(util.makeRes(res_app_data))
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

app_data_action.post(Config.query_app_data_by_property, (req, res) => {
    DbAppData.queryAppDataByProperty(String(req.body.property)).then(
        (resolve) => {
            let res_app_data = resolve.rows
            res_app_data = util.dataConverter(res_app_data)
            
            // res_app_data.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(res_post)
            res.json(util.makeRes(res_app_data))
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

app_data_action.post(Config.query_app_data_list, (req, res) => {
    DbAppData.queryAppDataList(parseInt(req.body.count, 10), parseInt(req.body.offset, 10)).then(
        (resolve) => {
            // let res_app_datas = resolve.rows.map(
            //     (app_data, index, array) => {
            //         let new_app_data = app_data
            //         new_app_data.cover_img = actions.make_img_url(app_data.cover_img)
            //         return new_app_data
            //     }
            // )
            let res_app_data = resolve.rows
            res_app_data = util.dataConverter(res_app_data)

            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(JSON.stringify(resolve.rows));
            // res.send(resolve.rows)
            res.json(util.makeRes(res_app_data))
    }).catch(
        (reject) => {
        res.header("Access-Control-Allow-Origin", "*");
        util.log(`Error: ${reject}`)
        // res.send(reject)
        res.json(util.makeRes(reject, false))
    });
});

exports.actions = app_data_action;