const DbAppData = require('../db/DbAppData')
const DbFarmer = require('../db/DbFarmer')
const DbItem = require('../db/DbItem')
const DbOrder = require('../db/DbOrder')
const DbPost = require('../db/DbPost')

function devInit(){
    DbAppData.insertDummy()
    DbFarmer.insertDummy()
    DbItem.insertDummy()
    DbOrder.insertDummy()
    DbPost.insertDummy()
}

function deployInit(){
    
}

exports.devInit = devInit
exports.deployInit = deployInit