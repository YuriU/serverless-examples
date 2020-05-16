'use strict';
const auth0Authorizer = require('./authorizer');


module.exports.handler = async (event, context) => {
  const authHeader = event.authorizationToken;
  const methodArn = event.methodArn;
  const Auth0BaseURL = process.env.AUTH0_DOMAIN;


  await auth0Authorizer(authHeader, Auth0BaseURL, 'RS256');

  return {
    principalId: 'user',
    policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'allow',
            Resource: methodArn
          }
        ]
      }
  }
};
