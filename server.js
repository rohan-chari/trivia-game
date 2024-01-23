const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.auth0_secret,
  baseURL: process.env.auth0_baseURL,
  clientID: process.env.auth0_clientId,
  issuerBaseURL: process.env.auth0_issuerBaseURL
};

app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/hmm', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  console.log(req.oidc.user)
});

// Serve static files from the Vue frontend app
app.use(express.static(path.join(__dirname, 'client/dist')));

// Serve your API routes here

// All other requests will be sent to your frontend app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
