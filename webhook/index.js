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
  res.json(
    ***REMOVED***
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
  res.json(
    ***REMOVED***
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
      "session_info": ***REMOVED***
        "session" : body.sessionInfo.session,
        "parameters": ***REMOVED***"loggedIn" : true}
      }
    }
  );
};

module.exports = ***REMOVED***
  test: test,
  login: login
};