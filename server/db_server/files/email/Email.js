// import Mail from 'nodemailer/lib/mailer'

const nodemailer = require('nodemailer')
const MailConfig = require('../config/MailConfig')
const Util = require('../util/Util')

const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: MailConfig.account,
        pass: MailConfig.password
    }
})

function sendEmail(mail_options){
    mailTransport.sendMail(mail_options, (error, info) => {
        if(error){console.log(error)}
        else{console.log('Message Sent' + info.response)}
    })
}

function sendConfirmOrderMail(to, name, address, order, price){
    let mapOrderToHTML = (order) => {
        console.log(order)
        let order_list = order.map((item, index, array) => {
            return `<tr>
                        <td>${item.name}</td>
                        <td>${Util.convertSellTypeToString(item.sell_type)}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price} ${item.unit}</td>
                    </tr>`
        })
        return `<table style="width:100%">
                    <tr>
                        <th>品名</th>
                        <th>銷售方式</th>
                        <th>數量</th>
                        <th>價格</th>
                    </tr>
                    ${order_list}
                </table>`
    }
    let order_content = mapOrderToHTML(order)

    let text_content = `<h3>${name} 先生/女士 您好</h3>
                    <p>已收到您的訂單，我們會盡快為您出貨，請您耐心等候。您的訂單明細如下：</p>
                    ${order_content} 
                    <h6>配送地址為：${address}</6>
                    <h6>總金額為：${price}</h6>
                    <h4>綠蟬數據感謝您的支持，一起傳承臺灣百年茶文化</h4>`
    // let text_content = name + MailConfig.confirm_order.greet + MailConfig.confirm_order.already_recieved + JSON.stringify(order) + MailConfig.confirm_order.total_price + price + MailConfig.confirm_order.thank
    sendEmail({from: MailConfig.account, to :to, subject: MailConfig.confirm_order.subject, html: text_content})
    sendEmail({from: MailConfig.account, to :MailConfig.official, subject: MailConfig.notify_order.subject, html: text_content})
}

exports.sendEmail = sendEmail
exports.sendConfirmOrderMail = sendConfirmOrderMail