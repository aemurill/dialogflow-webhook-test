'use strict'

const ***REMOVED*** http, https } = require('follow-redirects');

function httpRequest(params, postData)***REMOVED***
  return new Promise(function(resolve, reject)***REMOVED***
    console.log('promis')
    var req = http.request(params, function(res)***REMOVED***
      /*if (res.statusCode < 200 || res.statusCode >= 300) ***REMOVED***
        return reject(new Error('statusCode=' + res.statusCode));
      }*/
      var body = [];
      res.on('data', function(chunk) ***REMOVED***
        console.log('push')
          body.push(chunk);
      });
      res.on('error', function(err) ***REMOVED***
        console.log('reqerr')
        // This is not a "Second reject", just a different sort of failure
        reject(err);
      });
      res.on('end', function() ***REMOVED***
        console.log('end')
        try ***REMOVED***
            body = Buffer.concat(body).toString();
        } catch(e) ***REMOVED***
            console.log("error1")
            reject(e);
        }
        resolve(body);
      });
    });
    req.on('error', function(err) ***REMOVED***
      console.log('push')
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    req.on('timeout', function(err) ***REMOVED***
      console.log('push')
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    req.on('uncaughtException', function(err) ***REMOVED***
      console.log('push')
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    if (postData) ***REMOVED***
        console.log('post')
        req.write(postData);
    }
    // IMPORTANT
    req.end();
  })
}

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
  let json_msg = ***REMOVED*** 
    "fulfillment_response": ***REMOVED*** 
      "messages": [
        ***REMOVED*** 
          "play_audio": ***REMOVED*** 
            "audio_uri": "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
          } 
        }
      ] 
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

  let req_sessionInfo = null;
  let req_parameters = null;
  let req_email = null;
  let req_password = null;
  let valid = false;
  if (req_body.sessionInfo != null)***REMOVED***
    req_sessionInfo = req_body.sessionInfo;
    if (req_sessionInfo.parameters != null)***REMOVED***
      req_parameters = req_sessionInfo.parameters;
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
              "Login Successful - Sending Data via session_info"
            ]
          }
        }],
        "merge_behavior": "REPLACE"
      },
      "page_info":***REMOVED***
        "form_info" : ***REMOVED***
          "parameter_info": [
            ***REMOVED***
              "display_name": "jake",
              "state": "FILLED",
              "value": true,
            }
          ]
        }
      },
      "session_info": ***REMOVED***
        "parameters": ***REMOVED***
          "loggedIn" : true,
          "valid" : true,
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
              "Connected - Sending Data via session_info"
            ]
          }
        }],
        "merge_behavior": "REPLACE"
      },
      "session_info": ***REMOVED***
        "parameters": ***REMOVED***
          "loggedIn" : false,
          "valid" : true,
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

/*function getRandAnimal3(api_res, res)***REMOVED***
  console.log("POST API CALL FOR ANIMAL");
  console.log(api_res);
  var obj = JSON.parse(api_res);
  

  var json_msg = null;

  json_msg = ***REMOVED***
    "fulfillment_response": ***REMOVED***
      "messages": [***REMOVED***
        "text": ***REMOVED***
          "text": [
            "Connected - Sending Data via session_info"
          ]
        }
      }],
      "merge_behavior": "REPLACE"
    },
    "session_info": ***REMOVED***
      "parameters": ***REMOVED***
        "loggedIn" : false,
        "valid" : true,
      }
    }
  }

  console.log("RES:")
  console.log(JSON.stringify(json_msg, null, 2));
  res.json(
    json_msg
  );
}

}*/

const getAnimals = async(req, res) => ***REMOVED***
  let req_body = req.body;
  console.log(req_body);

  /*curl -d "grant_type=client_credentials&client_id=vuQeLWIlk4iwUP1Rj8BOxSTlLuSKy5YoHU1qfg7JaHKfJ3MWcl&client_secret=PyUZvJyYEAeCAgxpLMf68LllD42d6XjoHVcKkJ3o" https://api.petfinder.com/v2/oauth2/token*/  

  var post_data = "grant_type=client_credentials&client_id=vuQeLWIlk4iwUP1Rj8BOxSTlLuSKy5YoHU1qfg7JaHKfJ3MWcl&client_secret=PyUZvJyYEAeCAgxpLMf68LllD42d6XjoHVcKkJ3o";
  var post_request_options = ***REMOVED***
    host: "api.petfinder.com",
    port: '80',
    path: "/v2/oauth2/token",
    method: "POST",
    headers: ***REMOVED***
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    }
  }

  var access_token;
  var body = await httpRequest(post_request_options, post_data).catch((error) => ***REMOVED***console.error(error)})
  
  console.log(body);
  var obj = JSON.parse(body);
  access_token = obj.access_token;
  post_request_options.path = "/v2/animals"
  post_request_options.headers = ***REMOVED***};
  post_request_options.headers.Authorization = "Bearer ".concat(access_token);
  console.log(post_request_options.headers.Authorization)
  post_request_options.method = "GET";
   
  body = await httpRequest(post_request_options).catch((error) => ***REMOVED***console.error(error)})
  console.log(body);

  obj = JSON.parse(body)
  var animals = [];
  var i = 0;
  for(var animal of obj.animals)***REMOVED***
    const a_name = animal.name;
    const a_species = animal.species;
    const a_gender = animal.gender;
    const a_age = animal.age;
    const ID = animal.id;
    animals[i] = ***REMOVED***
      "title": "[".concat(a_name).concat(" the ").concat(a_age).concat(" ").concat(a_gender).concat(" ").concat(a_species).concat("     ").concat(ID).concat("]")
    }
    i++;
  }

  /****REMOVED***
      "text": ***REMOVED***
        "text": [
          "Connected - Sending Data via session_info"
        ]
      }
    } */

  var json_msg = ***REMOVED***
    "fulfillment_response": ***REMOVED***
      "messages": [],
      "merge_behavior": "MERGE"
    }
  }

  var i = 0
  for (var animal of animals)***REMOVED***
    json_msg.fulfillment_response.messages[i] = ***REMOVED***
      "text": ***REMOVED***
        "text": [
          animals[i].title
        ]
      }
    }
    i++;
  }

  console.log("RES:")
  console.log(JSON.stringify(json_msg, null, 2));
  res.json(
    json_msg
  );

};

