'use strict'


const test = (req, res) => ***REMOVED***
  let body = req.body;
  console.log(body);

  // Retrieving parameters from the request made by the agent
  // Performing the action
  /*if (action === 'fetchPriceCryptoCurrency') ***REMOVED***
    // Fetch the price of the cryptocurrency
    let price = ...
    let response = ...
  }*/

  // Sending back the results to the agent
  json_msg = ***REMOVED***
    "fulfillment_response": ***REMOVED***
      "messages": [***REMOVED***
        "text": ***REMOVED***
          "text": [
            "test"
          ]
        }
      }],
      "merge_behavior": "REPLACE"
    }
  }
  console.log("RES:")
  console.log(json_msg)
  res.json(
    json_msg
  );
};

const login = (req, res) => ***REMOVED***
  let body = req.body;
  console.log(body);

  // Retrieving parameters from the request made by the agent
  // Performing the action
  /*if (action === 'fetchPriceCryptoCurrency') ***REMOVED***
    // Fetch the price of the cryptocurrency
    let price = ...
    let response = ...
  }*/

  // Sending back the results to the agent
  var json_msg = ***REMOVED***
    "fulfillment_response": ***REMOVED***
      "messages": [***REMOVED***
        "text": ***REMOVED***
          "text": [
            "Login Successful"
          ]
        }
      }],
      "merge_behavior": "REPLACE"
    },
    "page_info":***REMOVED***
      "form_info" : ***REMOVED***
        "parameter_info": [
          ***REMOVED***
            "display_name": "valid",
            "state": 3,
            "value": true,
          }
        ]
      }
    },
    "session_info": ***REMOVED***
      "parameters": ***REMOVED***
        "loggedIn" : true
      }
    }
  }
  console.log("RES:")
  console.log(json_msg)
  res.json(
    json_msg
  );
};

module.exports = ***REMOVED***
  test: test,
  login: login
};