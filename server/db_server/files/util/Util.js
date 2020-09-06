const os = require('os');
const ifaces = os.networkInterfaces();
const fs = require('fs');
const config = require('../config/serverConfig')
const static_config = require('../config/staticConfig')
const Ds = require('../db/dataStructure')
const { Remarkable } = require('remarkable');

function shortStr(str){
    return String(str).substring(0, 12) + '...'
}

function log(str, is_show=true){
    let now = new Date();
    let localTime = now.toLocaleString({hour: '2-digit', hour12: false, timeZone: 'Asia/Taipei' });
    fs.appendFile(`${__dirname}/../log/server.log`, 
            `${now.toISOString()} Local: ${localTime} ${String(str)} \n`,
            (err) => {
                if(err != null){
                    console.log(err)
                }       
            }
        )
    
    if(is_show){
        // console.log("UTIL")
        // console.log(str)
        console.log(`${localTime} ${String(str)}`)    
    }   
}

function makeRes(resOgj, is_success=true){
    var res = {
        status:config.success,
        result: resOgj
    };
    if(!is_success){
        res.status = config.error
    }
    console.log(res)
    
    return res
}

function checkInt(i, paramName, isRequired=true){
    if(typeof(i) !== 'number' || parseInt(i, 10) !== i || i === null || i === undefined || Number.isNaN(i)){
        if(isRequired){
            log(`Warning: ${paramName} = ${i} is not a Integer`)
            throw `Warning: ${paramName} = ${i} is not a Integer`
        }else{
            return null
        }
    }else{
        return parseInt(i, 10)
    }
}

function checkNumber(i, paramName, isRequired=true){
    if(typeof(i) !== 'number' || i === null || i === undefined || Number.isNaN(i)){
        if(isRequired){
            log(`Warning: ${paramName} = ${i} is not a Number`)
            throw `Warning: ${paramName} = ${i} is not a Number`
        }else{
            return null
        }
    }else{
        return Number(i)
    }
}

function checkBool(i, paramName, isRequired=true){
    if(typeof(i) !== 'boolean' || i === null || i === undefined || Number.isNaN(i)){
        if(isRequired){
            log(`Warning: ${paramName} = ${i} is not a Boolean`)
            throw `Warning: ${paramName} = ${i} is not a Boolean`
        }else{
            return null
        }
    }else{
        return Boolean(i)
    }
}

function checkString(i, paramName, isRequired=true){
    if(typeof(i) !== 'string' || i === "" || i === null || i === undefined || Number.isNaN(i)){
        if(isRequired){
            log(`Warning: ${paramName} = ${i} is not a String`)
            throw `Warning: ${paramName} = ${i} is not a String`
        }else{
            return null
        }
    }else{
        return String(i)
    }
}

function checkObject(i, paramName, isRequired=true){
    if(typeof(i) !== 'object' || i === null || i === undefined || Number.isNaN(i)){
        if(isRequired){
            log(`Warning: ${paramName} = ${i} is not an Object`)
            throw `Warning: ${paramName} = ${i} is not an Object`
        }else{
            return null
        }
    }else{
        if(Object.keys(i).length <=0){
            if(isRequired){
                log(`Warning: ${paramName} = ${i} is not an Object`)
                throw `Warning: ${paramName} = ${i} is not an Object`
            }else{
                return null
            }
        }else{
            return i
        }
    }
}

function checkArray(i, paramName, isRequired=true){
    if(!Array.isArray(i) || i.length <= 0 || i === undefined || i === null || Number.isNaN(i)){
        if(isRequired){
            log(`Warning: ${paramName} = ${i} is not an Array`)
            throw `Warning: ${paramName} = ${i} is not an Array`
        }else{
            return null
        }
    }else{
        return i
    }
}

function NaNUndefinedtoNull(i){
    if(i === undefined || Number.isNaN(i)){return null}
    else{return i}
}

// console.log(checkString(undefined, "", false));

function string2bool(str){
    if(str === "true"){return true}
    else if(str === "false"){return false}
    else{return undefined}
}

function nullhandler(variable, output){
    if(variable === null) {
        return `null`
    }else{
        return output
    }
}

function makeMediaUrl(file){
    // let supported_image_format = ["jpg", "png", "svg", "gif"]
    // let supported_video_format = ["mp4", "avi"]
    if(typeof(file) === 'string'){
        let splited = file.split(".")
        let format = splited[splited.length-1]
        if(static_config.supported_image_format.includes(format)){
            return `${static_config.img_url}${file}`
        }else if(static_config.supported_video_format.includes(format)){
            return `${static_config.video_url}${file}`
        }else{
            log(`Error: ${file} is not supported`)
            return file
        }
    }else if(Array.isArray(file)){
        if(file.length > 0){
            return file.map((item, index, array) => {
                let splited = item.split(".")
                let format = splited[splited.length-1]
                if(static_config.supported_image_format.includes(format)){
                    return `${static_config.img_url}${item}`
                }else if(static_config.supported_video_format.includes(format)){
                    return `${static_config.video_url}${item}`
                }else{
                    log(`Error: The element ${item} of [${file}] is not supported`)
                    return item
                }
            });
        }
    }
}

