const {Pool} = require('pg');
const util = require('../util/Util');
const dbConfig = require('../config/dbConfig')

const pool = new Pool(dbConfig.config);
// const pool = new Pool({connectionString: process.env.DATABASE_URL})

pool.on('error', (err, client) => {
    console.error('Error: ', err)
    
})

function query(command){
    util.log(command)
    return pool.query(command).then(
        (resolve) => {
            console.log(resolve)
            util.log(`command: ${resolve.command}, rowCount: ${resolve.rowCount}`)
            return resolve
        }
    ).catch(
        (reject) => {
            util.log(`Error: ${reject}`)
            return reject;
        }
    )
}

exports.query = query