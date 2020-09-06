const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet')

app.use(cors());
app.use(helmet())
app.use(express.static(__dirname + '/build'));

const server = app.listen(3000)
console.log("App Server Listen on Port: 3000");