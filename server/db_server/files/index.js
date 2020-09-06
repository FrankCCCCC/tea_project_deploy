const PostActions = require('./action/PostActions.js')
const ItemActions = require('./action/ItemActions')
const FarmerActions = require('./action/FarmerActions')
const OrderActions = require('./action/OrderActions')
const AppDataActions = require('./action/AppDataActions')
const serverConfig = require('./config/serverConfig')
const util = require('./util/Util')
const Init = require('./init/Init')
const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
require('custom-env').env(process.argv[2])

var app = express()

app.set('trust proxy', true)
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet())

app.use(serverConfig.post_action, PostActions.actions)
PostActions.actions.on('post_ready', () => {
    console.log('PostActions Ready')

    app.use(serverConfig.farmer_action, FarmerActions.actions)
    FarmerActions.actions.on('ready', () => {
        console.log('FarmerActions Ready')

        app.use(serverConfig.item_action, ItemActions.actions)
        ItemActions.actions.on('ready', () => {
            console.log('ItemActions Ready')

            app.use(serverConfig.order_action, OrderActions.actions)
            OrderActions.actions.on('ready', () => {
                console.log('OrderActions Ready')

                app.use(serverConfig.app_data_action, AppDataActions.actions)  
                AppDataActions.actions.on('ready', () => {
                    console.log('AppDataActions Ready')
                    // app.listen(process.env.SERVER_PORT, setup)
                    app.listen(serverConfig.port, setup)
                })
            })
        })  
    })
})

var setup = () => {
    // console.log(process.env.DB_HOST)
    // console.log(process.env.STATIC_HOST)
    // console.log(process.env.DB_USER)
    // console.log(process.env.MODE)
    util.log(`Server is listening on port ${serverConfig.port}`)
    util.log(`${process.env.MODE} Mode`)
    switch(process.env.MODE){
	case 'start':
	    Init.devInit()
	    break
        case 'dev':
            Init.devInit()
            break
        case 'remote_dev':
            Init.devInit()
            break
        case 'deploy':
            Init.deployInit()
            break
        case 'heroku':
            Init.devInit()
            break
    }
};

