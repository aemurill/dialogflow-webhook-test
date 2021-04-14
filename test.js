'use strict'

let express = require('express')
let app = express()
let bodyParser = require('body-parser')

/***** NEW *****/
// Require the module webhook/index.js
let webhook = require('./webhook')
/***************/

var req = {"body": "hi"}
webhook.randAnimal(req);