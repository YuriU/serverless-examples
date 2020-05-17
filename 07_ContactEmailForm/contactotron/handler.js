'use strict';

module.exports.submitContactForm = async (event, context) => {
  console.log("Event: ", event);

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({message: "Hello, world!"})
  };

  console.log("RESPONSE: ", JSON.stringify(response));
  return response;
};
