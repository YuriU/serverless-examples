'use strict';

const AWS = require('aws-sdk');


module.exports.submitContactForm = async (event, context) => {
  console.log("Event: ", event);

  const sns = new AWS.SNS();

  const messageData = JSON.parse(event.body);
  console.log("Message: ", messageData);

  let message = "Hello, world!";
  let statusCode = 200;

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };

  if(typeof messageData.name != 'string' || messageData.name.length === 0) {
    statusCode = 400;
    message = "Name is required";
  }

  if(typeof messageData.email != 'string' || messageData.email.length === 0) {
    statusCode = 400;
    message = "Email is required";
  }

  if(typeof messageData.message != 'string' || messageData.message.length === 0) {
    statusCode = 400;
    message = "Message is required";
  }


  const snsMessage = {
    TopicArn: process.env.CONTACT_TOPIC_ARN,
    Subject: "Message from Contactotron",
    Message: `
Contact Form Message

From: ${messageData.name} <${messageData.email}>
Message: 
${messageData.message}
    `
  };

  const result = await sns.publish(snsMessage).promise();
  console.log("PUBLISH RESULT: ", result);

  response.statusCode = statusCode;
  response.body = JSON.stringify({ message: message });

  console.log("RESPONSE: ", JSON.stringify(response));
  return response;
};
