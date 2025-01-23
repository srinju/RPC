
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
const port = 3000;

app.use(bodyParser.json()); //parse the json bodies

function add(a , b){
    return a + b;
}

app.get('/rpc' , (req , res) => {
    const { id , param , body , method} = req.body;
    
})
