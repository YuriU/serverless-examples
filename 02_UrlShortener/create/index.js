'use strict';

const queryString = require('querystring');


module.exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event));
    const submitted = queryString.parse(event.body).link;
    console.log('Url submitted: ' + submitted);
    const prefix = event.headers.Referer || "mysite.com";

    callback(null, {
        statusCode: 200,
        body: `
        <html>
            <body>
                <h3>URL ${submitted} has been shortend:
                    <a href="https://${prefix}/fake">${prefix}/fake</a>
                </h3>
            </body>
        </html>
        `,
        headers: { 'Content-Type' : 'text/html' }
    });
};