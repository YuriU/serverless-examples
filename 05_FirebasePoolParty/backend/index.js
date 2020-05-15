const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bathersPreference = require('./src/lib/bathersPreference');
const auth = require('./src/middleware/auth')

const cx = {
  admin: admin
};


const app = express();
admin.initializeApp();

app.use(cors({origin: true}));
app.use(auth.requiresAuth.bind(null, admin))

app.get('/', (request, response) => bathersPreference.get(cx, request, response));
app.post('/', (request, response) => bathersPreference.set(cx, request, response));
 
exports.bathers = functions.https.onRequest(app);
