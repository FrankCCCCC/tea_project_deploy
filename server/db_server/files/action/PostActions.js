const DbPost = require('../db/DbPost')
const util = require('../util/Util')
const Config = require('../config/serverConfig')
const actions = require('./actions')
const express = require('express');
// const { Remarkable } = require('remarkable');

var post_action = express();

post_action.on('mount', function (parent) {
    DbPost.createPostsTable().then(
        (resolve) => {
            util.log(`Created posts_table`)
            util.log(`post_action is mounted By ${parent}`)
            post_action.emit('post_ready', null)
            return resolve
    }).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            return reject;
    })
                    
})

post_action.get(Config.query_posts_count_all, (req, res) => {
    DbPost.queryPostsCountAll().then(
        (resolve) => {
            // util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            // res.send(JSON.stringify(resolve.rows[0]))

            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send({count: parseInt(resolve.rows[0].count, 10)})
            res.json(util.makeRes({count: parseInt(resolve.rows[0].count, 10)}))
        }
    ).catch(
        (reject) => {
            // util.log(`Error: ${reject}`)
            // res.header("Access-Control-Allow-Origin", "*");
            // res.send(reject)

            util.log(`Error: ${reject}`)
            res.header("Access-Control-Allow-Origin", "*");
            res.json(util.makeRes(reject, false))
        }
    )
})

post_action.post(Config.insert_post, (req, res) => {
    DbPost.insertPost(req.body.title, req.body.subtitle, req.body.author, req.body.content, req.body.cover_img).then(
        (resolve) => {
            
            // util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            // res.header("Access-Control-Allow-Origin", "*");
            // res.send(config.success)

            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            res.json(util.makeRes(resolve.rows[0]))
        }
    ).catch(
        (reject) => {
            // util.log(`Error: ${reject}`)
            // res.header("Access-Control-Allow-Origin", "*");
            // res.send(reject)

            util.log(`Error: ${reject}`)
            res.header("Access-Control-Allow-Origin", "*");
            res.json(util.makeRes(reject, false))
        }
    )
})

post_action.post(Config.query_post_by_id, (req, res) => {
    DbPost.queryPost(parseInt(req.body.id, 10)).then(
        (resolve) => {
            // var md = new Remarkable({html: true})
            var res_post = util.dataConverter(resolve.rows[0]);
            
            // util.log(md.render(resolve.rows[0].content))
            // res_post.content = md.render(resolve.rows[0].content)
            // res_post.cover_img = actions.make_img_url(res_post.cover_img)
            // res_post.content = md.render('Some Markdown text with <span style="color:blue">some *blue* text</span>.')
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(JSON.stringify(res_post));
            res.json(util.makeRes(res_post))
        }
    ).catch(
        (reject) => {
            // util.log(`Error: ${reject}`)
            // res.header("Access-Control-Allow-Origin", "*");
            // res.send(reject)

            util.log(`Error: ${reject}`)
            res.header("Access-Control-Allow-Origin", "*");
            res.json(util.makeRes(reject, false))
        }
    );
})

post_action.post(Config.query_post_list, (req, res) => {
    DbPost.queryPostList(Number(req.body.count), Number(req.body.offset)).then(
        (resolve) => {
            // let res_posts = resolve.rows.map(
            //     (item, index, array) => {
            //         let new_post = item
            //         new_post.cover_img = actions.make_img_url(item.cover_img)
            //         return new_post
            //     }
            // )
            var res_posts = util.dataConverter(resolve.rows);
            util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
            res.header("Access-Control-Allow-Origin", "*");
            // res.send(JSON.stringify(resolve.rows));
            res.json(util.makeRes(res_posts))
    }).catch(
        (reject) => {
        // res.header("Access-Control-Allow-Origin", "*");
        // util.log(`Error: ${reject}`)
        // res.send(reject)

        util.log(`Error: ${reject}`)
        res.header("Access-Control-Allow-Origin", "*");
        res.json(util.makeRes(reject, false))
    });
});

exports.actions = post_action;