//DUMB implementatioon of an json rpc implemenation

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Define a sample method
function add(a, b) {
    return a + b;
}

// Handle JSON-RPC requests
app.post('/rpc', (req, res) => {
    const { jsonrpc, method, params, id } = req.body;

    if (jsonrpc !== '2.0' || !method || !Array.isArray(params)) {
        res.status(400).json({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request' }, id });
        return;
    }

    // Execute the method
    let result;
    //checks if the methid is add then performs the operation as per the operation function 
    //if it is not that method return a defailt payload saying that thte method was not founde
    switch (method) {
        case 'add':
            result = add(params[0], params[1]);
            break;
        default:
            res.status(404).json({ jsonrpc: '2.0', error: { code: -32601, message: 'Method not found' }, id });
            return;
    }

    // Send back the response
    res.json({ jsonrpc: '2.0', result, id });
});

// Start the server
app.listen(port, () => {
    console.log(`JSON-RPC server listening at http://localhost:${port}`);
});

//it would be good if we have a filt that has all the methods and we can create the backends 
//with auto generaed code with ha file , and it can be used by other backends as well for a very high scaled application

