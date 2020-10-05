'use strict'

const webhook = (req, res) => ***REMOVED***
  let body = req.body

  // Retrieving parameters from the request made by the agent
  let action = body.result.action
  let parameters = body.result.parameters

  // Performing the action
  /*if (action === 'fetchPriceCryptoCurrency') ***REMOVED***
    // Fetch the price of the cryptocurrency
    let price = ...
    let response = ...
  }*/

  // Sending back the results to the agent
  res.json(***REMOVED***fulfillment_response: ***REMOVED***messages: [***REMOVED***message: "Hello"}], merge_behavior: APPEND}})
}

module.exports = webhook
