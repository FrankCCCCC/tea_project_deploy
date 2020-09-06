const should = require('should')
const DbOrder = require('../db/DbOrder');
const config = require('../config/serverConfig')
const fetch = require('node-fetch')

var allOrderCount = 0;

describe('DbOrder.createCommentType', () => {
    it('should create Comment type', done => {
        DbOrder.createCommentType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbOrder.createSellTypeType', () => {
    it('should create SellType type', done => {
        DbOrder.createSellTypeType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbOrder.createOrderItemType', () => {
    it('should create OrderItem type', done => {
        DbOrder.createOrderItemType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbOrder.createExtensionUuid', () => {
    it('should create uuid-ossp extension', done => {
        DbOrder.createExtensionUuid().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbOrder.createOrdersTable', () => {
    it('should create orders_table', done => {
        DbOrder.createOrdersTable().then((resolve) => {
            resolve.command.should.equal('CREATE')
            done()
        })
    })
})

describe('DbOrder.queryOrdersCountAll', () => {
    it('should count all orders in orders_table', done => {
        DbOrder.queryOrdersCountAll().then((resolve) => {
            allOrderCount = parseInt(resolve.rows[0].count);
            console.log(`All Order Count: ${allOrderCount}`)
            resolve.command.should.equal('SELECT')
            done()
        })
    })
})

describe('DbOrder.insertOrder', () => {
    it(`should insert order into orders_table with values "Green Tea", {id: 3, name: "Lin"}, 500, "NTD", "# Traditional Flavor", {property: "100g", value: "Heavily Baked", comment: "Strongest"}, "farmer1.jpg", ['hill1.jpg', 'tea.jpg', 'child.jpg']`, done => {
        let items = [
            {id: 1, name: "Green Tea", quantity: 1, price: 300, unit: "NTD"},
            {id: 2, name: "Oolong Tea", quantity: 2, price: 200, unit: "NTD"}
        ]
        
        let comment = {note: "First", ext: {}}
        DbOrder.insertOrder(
            "Da", 
            "0908293456", 
            "example@gmail.com", 
            "301", 
            "88882222444", 
            "Taiwan", 
            "50010", 
            "Taiwan", 
            "Nantou", 
            "LuGu", 
            "FongHuang", 
            "indus.rd", 
            items, 
            700, 
            "NTD", 
            3, 
            undefined, 
            undefined, 
            undefined, 
            true, 
            true, 
            true, 
            true, 
            false, 
            comment
        ).then((resolve) => {
            resolve.command.should.equal('INSERT')
            resolve.rows[0].id.should.equal(allOrderCount + 1)
            allOrderCount = allOrderCount + 1;
            done()
        })
    })
})

describe('DbOrder.queryOrderList', () => {
    it(`should list orders in orders_table count=3, offset=2, ${allOrderCount}`, done => {
        DbOrder.queryOrderList(3, 2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allOrderCount - 2)
            resolve.rowCount.should.equal(3)
            done()
        })
    })
    it(`should list all orders in orders_table count=-1, offset=0, ${allOrderCount}`, done => {
        DbOrder.queryOrderList(-1, 0).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allOrderCount)
            resolve.rowCount.should.equal(allOrderCount)
            done()
        })
    })
    it(`should list all orders in orders_table count=-1, offset=-2, ${allOrderCount}`, done => {
        DbOrder.queryOrderList(-1, -1).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allOrderCount)
            resolve.rowCount.should.equal(allOrderCount)
            done()
        })
    })
})

describe('DbOrder.queryOrderById', () => {
    it(`should query order in orders_table by id=2`, done => {
        DbOrder.queryOrderById(2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rowCount.should.equal(1)
            resolve.rows[0].id.should.equal(2)
            done()
        })
    })
})

describe('DbOrder.queryOrderByBuyerName', () => {
    it(`should query order in orders_table by buyer_name='Da'`, done => {
        DbOrder.queryOrderByBuyerName('Da').then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rows = parseInt(resolve.rowCount)
            for(let i = 0; i < rows; i++){
                resolve.rows[i].buyer_name.should.equal('Da')
            }
            done()
        })
    })
})

describe('DbOrder.queryOrderByItemId', () => {
    it(`should query order in orders_table by item id=2`, done => {
        DbOrder.queryOrderByItemId(2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rows = parseInt(resolve.rowCount)
            for(let i = 0; i < rows; i++){
                let item_number = resolve.rows[i].items.length
                let flag = false
                for(let j = 0; j < item_number; j++){
                    if(resolve.rows[i].items[j].id === 2){flag = true}
                }
                flag.should.equal(true)
            }
            done()
        })
    })
})

