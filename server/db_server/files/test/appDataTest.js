const should = require('should')
const DbAppData = require('../db/DbAppData');
const Config = require('../config/serverConfig')
const fetch = require('node-fetch')

var allAppDataCount = 0;
var temp_property1 = ''
var temp_property2 = ''

// describe('DbAppData.createCommentType', () => {
//     it('should create Comment type', done => {
//         DbAppData.createCommentType().then((resolve) => {
//             resolve.command.should.equal('DO')
//             done()
//         })
//     })
// })

describe('DbAppData.createAppDataTable', () => {
    it('should create app_datas_table', done => {
        DbAppData.createAppDatasTable().then((resolve) => {
            resolve.command.should.equal('CREATE')
            done()
        })
    })
})

describe('DbAppData.queryAppDatasCountAll', () => {
    it('should count all app data in app_datas_table', done => {
        DbAppData.queryAppDatasCountAll().then((resolve) => {
            allAppDataCount = parseInt(resolve.rows[0].count);
            console.log(`All AppData Count: ${allAppDataCount}`)
            resolve.command.should.equal('SELECT')
            done()
        })
    })
})

describe('DbAppData.insertAppData', () => {
    it(`should insert app data into app_datas_table with values "test2", undefined, {note: "", ext: null}`, done => {
        let now = new Date
        temp_property1 = `Test ${now.toISOString()}`
        DbAppData.insertAppData(temp_property1, undefined, {note: "", ext: null}).then((resolve) => {
            resolve.command.should.equal('INSERT')
            resolve.rows[0].id.should.equal(allAppDataCount + 1)
            allAppDataCount = allAppDataCount + 1;
            
            done()
        })
    })

    
    it(`should insert app data into app_datas_table with values "test2", "Taiwan No.1", {note: "", ext: null}`, done => {
        let now = new Date
        temp_property2 = `Test ${now.toISOString()}`
        DbAppData.insertAppData(temp_property2, "Taiwan No.1", {note: "", ext: null}).then((resolve) => {
            resolve.command.should.equal('INSERT')
            resolve.rows[0].id.should.equal(allAppDataCount + 1)
            allAppDataCount = allAppDataCount + 1;
            done()
        })
    })
})

describe('DbAppData.queryAppDataList', () => {
    it(`should list app data in app_datas_table count=3, offset=2, ${allAppDataCount}`, done => {
        DbAppData.queryAppDataList(3, 2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allAppDataCount - 2)
            resolve.rowCount.should.equal(3)
            done()
        })
    })
    it(`should list all app data in app_datas_table count=-1, offset=0, ${allAppDataCount}`, done => {
        DbAppData.queryAppDataList(-1, 0).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allAppDataCount)
            resolve.rowCount.should.equal(allAppDataCount)
            done()
        })
    })
    it(`should list all app data in app_datas_table count=-1, offset=-2, ${allAppDataCount}`, done => {
        DbAppData.queryAppDataList(-1, -1).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allAppDataCount)
            resolve.rowCount.should.equal(allAppDataCount)
            done()
        })
    })
})

describe('DbAppData.queryAppDataById', () => {
    it(`should query app data in app_datas_table by id=2`, done => {
        DbAppData.queryAppDataById(2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rowCount.should.equal(1)
            resolve.rows[0].id.should.equal(2)
            done()
        })
    })
})

describe('DbAppData.queryAppDataByProperty', () => {
    it(`should query app data in app_datas_table by property='${temp_property1}'`, done => {
        DbAppData.queryAppDataByProperty(temp_property1).then((resolve) => {
            resolve.command.should.equal('SELECT')
            let rows = parseInt(resolve.rowCount)
            for(let i = 0; i < rows; i++){
                resolve.rows[i].property.should.equal(temp_property1)
            }
            done()
        })
    })
})

// // describe('DbAppData.queryAppDataByProducerId', () => {
// //     it(`should query app data in app_datas_table by producer id=2`, done => {
// //         DbAppData.queryAppDataByProducerId(2).then((resolve) => {
// //             resolve.command.should.equal('SELECT')
// //             let rows = parseInt(resolve.rowCount)
// //             for(let i = 0; i < rows; i++){
// //                 resolve.rows[i].producer.id.should.equal(2)
// //             }
// //             done()
// //         })
// //     })
// // })

