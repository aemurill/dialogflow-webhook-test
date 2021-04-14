'use strict'

const { http, https } = require('follow-redirects');

function httpRequest(params, postData){
  return new Promise(function(resolve, reject){
    console.log('promis')
    var req = http.request(params, function(res){
      /*if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('statusCode=' + res.statusCode));
      }*/
      var body = [];
      res.on('data', function(chunk) {
        console.log('push')
          body.push(chunk);
      });
      res.on('error', function(err) {
        console.log('reqerr')
        // This is not a "Second reject", just a different sort of failure
        reject(err);
      });
      res.on('end', function() {
        console.log('end')
        try {
            body = Buffer.concat(body).toString();
        } catch(e) {
            console.log("error1")
            reject(e);
        }
        resolve(body);
      });
    });
    req.on('error', function(err) {
      console.log('push')
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    req.on('timeout', function(err) {
      console.log('push')
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    req.on('uncaughtException', function(err) {
      console.log('push')
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
    if (postData) {
        console.log('post')
        req.write(postData);
    }
    // IMPORTANT
    req.end();
  })
}

const test = (req, res) => {
  let body = req.body;
  console.log(body);

  const {google} = require('googleapis');
  const {WebhookClient} = require('dialogflow-fulfillment');

  // Enter your calendar ID below and service account JSON below
  var calendarId = process.env.CAL_ID_1;
  var calendarId2 = process.env.CAL_ID_2;
  const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.PROJ_ID,
    "private_key_id": process.env.PRIV_KEY_ID,
    "private_key": process.env.PRIV_KEY_BLOB,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.CERT_URL
  }; // Starts with {"type": "service_account",...

  // Set up Google Calendar Service account credentials
  const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/calendar'
  });

  const calendar = google.calendar('v3');
  process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

  const timeZone = 'America/Los_Angeles';
  const timeZoneOffset = '-07:00';

  //Creates calendar event in Google Calendar
  function createCalendarEvent (dateTimeStart, dateTimeEnd, appointment_type) {
    if (Math.random() > 0.5) calendarId = calendarId2;
    return new Promise((resolve, reject) => {
      calendar.events.list({
        auth: serviceAccountAuth, // List events for time period
        calendarId: calendarId,
        timeMin: dateTimeStart.toISOString(),
        timeMax: dateTimeEnd.toISOString()
      }, (err, calendarResponse) => {
        // Check if there is a event already on the Calendar
        if (err || calendarResponse.data.items.length > 0) {
          reject(err || new Error('Requested time conflicts with another appointment'));
        } else {
          // Create event for the requested time period
          calendar.events.insert({ auth: serviceAccountAuth,
            calendarId: calendarId,
            resource: {summary: appointment_type +' Appointment', description: appointment_type,
              start: {dateTime: dateTimeStart},
              end: {dateTime: dateTimeEnd}}
          }, (err, event) => {
            err ? reject(err) : resolve(event);
          }
          );
        }
      });
    });
  }

  // Set the DialogflowApp object to handle the HTTPS POST request.


  const agent = new WebhookClient({ request: req, response: res });
  console.log("Parameters", agent.parameters);
  const appointment_type = agent.parameters.AppointmentType;
  function makeAppointment (agent) {
    // Calculate appointment start and end datetimes (end = +1hr from start)
    const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0] + timeZoneOffset));
    const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
    const appointmentTimeString = dateTimeStart.toLocaleString(
      'en-US',
      { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
    );
      // Check the availability of the time, and make an appointment if there is time on the calendar
    return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type).then(() => {
      agent.add(`Ok, let me see if we can fit you in. ${appointmentTimeString} is fine!.`);
    }).catch(() => {
      agent.add(`I'm sorry, there are no slots available for ${appointmentTimeString}.`);
    });
  }

  // Handle the Dialogflow intent named 'Schedule Appointment'.
  let intentMap = new Map();
  intentMap.set('Schedule Appointment', makeAppointment);
  agent.handleRequest(intentMap);

  
};