describe('DbOrder.queryOrderByItemName', () => {
    it(`should query order in orders_table by item name='Green Tea'`, done => {
        DbOrder.queryOrderByItemName('Green Tea').then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rows = parseInt(resolve.rowCount)
            for(let i = 0; i < rows; i++){
                let item_number = resolve.rows[i].items.length
                let flag = false
                for(let j = 0; j < item_number; j++){
                    if(resolve.rows[i].items[j].name === 'Green Tea'){flag = true}
                }
                flag.should.equal(true)
            }
            done()
        })
    })
})

var orderCountActions = 0;
describe('OrderAction.queryOrdersCountAll', () => {
    it(`should send the count of all orders in orders_table`, done => {
        fetch(config.order_action_url + '/query_orders_count_all',{
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response.result)
            response.status.should.equal(config.success)
            orderCountActions = response.result.count
            done()
            return response
        }).catch(
            (reject) => {
              console.log(reject)            
            }
        )
    })
})

describe('OrderAction.insertOrder', () => {
    it(`should send the id of inserted orders in orders_table`, done => {
        let comment = {note: "First", ext: {}}
        let items = [
            {id: 1, name: "Green Tea", quantity: 1, price: 300, unit: "NTD"},
            {id: 2, name: "Oolong Tea", quantity: 2, price: 200, unit: "NTD"}
        ]
        fetch(config.order_action_url + '/insert_order',{
            method: 'POST',
            body: new URLSearchParams({
                buyer_name: "Da", 
                phone: "0908293456", 
                email: "example@gmail.com", 
                bank_code: "301", 
                bank_account: "88882222444", 
                country: "Taiwan", 
                zip: "50010", 
                province: "Taiwan", 
                county: "Nantou", 
                township: "LuGu", 
                village: "FongHuang", 
                road: "indus.rd", 
                items: JSON.stringify([
                    {id: 1, name: "Green Tea", quantity: 1, price: 300, unit: "NTD"},
                    {id: 2, name: "Oolong Tea", quantity: 2, price: 200, unit: "NTD"}]), 
                total_price: 700, 
                unit: "NTD", 
                total_quantity: 3, 
                agree_policy: true, 
                agree_promotion: true, 
                comment: JSON.stringify({note: "First", ext: {}})
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            console.log(response)
            return response.json()
        }).then((response) => {
            console.log(response.result.id)
            console.log(orderCountActions)
            response.status.should.equal(config.success)
            response.result.id.should.equal(orderCountActions+1)
            orderCountActions = orderCountActions + 1
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('OrderAction.queryOrderById', () => {
    it(`should send the order of queryed id=5 in orders_table`, done => {
        fetch(config.order_action_url + '/query_order_by_id',{
            method: 'POST',
            body: new URLSearchParams({
                id: 5
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            // console.log(response)
            response.status.should.equal(config.success)
            response.result.id.should.equal(5)
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('OrderAction.queryOrderByBuyerName', () => {
    it(`should send the order of queryed buyer_name='Da' in orders_table`, done => {
        fetch(config.order_action_url + '/query_order_by_buyer_name',{
            method: 'POST',
            body: new URLSearchParams({
                name: "Da"
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            //   console.log(response)
            response.status.should.equal(config.success)
            response.result.forEach((order, index, array) => {
                order.buyer_name.should.equal('Da')
            })
            
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('OrderAction.queryOrderByItemId', () => {
    it(`should send the order of queryed producer id=2 in orders_table`, done => {
        fetch(config.order_action_url + '/query_order_by_item_id',{
            method: 'POST',
            body: new URLSearchParams({
                id: 2
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            //   console.log(response)
            // response.status.should.equal(config.success)
            // response.result.forEach((order, index, array) => {
            //     order.item.id.should.equal(2)
            // })
            let rows = response.result.length
            for(let i = 0; i < rows; i++){
                let item_number = response.result[i].items.length
                let flag = false
                for(let j = 0; j < item_number; j++){
                    if(response.result[i].items[j].id === 2){flag = true}
                }
                flag.should.equal(true)
            }
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('OrderAction.queryOrderByItemName', () => {
    it(`should send the order of queryed item name='Green Tea' in orders_table`, done => {
        fetch(config.order_action_url + '/query_order_by_item_name',{
            method: 'POST',
            body: new URLSearchParams({
                name: "Green Tea"
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            //   console.log(response)
            // response.status.should.equal(config.success)
            // response.result.forEach((order, index, array) => {
            //     order.producer.name.should.equal('Dai')
            // })

            let rows = response.result.length
            for(let i = 0; i < rows; i++){
                let item_number = response.result[i].items.length
                let flag = false
                for(let j = 0; j < item_number; j++){
                    if(response.result[i].items[j].name === "Green Tea"){flag = true}
                }
                flag.should.equal(true)
            }
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('OrderAction.queryOrderList', () => {
    it(`should send orders list count=2, offset=3 in orders_table`, done => {
        fetch(config.order_action_url + '/query_order_list',{
            method: 'POST',
            body: new URLSearchParams({
                count: 2,
                offset: 3
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            response.status.should.equal(config.success)
            response.result.length.should.equal(2)
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})