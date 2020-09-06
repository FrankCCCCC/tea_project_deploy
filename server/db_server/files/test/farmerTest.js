const should = require('should')
const DbFarmer = require('../db/DbFarmer');
const config = require('../config/serverConfig')
const fetch = require('node-fetch')

var allFarmerCount = 0;

describe('DbFarmer.createGoodType', () => {
    it('should create Good type', done => {
        DbFarmer.createGoodType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbFarmer.createCommentType', () => {
    it('should create Comment type', done => {
        DbFarmer.createCommentType().then((resolve) => {
            resolve.command.should.equal('DO')
            done()
        })
    })
})

describe('DbFarmer.createFarmerTable', () => {
    it('should create farmers_table', done => {
        DbFarmer.createFarmersTable().then((resolve) => {
            resolve.command.should.equal('CREATE')
            done()
        })
    })
})

describe('DbFarmer.queryFarmersCountAll', () => {
    it('should count all farmers in farmers_table', done => {
        DbFarmer.queryFarmersCountAll().then((resolve) => {
            allFarmerCount = parseInt(resolve.rows[0].count);
            console.log(`All Farmer Count: ${allFarmerCount}`)
            resolve.command.should.equal('SELECT')
            done()
        })
    })
})

describe('DbFarmer.insertFarmer', () => {
    // let sections = [
    //     {title: "The Best", subtitle: "Best", description: "Universal Best Better Tea", img: "tea.jpg"},
    //     {title: "The Better", subtitle: "Better", description: "Universal Better Tea", img: "tea_tree.jpg"},
    // ]
    let items = [
        {id: 1, name: "Oolong Tea",},
        {id: 3, name: "Black Tea"}
    ]
    let comment = {note: "First", ext: {}}
    it(`should insert farmer into farmers_table with values "Dai", "farmer1.jpg", [{id: 1, name: "Oolong Tea",}, {id: 3, name: "Black Tea"}], {note: "First", ext: {}}`, done => {
        DbFarmer.insertFarmer("Dai", "farmer1.jpg", items, comment).then((resolve) => {
            resolve.command.should.equal('INSERT')
            resolve.rows[0].id.should.equal(allFarmerCount + 1)
            allFarmerCount = allFarmerCount + 1;
            done()
        })
    })

    it(`should insert farmer into farmers_table with values "Dai", "farmer1.jpg", undefined, undefined`, done => {
        DbFarmer.insertFarmer("Dai", "farmer1.jpg", undefined, undefined).then((resolve) => {
            resolve.command.should.equal('INSERT')
            resolve.rows[0].id.should.equal(allFarmerCount + 1)
            allFarmerCount = allFarmerCount + 1;
            done()
        })
    })
})

describe('DbFarmer.queryFarmerList', () => {
    it(`should list farmers in farmers_table count=3, offset=2, ${allFarmerCount}`, done => {
        DbFarmer.queryFarmerList(3, 2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allFarmerCount - 2)
            resolve.rowCount.should.equal(3)
            done()
        })
    })
    it(`should list all farmers in farmers_table count=-1, offset=0, ${allFarmerCount}`, done => {
        DbFarmer.queryFarmerList(-1, 0).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allFarmerCount)
            resolve.rowCount.should.equal(allFarmerCount)
            done()
        })
    })
    it(`should list all farmers in farmers_table count=-1, offset=-2, ${allFarmerCount}`, done => {
        DbFarmer.queryFarmerList(-1, -1).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allFarmerCount)
            resolve.rowCount.should.equal(allFarmerCount)
            done()
        })
    })
})

describe('DbFarmer.queryFarmerById', () => {
    it(`should query farmer in farmers_table by id=2`, done => {
        DbFarmer.queryFarmerById(2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rowCount.should.equal(1)
            resolve.rows[0].id.should.equal(2)
            done()
        })
    })
})

describe('DbFarmer.queryFarmerByName', () => {
    it(`should query farmer in farmers_table by name='Dai'`, done => {
        DbFarmer.queryFarmerByName('Dai').then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rows = parseInt(resolve.rowCount)
            for(let i = 0; i < rows; i++){
                resolve.rows[i].name.should.equal('Dai')
            }
            done()
        })
    })
})