// // describe('DbAppData.queryAppDataByProducerName', () => {
// //     it(`should query app data in app_datas_table by producer name='dai'`, done => {
// //         DbAppData.queryAppDataByProducerName('dai').then((resolve) => {
// //             resolve.command.should.equal('SELECT')
// //             let rows = parseInt(resolve.rowCount)
// //             for(let i = 0; i < rows; i++){
// //                 resolve.rows[i].producer.name.should.equal('dai')
// //             }
// //             done()
// //         })
// //     })
// // })

var appDataCountActions = 0;
describe('AppDataAction.queryAppDatasCountAll', () => {
    it(`should send the count of all app data in app_datas_table`, done => {
        fetch(Config.app_data_action_url + Config.query_app_datas_count_all,{
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((response) => {
              console.log(response.result)
            response.status.should.equal(Config.success)
            appDataCountActions = response.result.count
            done()
            return response
        }).catch(
            (reject) => {
              console.log(reject)            
            }
        )
    })
})

describe('AppDataAction.insertAppData', () => {
    it(`should send the id of inserted app data in app_datas_table`, done => {
        let now = new Date
        temp_property1 = `Test ${now.toISOString()}`
        fetch(Config.app_data_action_url + Config.insert_app_data,{
            method: 'POST',
            body: new URLSearchParams({
                property: temp_property1, 
                data: "Leafhopper",
                comment: JSON.stringify({note: "", ext: null}),
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response.result.id)
            console.log(appDataCountActions)
            response.status.should.equal(Config.success)
            response.result.id.should.equal(appDataCountActions+1)
            appDataCountActions = appDataCountActions + 1
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('AppDataAction.queryAppDataById', () => {
    it(`should send the app data of queryed id=5 in app_datas_table`, done => {
        fetch(Config.app_data_action_url + Config.query_app_data_by_id,{
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
            response.status.should.equal(Config.success)
            response.result.id.should.equal(5)
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('AppDataAction.queryAppDataByProperty', () => {
    it(`should send the app data of queryed property='${temp_property1}' in app_datas_table`, done => {
        fetch(Config.app_data_action_url + Config.query_app_data_by_property,{
            method: 'POST',
            body: new URLSearchParams({
                property: temp_property1
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            //   console.log(response)
            response.status.should.equal(Config.success)
            response.result.forEach((app_data, index, array) => {
                app_data.property.should.equal(temp_property1)
            })
            
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

// describe('AppDataAction.queryAppDataByProducerId', () => {
//     it(`should send the app data of queryed producer id=2 in app_datas_table`, done => {
//         fetch(Config.app_data_action_url + '/query_app_data_by_producer_id',{
//             method: 'POST',
//             body: new URLSearchParams({
//                 id: 2
//             }),
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }).then((response) => {
//             return response.json()
//         }).then((response) => {
//             //   console.log(response)
//             response.status.should.equal(Config.success)
//             response.result.forEach((app_data, index, array) => {
//                 app_data.producer.id.should.equal(2)
//             })
//               done()
//               return response
//         }).catch((reject) => {
//               console.log(reject)            
//         })
//     })
// })

// describe('AppDataAction.queryAppDataByProducerName', () => {
//     it(`should send the app data of queryed producer name='Dai' in app_datas_table`, done => {
//         fetch(Config.app_data_action_url + '/query_app_data_by_producer_name',{
//             method: 'POST',
//             body: new URLSearchParams({
//                 name: "Dai"
//             }),
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }).then((response) => {
//             return response.json()
//         }).then((response) => {
//             //   console.log(response)
//             response.status.should.equal(Config.success)
//             response.result.forEach((app_data, index, array) => {
//                 app_data.producer.name.should.equal('Dai')
//             })
//               done()
//               return response
//         }).catch((reject) => {
//               console.log(reject)            
//         })
//     })
// })

describe('AppDataAction.queryAppDataList', () => {
    it(`should send app data list count=2, offset=3 in app_datas_table`, done => {
        fetch(Config.app_data_action_url + Config.query_app_data_list,{
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
            response.status.should.equal(Config.success)
            response.result.length.should.equal(2)
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})