// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => ***REMOVED***
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  /*function sendEmail(agent) ***REMOVED***
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const ort = agent.parameters.ort;

    const msg = ***REMOVED***
      to: 'daniel.rommel@morgenstern.de',
      from: 'danielrommel19@gmail.com',
      subject: 'Just a quick note',
      text: ort,
      html: 'Just saying <strong>Hi from Dialogflow</strong>...',
    };
    console.log(msg);
    sgMail.send(msg);

    agent.add(`What a beauty!`);
  }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Ticket erstellen - Geräusche - Art - Vorkommen - Ort', sendEmail);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);*/
});