describe('DbFarmer.queryFarmerByItemId', () => {
    it(`should query farmer in farmers_table by item id=2`, done => {
        DbFarmer.queryFarmerByItemId(2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rowCount = parseInt(resolve.rowCount, 10)
            let f = false
            for(let i = 0; i < rowCount; i++){
                let itemCount = parseInt(resolve.rows[i].items.length ,10)
                for(let j = 0; j < itemCount; j++){
                    if(resolve.rows[i].items[j].id == 2){f = true}
                }
                f.should.equal(true)
                f = false
            }
            done()
        })
    })
})

describe('DbFarmer.queryFarmerByItemName', () => {
    it(`should query farmer in farmers_table by item name='Oolong Tea'`, done => {
        DbFarmer.queryFarmerByItemName('Oolong Tea').then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rowCount = parseInt(resolve.rowCount, 10)
            let f = false
            for(let i = 0; i < rowCount; i++){
                let itemCount = parseInt(resolve.rows[i].items.length ,10)
                for(let j = 0; j < itemCount; j++){
                    if(resolve.rows[i].items[j].name == 'Oolong Tea'){f = true}
                }
                f.should.equal(true)
                f = false
            }
            done()
        })
    })
})

var farmerCountActions = 0;
describe('FarmerAction.queryFarmersCountAll', () => {
    it(`should send the count of all farmers in farmers_table`, done => {
        fetch(config.farmer_action_url + '/query_farmers_count_all',{
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((response) => {
              console.log(response.result)
            response.status.should.equal(config.success)
            farmerCountActions = response.result.count
            done()
            return response
        }).catch(
            (reject) => {
              console.log(reject)            
            }
        )
    })
})

describe('FarmerAction.insertFarmer', () => {
    it(`should send the id of inserted farmers in farmers_table`, done => {
        let comment = {note: "First", ext: {}}
        fetch(config.farmer_action_url + '/insert_farmer',{
            method: 'POST',
            body: new URLSearchParams({
                name: "Dai3",
                cover_img: "farmer1.jpg",
                items: JSON.stringify([{id: 2, name: "Green Tea"},{id: 1, name: "Oolong Tea"}]),
                comment: JSON.stringify(comment)
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response.result.id)
            console.log(farmerCountActions)
            response.status.should.equal(config.success)
            response.result.id.should.equal(farmerCountActions+1)
            farmerCountActions = farmerCountActions + 1
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('FarmerAction.queryFarmerById', () => {
    it(`should send the farmer of queryed id=5 in farmers_table`, done => {
        fetch(config.farmer_action_url + '/query_farmer_by_id',{
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

describe('FarmerAction.queryFarmerByName', () => {
    it(`should send the farmer of queryed name='Dai' in farmers_table`, done => {
        fetch(config.farmer_action_url + '/query_farmer_by_name',{
            method: 'POST',
            body: new URLSearchParams({
                name: "Dai"
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            //   console.log(response)
            response.status.should.equal(config.success)
            response.result.forEach((farmer, index, array) => {
                farmer.name.should.equal('Dai')
            })
            
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('FarmerAction.queryFarmerByItemId', () => {
    it(`should send the farmer of queryed item id=2 in farmers_table`, done => {
        fetch(config.farmer_action_url + '/query_farmer_by_item_id',{
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
            response.status.should.equal(config.success)
            let rowCount = response.result.length
            let f = false
            for(let i = 0; i < rowCount; i++){
                let itemCount = response.result[i].items.length
                for(let j = 0; j < itemCount; j++){
                    if(response.result[i].items[j].id == 2){f = true}
                }
                f.should.equal(true)
                f = false
            }
            
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('FarmerAction.queryFarmerByItemName', () => {
    it(`should send the farmer of queryed item name='Dai' in farmers_table`, done => {
        fetch(config.farmer_action_url + '/query_farmer_by_item_name',{
            method: 'POST',
            body: new URLSearchParams({
                name: "Dai"
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            //   console.log(response)
            response.status.should.equal(config.success)
            let rowCount = response.result.length
            let f = false
            for(let i = 0; i < rowCount; i++){
                let itemCount = response.result[i].items.length
                for(let j = 0; j < itemCount; j++){
                    if(response.result[i].items[j].name == 'Dai'){f = true}
                }
                f.should.equal(true)
                f = false
            }
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('FarmerAction.queryFarmerList', () => {
    it(`should send farmers list count=2, offset=3 in farmers_table`, done => {
        fetch(config.farmer_action_url + '/query_farmer_list',{
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