const getAnimal = async(req, res) => ***REMOVED***
  let req_body = req.body;
  console.log(req_body);
  var target = req_body.sessionInfo.parameters.animal_id;
  

  /*curl -d "grant_type=client_credentials&client_id=vuQeLWIlk4iwUP1Rj8BOxSTlLuSKy5YoHU1qfg7JaHKfJ3MWcl&client_secret=PyUZvJyYEAeCAgxpLMf68LllD42d6XjoHVcKkJ3o" https://api.petfinder.com/v2/oauth2/token*/  

  var post_data = "grant_type=client_credentials&client_id=vuQeLWIlk4iwUP1Rj8BOxSTlLuSKy5YoHU1qfg7JaHKfJ3MWcl&client_secret=PyUZvJyYEAeCAgxpLMf68LllD42d6XjoHVcKkJ3o";
  var post_request_options = ***REMOVED***
    host: "api.petfinder.com",
    port: '80',
    path: "/v2/oauth2/token",
    method: "POST",
    headers: ***REMOVED***
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    }
  }

  var access_token;
  var body = await httpRequest(post_request_options, post_data).catch((error) => ***REMOVED***console.error(error)})
  
  console.log(body);
  var obj = JSON.parse(body);
  access_token = obj.access_token;
  post_request_options.path = "/v2/animals/".concat(target);
  post_request_options.headers = ***REMOVED***};
  post_request_options.headers.Authorization = "Bearer ".concat(access_token);
  console.log(post_request_options.headers.Authorization)
  post_request_options.method = "GET";
   
  body = await httpRequest(post_request_options).catch((error) => ***REMOVED***console.error(error)})
  console.log(body);

  obj = JSON.parse(body)
  //var animals = [];
  //var i = 0;
  //for(var animal of obj.animals)***REMOVED***
  var animal = obj.animal;
  const a_name = animal.name;
  const a_species = animal.species;
  const a_gender = animal.gender;
  const a_age = animal.age;
  const a_url = animal.url;
  const ID = animal.id;
  var msg_animal = ***REMOVED***
      "title": a_name.concat(" the ").concat(a_age).concat(" ").concat(a_gender).concat(" ").concat(a_species).concat("     ").concat(ID),
      "url": a_url
  }
    //i++;
  //}

  /****REMOVED***
      "text": ***REMOVED***
        "text": [
          "Connected - Sending Data via session_info"
        ]
      }
    } */

  var json_msg = ***REMOVED***
    "fulfillment_response": ***REMOVED***
      "messages": [],
      "merge_behavior": "REPLACE"
    }
  }

  json_msg.fulfillment_response.messages = [
    ***REMOVED***
      "text": ***REMOVED***
        "text": [
          msg_animal.title
        ]
      }
    },
    ***REMOVED***
      "text": ***REMOVED***
        "text": [
          msg_animal.url
        ]
      }
    }
  ]

  console.log("RES:")
  console.log(JSON.stringify(json_msg, null, 2));
  res.json(
    json_msg
  );

};


const transition = async(req, res) => ***REMOVED***
  let req_body = req.body;
  console.log(req_body);  

  var json_msg = ***REMOVED***
    "fulfillment_response": ***REMOVED***
      "messages": [],
      "merge_behavior": "REPLACE"
    },
    "target_page": "projects/dialogflow-support-team-cx/locations/global/agents/c6952e13-2ab2-4e5a-a4f5-d20d55874238/flows/00000000-0000-0000-0000-000000000000/pages/c62f42c6-a127-4c7b-a292-4b775c8a4a4a"
  }

  json_msg.fulfillment_response.messages = [
    ***REMOVED***
      "text": ***REMOVED***
        "text": [
          "Transitioning..."
        ]
      }
    }
  ]

  console.log("RES:")
  console.log(JSON.stringify(json_msg, null, 2));
  res.json(
    json_msg
  );

};



module.exports = ***REMOVED***
  test: test,
  login: login,
  listAnimals: getAnimals,
  getAnimal: getAnimal,
  transition: transition
};