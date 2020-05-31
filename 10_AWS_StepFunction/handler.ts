import { APIGatewayProxyHandler } from 'aws-lambda';
var AWS = require('aws-sdk');
import 'source-map-support/register';
import { v4 as uuidv4 } from 'uuid';

export const startExecution: APIGatewayProxyHandler = async(event, _context) => {
  var stepfunctions = new AWS.StepFunctions({apiVersion: '2016-11-23'});

  console.log(JSON.stringify(process.env.STEP_FUNCTION_ARN));

  const transactionId = uuidv4();

  var params = {
    stateMachineArn: process.env.STEP_FUNCTION_ARN,
    name: transactionId,
    input: JSON.stringify({ Message: 'Hello world'})
  };

  var request = stepfunctions.startExecution(params);

  request.send();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Step function is launched',
      input: event,
    }, null, 2),
  };
}

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  

  console.log(event);

  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
}
