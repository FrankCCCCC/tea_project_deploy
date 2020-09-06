const should = require('should')
const DbItem = require('../db/DbItem');
const config = require('../config/serverConfig')
const fetch = require('node-fetch')

var allItemCount = 0;

describe('DbItem.createSellTypeType', () => {
    it('should create SellType type', done => {
        DbItem.createSellTypeType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbItem.createSpecType', () => {
    it('should create Spec type', done => {
        DbItem.createSpecType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbItem.createSectionType', () => {
    it('should create Section type', done => {
        DbItem.createSectionType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbItem.createCertificationType', () => {
    it('should create Certification type', done => {
        DbItem.createCertificationType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbItem.createCommentType', () => {
    it('should create Comment type', done => {
        DbItem.createCommentType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbItem.createItemTable', () => {
    it('should create items_table', done => {
        DbItem.createItemsTable().then((resolve) => {
            resolve.command.should.equal('CREATE')
            done()
        })
    })
})

describe('DbItem.queryItemsCountAll', () => {
    it('should count all items in items_table', done => {
        DbItem.queryItemsCountAll().then((resolve) => {
            allItemCount = parseInt(resolve.rows[0].count);
            console.log(`All Item Count: ${allItemCount}`)
            resolve.command.should.equal('SELECT')
            done()
        })
    })
})

describe('DbItem.insertItem', () => {
    let content = [
        {
        display: "section",
        img: "tea.jpg",
        backgroundColor: "",
        title: "Sample Title",
        subtitle: "Sample Subtitle",
        description: "Sample Description", // Markdown Format
        data: [{temp: "25", unit: "c"}, {ferment: "30", unit: "%"}],
        comment: "comment"
        },
        {
        display: "section",
        img: "tea.jpg",
        backgroundColor: "",
        title: "Sample Title1",
        subtitle: "Sample Subtitle1",
        description: "Sample Description1", // Markdown Format
        data: [{temp: "25", unit: "c"}, {ferment: "30", unit: "%"}],
        comment: "comment"
        }
    ]
    let cert = [{
        name: "SGS", 
        link: "www.sgs.com"
    }]
    let spec = [{property: "100g", value: "Heavily Baked", comment: "Strongest"}, {property: "100g", value: "Heavily Baked", comment: "Strongest"}]
    let comment = {note: "Sample Comment", ext: {}}
    let isotime = "2020-10-05T14:48:00.000Z"
    it(`should insert item into items_table with values "Green Tea", {id: 3, name: "Lin"}, 500, "NTD", "# Traditional Flavor", {property: "100g", value: "Heavily Baked", comment: "Strongest"}, "farmer1.jpg", ['hill1.jpg', 'tea.jpg', 'child.jpg']`, done => {
        DbItem.insertItem(
            "Green Tea", 
            3, 
            "Lin", 
            "Taiwan", 
            "30013", 
            "Taiwan", 
            "NanTou", 
            "Lu Gu", 
            "FongHuang", 
            "GuangFu Rd.", 
            "in_stock", 
            500, 
            "NTD",
            3, 
            "# Traditional Flavor", 
            "# Taiwan Tea", 
            content, 
            cert,
            spec,
            "farmer1.jpg", 
            ['hill1.jpg', 'tea.jpg', 'child.jpg'],
            "Sample block_id", 
            "Sample block_link",
            "Sample transaction_id",
            "Sample traceability_link",
            comment,
            isotime,
            true,
            true
            ).then((resolve) => {
            resolve.command.should.equal('INSERT')
            resolve.rows[0].id.should.equal(allItemCount + 1)
            allItemCount = allItemCount + 1;
            done()
        })
    })

    it(`should insert item into items_table with values "Green Tea", {id: 3, name: "Lin"}, 500, "NTD", "# Traditional Flavor", {property: "100g", value: "Heavily Baked", comment: "Strongest"}, "farmer1.jpg", ['hill1.jpg', 'tea.jpg', 'child.jpg']`, done => {
        DbItem.insertItem(
            "Green Tea", 
            3, 
            "Lin", 
            "Taiwan", 
            "30013", 
            "Taiwan", 
            "NanTou", 
            "Lu Gu", 
            "FongHuang", 
            "GuangFu Rd.", 
            "in_stock", 
            500, 
            "NTD",
            undefined, 
            undefined, 
            "# Taiwan Tea", 
            content, 
            undefined,
            undefined,
            "farmer1.jpg", 
            undefined,
            undefined, 
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            true,
            true
            ).then((resolve) => {
            resolve.command.should.equal('INSERT')
            resolve.rows[0].id.should.equal(allItemCount + 1)
            allItemCount = allItemCount + 1;
            done()
        })
    })
})

describe('DbItem.queryItemList', () => {
    it(`should list items in items_table count=3, offset=2, ${allItemCount}`, done => {
        DbItem.queryItemList(3, 2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allItemCount - 2)
            resolve.rowCount.should.equal(3)
            done()
        })
    })
    it(`should list all items in items_table count=-1, offset=0, ${allItemCount}`, done => {
        DbItem.queryItemList(-1, 0).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allItemCount)
            resolve.rowCount.should.equal(allItemCount)
            done()
        })
    })
    it(`should list all items in items_table count=-1, offset=-2, ${allItemCount}`, done => {
        DbItem.queryItemList(-1, -1).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allItemCount)
            resolve.rowCount.should.equal(allItemCount)
            done()
        })
    })
})

describe('DbItem.queryItemById', () => {
    it(`should query item in items_table by id=2`, done => {
        DbItem.queryItemById(2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rowCount.should.equal(1)
            resolve.rows[0].id.should.equal(2)
            done()
        })
    })
})

describe('DbItem.queryItemByName', () => {
    it(`should query item in items_table by name='Green Tea'`, done => {
        DbItem.queryItemByName('Green Tea').then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rows = parseInt(resolve.rowCount)
            for(let i = 0; i < rows; i++){
                resolve.rows[i].name.should.equal('Green Tea')
            }
            done()
        })
    })
})

