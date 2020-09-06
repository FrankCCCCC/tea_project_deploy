const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet')

app.use(cors());
app.use(helmet())
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    console.log('process pid =>', process.pid); // 觀察 load balance 用
    res.send('Hello World')
})

const server = app.listen(5000)
console.log("Static Server Listen on Port: 5000");