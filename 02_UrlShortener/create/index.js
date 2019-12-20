'use strict';

const AWS = require('aws-sdk')
const queryString = require('querystring');
const path = require('path')
const crypto = require('crypto')

const docClient = new AWS.DynamoDB.DocumentClient()
const tableName = `${process.env.SLS_STAGE}-shortened-urls`

function RenderPage (link, submitted) {
    return `
  <html>
  <body>
  <h3>
    <a href="${link}">${link}</a>
  </h3>
  <p>URL ${submitted} was shortened to:
    <a href="${link}">${link}</a>
  </p>
  </body>
  </html>`
  }

module.exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    //
    const submitted = queryString.parse(event.body).link;
    console.log('Url submitted: ' + submitted);
    const prefix = event.headers.Referer || "mysite.com";

    return new Promise((resolve, reject) => {
        
        resolve(crypto.randomBytes(8)
                      .toString('base64')
                      .replace(/[=+]/g, '')
                      .substring(0, 4)
               )
    })
    .then(slug => {
        console.log(`Trying to save URL ${submitted} slug ${slug} now`);
        return docClient.put({
            TableName: tableName,
            Item: {
                slug: slug,
                long_url: submitted
            },
            Expected: {
                long_url: { Exists : false }
            }

        })
        .promise().then(() => { return slug })
    })
    .then((slug) => {
        console.log('woo, succeeded!');
        return callback(
            null,
            {
              statusCode: 200,
              body: RenderPage(path.join(prefix, slug).replace(':/', '://'), prefix),
              headers: {'Content-Type': 'text/html'}
            }
          );
    })
    .catch(error => {
        console.log('Oh no, hit an error! ' + error)
        callback(
            null,
            {
              statusCode: 400,
              body: 'Something went wrong, please try again'
            }
          );
    })
};