const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bathersPreference = require('./src/lib/bathersPreference');
//var serviceAccount = require('path/to/serviceAccountKey.json');
const cx = {
  admin: admin
};



admin.initializeApp();

exports.get = functions.https.onRequest(async (request, response) => {
  await bathersPreference.get(cx, request, response);
 });


 exports.set = functions.https.onRequest(async (request, response) => {
  await bathersPreference.set(cx, request, response);
 });
