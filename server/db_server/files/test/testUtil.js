// const should = require('should')
// const Util = require('../util/Util')
// const DbItem = require('../db/DbItem');
// const config = require('../config/serverConfig')

// var allItemCount = 0;

// describe('Util.checkInt', () => {
//     it(`should parse '5' to 5`, done => {
//         Util.checkInt('5', 'testUtil.checkInt 1').should.equal(5)
//         done()
//     })

//     it(`should parse '5.3' to 5`, done => {
//         Util.checkInt('5.3', 'testUtil.checkInt 2').should.equal(5)
//         done()
//     })

//     it(`should parse 5.3 to 5`, done => {
//         Util.checkInt(5.3, 'testUtil.checkInt 3').should.equal(5)
//         done()
//     })

//     it(`should parse 5 to 5`, done => {
//         Util.checkInt(5, 'testUtil.checkInt 4').should.equal(5)
//         done()
//     })

//     it(`should parse {id: 3} to '[object Object]'`, done => {
//         Util.checkString({id: 3}, 'testUtil.checkInt 5').should.equal('[object Object]')
//         done()
//     })

//     it(`should parse Nan to 'NaN'`, done => {
//         Util.checkString(NaN, 'testUtil.checkInt 6').should.equal('NaN')
//         done()
//     })

//     it(`should parse undefined to 'undefined'`, done => {
//         Util.checkString(undefined, 'testUtil.checkInt 7').should.equal('undefined')
//         done()
//     })
// })

// describe('Util.checkNumber', () => {
//     it(`should parse '5' to 5`, done => {
//         Util.checkNumber('5', 'testUtil.checkNumber 1').should.equal(5)
//         done()
//     })

//     it(`should parse '5.3' to 5.3`, done => {
//         Util.checkNumber('5.3', 'testUtil.checkNumber 2').should.equal(5.3)
//         done()
//     })

//     it(`should parse 5.3 to 5.3`, done => {
//         Util.checkNumber(5.3, 'testUtil.checkNumber 3').should.equal(5.3)
//         done()
//     })

//     it(`should parse 5 to 5`, done => {
//         Util.checkNumber(5, 'testUtil.checkNumber 4').should.equal(5)
//         done()
//     })

//     // it(`should parse {id: 3} to '[object Object]'`, done => {
//     //     Util.checkNumber({id: 3}, 'testUtil.checkNumber 5').should.equal(NaN)
//     //     done()
//     // })

//     // it(`should parse NaN to 'NaN'`, done => {
//     //     Util.checkNumber(NaN, 'testUtil.checkNumber 6').should.equal(NaN)
//     //     done()
//     // })

//     // it(`should parse undefined to 'undefined'`, done => {
//     //     Util.checkNumber(undefined, 'testUtil.checkNumber 7').should.equal('NaN')
//     //     done()
//     // })
// })

// describe('Util.checkString', () => {
//     it(`should parse 5 to '5'`, done => {
//         Util.checkString(5, 'testUtil.checkString 1').should.equal('5')
//         done()
//     })

//     it(`should parse 5.3 to '5.3'`, done => {
//         Util.checkString(5.3, 'testUtil.checkString 2').should.equal('5.3')
//         done()
//     })

//     it(`should parse {id: 3} to '[object Object]'`, done => {
//         Util.checkString({id: 3}, 'testUtil.checkString 3').should.equal('[object Object]')
//         done()
//     })

//     it(`should parse Nan to 'NaN'`, done => {
//         Util.checkString(NaN, 'testUtil.checkString 4').should.equal('NaN')
//         done()
//     })

//     it(`should parse undefined to 'undefined'`, done => {
//         Util.checkString(undefined, 'testUtil.checkString 5').should.equal('undefined')
//         done()
//     })
// })

// describe('Util.checkObject', () => {
//     // it(`should parse {i: 0} to {i: 0}`, done => {
//     //     assert(Util.checkObject(5, 'testUtil.checkObject 1'), {i: 0})
//     //     done()
//     // })

//     // it(`should parse 5.3 to null`, done => {
//     //     Util.checkObject(5.3, 'testUtil.checkObject 2').should.equal(null)
//     //     done()
//     // })

//     // it(`should parse null to null`, done => {
//     //     Util.checkObject({id: 3}, 'testUtil.checkObject 3').should.equal('[object Object]')
//     //     done()
//     // })

//     // it(`should parse Nan to 'NaN'`, done => {
//     //     Util.checkObject(NaN, 'testUtil.checkObject 4').should.equal('NaN')
//     //     done()
//     // })

//     // it(`should parse undefined to 'undefined'`, done => {
//     //     Util.checkObject(undefined, 'testUtil.checkObject 5').should.equal('undefined')
//     //     done()
//     // })
// })