describe('DbItem.queryItemByProducerId', () => {
    it(`should query item in items_table by producer id=2`, done => {
        DbItem.queryItemByProducerId(2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rows = parseInt(resolve.rowCount)
            for(let i = 0; i < rows; i++){
                resolve.rows[i].producer_id.should.equal(2)
            }
            done()
        })
    })
})

describe('DbItem.queryItemByProducerName', () => {
    it(`should query item in items_table by producer name='Lin'`, done => {
        DbItem.queryItemByProducerName('Lin').then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rows = parseInt(resolve.rowCount)
            for(let i = 0; i < rows; i++){
                resolve.rows[i].producer_name.should.equal('Lin')
            }
            done()
        })
    })
})

var itemCountActions = 0;
describe('ItemAction.queryItemsCountAll', () => {
    it(`should send the count of all items in items_table`, done => {
        fetch(config.item_action_url + '/query_items_count_all',{
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((response) => {
              console.log(response.result)
            response.status.should.equal(config.success)
            itemCountActions = response.result.count
            done()
            return response
        }).catch(
            (reject) => {
              console.log(reject)            
            }
        )
    })
})

describe('ItemAction.insertItem', () => {
    let content = [
        {
        display: "section",
        img: "tea.jpg",
        backgroundColor: "",
        title: "Sample Title",
        subtitle: "Sample Subtitle",
        description: "Sample Description", // Markdown Format
        data: [{temp: "25", unit: "c"}, {ferment: "30", unit: "%"}],
        comment: "comment"
        },
        {
        display: "section",
        img: "tea.jpg",
        backgroundColor: "",
        title: "Sample Title1",
        subtitle: "Sample Subtitle1",
        description: "Sample Description1", // Markdown Format
        data: [{temp: "25", unit: "c"}, {ferment: "30", unit: "%"}],
        comment: "comment"
        }
    ]
    let cert = [{
        name: "SGS", 
        link: "www.sgs.com"
    }]
    let spec = [{property: "100g", value: "Heavily Baked", comment: "Strongest"}, {property: "100g", value: "Heavily Baked", comment: "Strongest"}]
    let comment = {note: "Sample Comment", ext: {}}
    let isotime = "2020-10-05T14:48:00.000Z"
    it(`should send the id of inserted items in items_table`, done => {
        fetch(config.item_action_url + '/insert_item',{
            method: 'POST',
            body: new URLSearchParams({
                name: "Green Tea", 
                producer_id: 3, 
                producer_name: "Lin", 
                country: "Taiwan", 
                zip: "30013", 
                province: "Taiwan", 
                county: "NanTou", 
                township: "Lu Gu", 
                village: "FongHuang", 
                road: "GuangFu Rd.", 
                sell_type: "in_stock", 
                price: 500, 
                unit: "NTD",
                // amount: undefined, 
                // slogan: undefined, 
                description: "# Taiwan Tea", 
                content: JSON.stringify(content), 
                // certification: undefined,
                // spec: undefined,
                cover_img: "farmer1.jpg", 
                // imgs: undefined,
                // block_id: undefined, 
                // block_link: undefined,
                // transaction_id: undefined,
                // traceability_link: undefined,
                // comment: undefined,
                // expire_on: undefined,
                is_limited: true,
                has_expiration: true
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response.result.id)
            console.log(itemCountActions)
            response.status.should.equal(config.success)
            response.result.id.should.equal(itemCountActions+1)
            itemCountActions = itemCountActions + 1
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })

        it(`should send the id of inserted items in items_table`, done => {
            fetch(config.item_action_url + '/insert_item',{
                method: 'POST',
                body: new URLSearchParams({
                    name: "Green Tea", 
                    producer_id: 3, 
                    producer_name: "Lin", 
                    country: "Taiwan", 
                    zip: "30013", 
                    province: "Taiwan", 
                    county: "NanTou", 
                    township: "Lu Gu", 
                    village: "FongHuang", 
                    road: "GuangFu Rd.", 
                    sell_type: "in_stock", 
                    price: 500, 
                    unit: "NTD",
                    amount: 3, 
                    slogan: "# Traditional Flavor", 
                    description: "# Taiwan Tea", 
                    content: JSON.stringify(content), 
                    certification: JSON.stringify(cert),
                    spec: JSON.stringify(spec),
                    cover_img: "farmer1.jpg", 
                    imgs: JSON.stringify(['hill1.jpg', 'tea.jpg', 'child.jpg']),
                    block_id: "Sample block_id", 
                    block_link: "Sample block_link",
                    transaction_id: "Sample transaction_id",
                    traceability_link: "Sample traceability_link",
                    comment: JSON.stringify(comment),
                    expire_on: JSON.stringify(isotime),
                    is_limited: true,
                    has_expiration: true
                }),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                return response.json()
            }).then((response) => {
                console.log(response.result.id)
                console.log(itemCountActions)
                response.status.should.equal(config.success)
                response.result.id.should.equal(itemCountActions+1)
                itemCountActions = itemCountActions + 1
                done()
                return response
            }).catch((reject) => {
                  console.log(reject)            
            })
        })
    })
})

describe('ItemAction.queryItemById', () => {
    it(`should send the item of queryed id=5 in items_table`, done => {
        fetch(config.item_action_url + '/query_item_by_id',{
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

describe('ItemAction.queryItemByName', () => {
    it(`should send the item of queryed name='Oolong Tea' in items_table`, done => {
        fetch(config.item_action_url + '/query_item_by_name',{
            method: 'POST',
            body: new URLSearchParams({
                name: "Oolong Tea"
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            //   console.log(response)
            response.status.should.equal(config.success)
            response.result.forEach((item, index, array) => {
                item.name.should.equal('Oolong Tea')
            })
            
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('ItemAction.queryItemByProducerId', () => {
    it(`should send the item of queryed producer_id=3 in items_table`, done => {
        fetch(config.item_action_url + '/query_item_by_producer_id',{
            method: 'POST',
            body: new URLSearchParams({
                id: 3
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            //   console.log(response)
            response.status.should.equal(config.success)
            response.result.forEach((item, index, array) => {
                item.producer_id.should.equal(3)
            })
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('ItemAction.queryItemByProducerName', () => {
    it(`should send the item of queryed producer_name='Lin' in items_table`, done => {
        fetch(config.item_action_url + '/query_item_by_producer_name',{
            method: 'POST',
            body: new URLSearchParams({
                name: "Lin"
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            //   console.log(response)
            response.status.should.equal(config.success)
            response.result.forEach((item, index, array) => {
                item.producer_name.should.equal('Lin')
            })
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('ItemAction.queryItemList', () => {
    it(`should send items list count=2, offset=3 in items_table`, done => {
        fetch(config.item_action_url + '/query_item_list',{
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