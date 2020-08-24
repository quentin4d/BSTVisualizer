const express = require("express");
const cors = require("cors")
const app = express(); 
const port = process.env.PORT || 3000; 
const http = require('http');
const server = http.createServer(app);
server.listen(port);
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/public/index.html'); 
});
app.use(express.static('public'));  
app.use(express.json({limit: '1mb'}));