const login = (req, res) => {
  let req_body = req.body;
  console.log(req_body);

  let req_sessionInfo = null;
  let req_parameters = null;
  let req_email = null;
  let req_password = null;
  let valid = false;
  if (req_body.sessionInfo != null){
    req_sessionInfo = req_body.sessionInfo;
    if (req_sessionInfo.parameters != null){
      req_parameters = req_sessionInfo.parameters;
      if (req_parameters.email != null && req_parameters.password != null){
        req_email = req_parameters.email;
        req_password = req_parameters.password;
        if(req_email== "test@gmail.com" && req_password == "abc123") 
          valid = true; 
      }
    }
  }

  var json_msg = null;

  if(valid){
    json_msg = {
      "fulfillment_response": {
        "messages": [{
          "text": {
            "text": [
              "Login Successful - Sending Data via session_info"
            ]
          }
        }],
        "merge_behavior": "REPLACE"
      },
      "page_info":{
        "form_info" : {
          "parameter_info": [
            {
              "display_name": "jake",
              "state": "FILLED",
              "value": true,
            }
          ]
        }
      },
      "session_info": {
        "parameters": {
          "loggedIn" : true,
          "valid" : true,
        }
      }
    }
  }
  else{
    json_msg = {
      "fulfillment_response": {
        "messages": [{
          "text": {
            "text": [
              "Connected - Sending Data via session_info"
            ]
          }
        }],
        "merge_behavior": "REPLACE"
      },
      "session_info": {
        "parameters": {
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

/*function getRandAnimal3(api_res, res){
  console.log("POST API CALL FOR ANIMAL");
  console.log(api_res);
  var obj = JSON.parse(api_res);
  

  var json_msg = null;

  json_msg = {
    "fulfillment_response": {
      "messages": [{
        "text": {
          "text": [
            "Connected - Sending Data via session_info"
          ]
        }
      }],
      "merge_behavior": "REPLACE"
    },
    "session_info": {
      "parameters": {
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

const getAnimals = async(req, res) => {
  let req_body = req.body;
  console.log(req_body);

  /*curl -d "grant_type=client_credentials&client_id=vuQeLWIlk4iwUP1Rj8BOxSTlLuSKy5YoHU1qfg7JaHKfJ3MWcl&client_secret=PyUZvJyYEAeCAgxpLMf68LllD42d6XjoHVcKkJ3o" https://api.petfinder.com/v2/oauth2/token*/  

  var post_data = "grant_type=client_credentials&client_id=vuQeLWIlk4iwUP1Rj8BOxSTlLuSKy5YoHU1qfg7JaHKfJ3MWcl&client_secret=PyUZvJyYEAeCAgxpLMf68LllD42d6XjoHVcKkJ3o";
  var post_request_options = {
    host: "api.petfinder.com",
    port: '80',
    path: "/v2/oauth2/token",
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    }
  }

  var access_token;
  var body = await httpRequest(post_request_options, post_data).catch((error) => {console.error(error)})
  
  console.log(body);
  var obj = JSON.parse(body);
  access_token = obj.access_token;
  post_request_options.path = "/v2/animals"
  post_request_options.headers = {};
  post_request_options.headers.Authorization = "Bearer ".concat(access_token);
  console.log(post_request_options.headers.Authorization)
  post_request_options.method = "GET";
   
  body = await httpRequest(post_request_options).catch((error) => {console.error(error)})
  console.log(body);

  obj = JSON.parse(body)
  var animals = [];
  var i = 0;
  for(var animal of obj.animals){
    const a_name = animal.name;
    const a_species = animal.species;
    const a_gender = animal.gender;
    const a_age = animal.age;
    const ID = animal.id;
    animals[i] = {
      "title": "[".concat(a_name).concat(" the ").concat(a_age).concat(" ").concat(a_gender).concat(" ").concat(a_species).concat("     ").concat(ID).concat("]")
    }
    i++;
  }

  /*{
      "text": {
        "text": [
          "Connected - Sending Data via session_info"
        ]
      }
    } */

  var json_msg = {
    "fulfillment_response": {
      "messages": [],
      "merge_behavior": "MERGE"
    }
  }

  var i = 0
  for (var animal of animals){
    json_msg.fulfillment_response.messages[i] = {
      "text": {
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

const getAnimal = async(req, res) => {
  let req_body = req.body;
  console.log(req_body);
  var target = req_body.sessionInfo.parameters.animal_id;
  

  /*curl -d "grant_type=client_credentials&client_id=vuQeLWIlk4iwUP1Rj8BOxSTlLuSKy5YoHU1qfg7JaHKfJ3MWcl&client_secret=PyUZvJyYEAeCAgxpLMf68LllD42d6XjoHVcKkJ3o" https://api.petfinder.com/v2/oauth2/token*/  

  var post_data = "grant_type=client_credentials&client_id=vuQeLWIlk4iwUP1Rj8BOxSTlLuSKy5YoHU1qfg7JaHKfJ3MWcl&client_secret=PyUZvJyYEAeCAgxpLMf68LllD42d6XjoHVcKkJ3o";
  var post_request_options = {
    host: "api.petfinder.com",
    port: '80',
    path: "/v2/oauth2/token",
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(post_data)
    }
  }

  var access_token;
  var body = await httpRequest(post_request_options, post_data).catch((error) => {console.error(error)})
  
  console.log(body);
  var obj = JSON.parse(body);
  access_token = obj.access_token;
  post_request_options.path = "/v2/animals/".concat(target);
  post_request_options.headers = {};
  post_request_options.headers.Authorization = "Bearer ".concat(access_token);
  console.log(post_request_options.headers.Authorization)
  post_request_options.method = "GET";
   
  body = await httpRequest(post_request_options).catch((error) => {console.error(error)})
  console.log(body);

  obj = JSON.parse(body)
  //var animals = [];
  //var i = 0;
  //for(var animal of obj.animals){
  var animal = obj.animal;
  const a_name = animal.name;
  const a_species = animal.species;
  const a_gender = animal.gender;
  const a_age = animal.age;
  const a_url = animal.url;
  const ID = animal.id;
  var msg_animal = {
      "title": a_name.concat(" the ").concat(a_age).concat(" ").concat(a_gender).concat(" ").concat(a_species).concat("     ").concat(ID),
      "url": a_url
  }
    //i++;
  //}

  /*{
      "text": {
        "text": [
          "Connected - Sending Data via session_info"
        ]
      }
    } */

  var json_msg = {
    "fulfillment_response": {
      "messages": [],
      "merge_behavior": "REPLACE"
    }
  }

  json_msg.fulfillment_response.messages = [
    {
      "text": {
        "text": [
          msg_animal.title
        ]
      }
    },
    {
      "text": {
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


const transition = async(req, res) => {
  let req_body = req.body;
  console.log(req_body);  

  var json_msg = {
    "fulfillment_response": {
      "messages": [],
      "merge_behavior": "REPLACE"
    },
    "target_page": "projects/dialogflow-support-team-cx/locations/global/agents/c6952e13-2ab2-4e5a-a4f5-d20d55874238/flows/00000000-0000-0000-0000-000000000000/pages/c62f42c6-a127-4c7b-a292-4b775c8a4a4a"
  }

  json_msg.fulfillment_response.messages = [
    {
      "text": {
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



module.exports = {
  test: test,
  login: login,
  listAnimals: getAnimals,
  getAnimal: getAnimal,
  transition: transition
};