const staticConfig = require('../config/staticConfig')

function make_img_url(img){
    return staticConfig.img_url + String(img)
}

function on_resolve(resolve, req, res){
    let res_data = util.dataConverter(resolve.rows);
    util.log(`Sending ${resolve.rowCount} rows to ${req.ip} with ${req.ips}`)
    res.header("Access-Control-Allow-Origin", "*");
    res.json(util.makeRes(res_data))
}

function on_reject(reject, req, res){
    util.log(`Error: ${reject}`)
    res.header("Access-Control-Allow-Origin", "*");
    res.json(util.makeRes(reject, false))
}

exports.make_img_url = make_img_url
exports.on_resolve = on_resolve
exports.on_reject = on_reject