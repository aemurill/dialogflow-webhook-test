'use strict'

let express = require('express')
let app = express()
let bodyParser = require('body-parser')

/***** NEW *****/
// Require the module webhook/index.js
let webhook = require('./webhook')
/***************/

// These two following lines ensures that every incomming request
// is parsed to json automatically
app.use(bodyParser.urlencoded(***REMOVED*** extended: 'true' }))
app.use(bodyParser.json())

// Allow access to resources from any origin and any headers. As we want
// the agent to reach the webhook and not bother with CORS, they are fully
// permissive
app.use((req, res, next) => ***REMOVED***
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

/***** NEW *****/
// Handle POST http requests on the /webhook endpoint
app.post('/webhook', webhook)
/***************/

// The server is now listening on the port 8080
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => ***REMOVED***
    console.log(`Our app is running on port $***REMOVED*** PORT }`);
});