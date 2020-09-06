require('custom-env').env(process.argv[2])

const image_route = '/img/'
const video_route = '/video/'
const static_server_base_url = process.env.STATIC_HOST
// const static_server_base_url = 'http://leafhopper_service.nctu.me'
// const static_server_base_url = 'http://localhost'
// const port = 5000
const port = process.env.STATIC_PORT

const img_url = static_server_base_url + ':' + String(port) + image_route
const video_url = static_server_base_url + ':'  + String(port) + video_route

const supported_image_format = ["jpg", "png", "svg", "gif"]
const supported_video_format = ["mp4", "avi"]

exports.image_route = image_route
exports.video_route = video_route
exports.port = port
exports.static_server_base_url = static_server_base_url

exports.img_url = img_url
exports.video_url = video_url

exports.supported_image_format = supported_image_format
exports.supported_video_format = supported_video_format