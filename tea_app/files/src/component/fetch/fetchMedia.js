const config = require('../util/config')

function fetchImage(imgName){
  return fetch(String(imgName),{
    method: 'GET',
  }).then(
    (response) => {
      // console.log(response)
      return response.blob()
    }
  ).then(
      (img) => {
        var imgobj = URL.createObjectURL(img) 
        console.log(imgobj)
        return imgobj;
      }
  ).catch(
    (reject) => {
      console.log(reject)            
    }
  )
}

function fetchVideo(videoName){
  return fetch(config.image_fetch_url + String(videoName),{
    method: 'GET',
  }).then(
    (response) => {
      // console.log(response)
      return response.blob()
    }
  ).then(
      (img) => {
        var imgobj = URL.createObjectURL(img) 
        console.log(imgobj)
        return imgobj;
      }
  ).catch(
    (reject) => {
      console.log(reject)            
    }
  )
}

exports.fetchImage = fetchImage;