function targetFilter(obj, prop){
    if(config.media_targets.includes(prop)){
        return makeMediaUrl(obj)
    }else if(config.markdown_targets.includes(prop)){
        var md = new Remarkable({html: true})
        return md.render(obj)
    }else{
        return  obj
    }
}

function object_iterate(obj, path){
    if(typeof(obj) === 'object' && obj !== null && obj !== undefined){
        let copy = obj
        if(Object.keys(obj).length > 0){
            for(let prop in obj){
                // let part = obj[prop]
                if(typeof(obj[prop]) === 'string'){
                    // if(config.media_targets.includes(prop)){
                    //     copy[prop] = makeMediaUrl(obj[prop])
                    // }

                    copy[prop] = targetFilter(obj[prop], prop)
                }else if(Array.isArray(obj[prop])){
                    copy[prop] = array_iterate(obj[prop], prop)
                }else if(typeof(obj[prop]) === 'object'){
                    copy[prop] = object_iterate(copy[prop], prop)
                }
            }
        }
        return copy
    }else{
        return obj
    }
}

function array_iterate(array, path){
    if(Array.isArray(array)){
        let copy = array
        if(array.length > 0){
            for(let i = 0; i < array.length; i++){
                if(typeof(array[i]) === 'string'){
                    // if(config.media_targets.includes(path)){
                    //     copy[i] = makeMediaUrl(array[i])
                    // }
                    copy[i] = targetFilter(array[i], path)
                }else if(Array.isArray(array[i])){
                    copy[i] = array_iterate(array[i], path)
                }else if(typeof(array[i]) === 'object'){
                    copy[i] = object_iterate(array[i], path)
                }
            }
        }
        return copy
    }else{
        return obj
    }
}

function dataConverter(obj){
    if(typeof(obj) === 'object'){
        return object_iterate(obj, "")
    }else if(Array.isArray(obj)){
        return array_iterate(obj, "")
    }else{
        log(`Error: ${obj} is not a string, an object or, an array, invalid media target`)
        return obj
    }
}

function convertSellTypeToString(sell_type){
    if(sell_type === Ds.dataStructure.SellType.options[0]){
        return config.pre_sell
    }if(sell_type === Ds.dataStructure.SellType.options[1]){
        return config.in_stock
    }
}

function getLocalIp(){
    'use strict';

    Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(
        function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
            }

            if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log("A" + ifname + ':' + alias, iface.address);
            } else {
            // this interface has only one ipv4 adress
            console.log("B" + ifname, iface.address);
            }
            console.log(alias)
            ++alias;
        });
    });

    // en0 192.168.1.101
    // eth0 10.0.0.101
}

// let obj = {
//     img: ["farmer1.jpg", "f.mp4", "f.svg", "f."],
//     sec: [
//         {
//             cover_img: "cover_img.jpg",
//             title: "cover_img.jpg"
//         },
//         {
//             cover_img: "cover_img2.jpg",
//             title: "cover_img2.jpg"
//         }
//     ],
//     ss: [
//         [
//             [
//                 {
//                     cover_img: "cover_img.jpg",
//                     title: "cover_img.jpg"
//                 },
//                 {
//                     cover_img: "cover_img.jpg",
//                     title: "cover_img.jpg"
//                 },
//             ],
//             [
//                 {
//                     cover_img: "cover_img.jpg",
//                     title: "cover_img.jpg"
//                 },
//                 {
//                     cover_img: "cover_img.jpg",
//                     title: "cover_img.jpg"
//                 },
//             ]
//         ]
//     ]
// }
// console.log(makeMediaUrl(["farmer1.jpg", "f.mp4", "f.svg", "f."]))
// let re = mediaConverter(obj)
// console.log(re)
// console.log(re.ss[0][0])
// console.log(re.ss[0][1])

// console.log(mediaConverter(["farmer1.jpg", "f.mp4", "f.svg", "f."]))

getLocalIp()

exports.log = log
exports.shortStr = shortStr
exports.makeRes = makeRes
exports.checkInt = checkInt
exports.checkNumber = checkNumber
exports.checkBool = checkBool
exports.checkString = checkString
exports.checkObject = checkObject
exports.checkArray = checkArray
exports.NaNUndefinedtoNull = NaNUndefinedtoNull
exports.string2bool = string2bool
exports.nullhandler = nullhandler
exports.makeMediaUrl = makeMediaUrl
exports.dataConverter = dataConverter
exports.convertSellTypeToString = convertSellTypeToString