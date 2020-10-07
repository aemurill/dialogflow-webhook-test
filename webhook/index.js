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
  console.log(JSON.stringify(json_msg, null, 2));
  res.json(
    json_msg
  );
};

const login = (req, res) => ***REMOVED***
  let req_body = req.body;
  console.log(req_body);

  let req_session_info = null;
  let req_parameters = null;
  let req_email = null;
  let req_password = null;
  let valid = false;
  if (req_body.session_info != null)***REMOVED***
    req_session_info = req_body.session_info;
    if (req_session_info.parameters != null)***REMOVED***
      req_parameters = req_session_info.parameters;
      if (req_parameters.email != null && req_parameters.password != null)***REMOVED***
        req_email = req_parameters.email;
        req_password = req_parameters.password;
        if(req_email== "test@gmail.com" && req_password == "abc123") 
          valid = true; 
      }
    }
  }

  var json_msg = null;

  if(valid)***REMOVED***
    json_msg = ***REMOVED***
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
      /*"page_info":***REMOVED***
        "form_info" : ***REMOVED***
          "parameter_info": [
            ***REMOVED***
              "display_name": "valid",
              "state": 3,
              "value": true,
            }
          ]
        }
      },*/
      "session_info": ***REMOVED***
        "parameters": ***REMOVED***
          "loggedIn" : true,
          "valid" : true
        }
      }
    }
  }
  else***REMOVED***
    json_msg = ***REMOVED***
      "fulfillment_response": ***REMOVED***
        "messages": [***REMOVED***
          "text": ***REMOVED***
            "text": [
              "Login Failed"
            ]
          }
        }],
        "merge_behavior": "REPLACE"
      }, 
      "session_info": ***REMOVED***
        "parameters": ***REMOVED***
          "loggedIn" : false,
          "valid" : false
        }
      }
    }
  }
  console.log("RES:")
  console.log(JSON.stringify(json_msg, null, 2));
  res.json(
    json_msg
  );
};

module.exports = ***REMOVED***
  test: test,
  login: login
};