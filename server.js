const OpenAI = require('openai');
const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const { auth } = require('express-openid-connect');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rchari1:"+ process.env.mongoDBSecret +"@trivia-game-db.h56cz4h.mongodb.net/?retryWrites=true&w=majority";

//db client setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//openai configuration
const openai = new OpenAI({
  apiKey: process.env.openAI_secret,
});

//user auth configuration
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
app.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    console.log(req.oidc.user); 
    res.redirect('/TriviaHome');
  } else {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  }
});

//TriviaHome Route
app.get('/TriviaHome', async (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    res.redirect('/'); // Redirects to the home page if not authenticated
  } else {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));

  }
});


// Serve static files from the Vue frontend app
app.use(express.static(path.join(__dirname, 'client/dist')));

// Serve your API routes here

// All other requests will be sent to your frontend app
//Need to keep this request last
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});



//Authentication Route
app.get('/api/auth-status', (req, res) => {
  res.json({ isAuthenticated: req.oidc.isAuthenticated() });
});

//GPT Question Generator Route
app.post('/generate-questions', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Can you generate me a trivia question from the NBA from 2007 with 4 answer choices? Can you make this question as obscure as possible? I want it to be an extremely difficult, random question that a hardcore basketball fan would be stumped. In addition, i need to pass these questions and answers to my front end application for a trivia game. Can you format these questions and answers in the following format: It will be an array, the first index will be a string, the second index will be an object with all 4 answer choices, and the third index will be the correct answer." }],
      model: "gpt-3.5-turbo",
    });
  
    res.json(completion.choices[0]);

  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


/*
connect to mongodb
try {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
  // Ensures that the client will close when you finish/error
  await client.close();
}*/