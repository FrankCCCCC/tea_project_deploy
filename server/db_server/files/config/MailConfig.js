require('custom-env').env(process.argv[2])

// const account = 'leafhopper.tw@gmail.com'
const account = process.env.MAIL_ACCOUNT
// const password = 'qaophllpywsardwb'
const password = process.env.MAIL_PASSWORD
const official = process.env.MAIL_OFFICIAL
const confirm_order = {
    subject: "綠蟬數據  已收到您的訂單",
    greet: ' 先生/女士 您好\n',
    already_recieved: '已收到您的訂單，我們會盡快為您出貨，請您耐心等候。您的訂單明細如下：\n',
    total_price: '\n總金額為：',
    thank: '\n綠蟬數據感謝您的支持，一起傳承臺灣百年茶文化\n'
}
const notify_order = {
    subject: "綠蟬數據  訂單通知",
}

exports.account = account
exports.password = password
exports.official = official
exports.confirm_order = confirm_order
exports.notify_order = notify_order