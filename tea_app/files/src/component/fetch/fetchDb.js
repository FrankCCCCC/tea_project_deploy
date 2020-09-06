const fetch = require("node-fetch");
function get(url, params){
    return fetch(url, params).then(
      (response) => {
        // console.log(response)
        // return response.json()
        return response.json()
      }
    ).then(
        (resolve) => {
          // console.log(resolve)
          return resolve.result
        }
    ).catch(
      (reject) => {
        console.log(reject)            
        return reject
      }
    )
  }

// exports.get = get
export default get