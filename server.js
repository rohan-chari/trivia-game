const OpenAI = require('openai');
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const { auth } = require('express-openid-connect');
const mongoose = require('mongoose');
const uri = "mongodb+srv://rchari1:"+ process.env.mongoDBSecret +"@trivia-game-db.h56cz4h.mongodb.net/?retryWrites=true&w=majority";

//Mongoose Setup
mongoose.connect(uri)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
const Schema = mongoose.Schema;

//Trivia Question Schema
const triviaQuestionSchema = new Schema({
  question: String,
  choices: [String],
  answer: String,
  subject: String,
  difficulty: String
});
const TriviaQuestion = mongoose.model('TriviaQuestion', triviaQuestionSchema);

//User Schema
const userInfoSchema = new Schema({
  name: String,
  email: String,
  userId: String,
  locale: String,
});
const UserInfo = mongoose.model('UserInfo', userInfoSchema);

const quickPlayLeaderBoardSchema = new Schema({
  userId: String,
  userName: String,
  score: String,
  difficulty: String,
  mode: String
});
const quickPlayLeader = mongoose.model('QuickPlayLeader', quickPlayLeaderBoardSchema);


//bodyparser to read post requests
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

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
    const existingUser = await UserInfo.findOne({ userId: req.oidc.user.sub });
    if(!existingUser){
      const newUser = UserInfo({
        name: req.oidc.user.name ? req.oidc.user.name : req.oidc.user.nickname,
        email: req.oidc.user.email,
        userId: req.oidc.user.sub,
        locale: req.oidc.user.locale
      })
      await newUser.save();
    }
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  }
});


// Serve static files from the Vue frontend app
app.use(express.static(path.join(__dirname, 'client/dist')));

// Serve your API routes here
//QuickPlay Question Getter Route
app.get('/api/quickplay/start', async (req, res) => {
  let difficulty = req.query.difficulty
  const allRecords = await TriviaQuestion.find({ difficulty: difficulty }).exec();

    // Shuffle the array (Fisher-Yates shuffle algorithm)
    for (let i = allRecords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allRecords[i], allRecords[j]] = [allRecords[j], allRecords[i]];
    }

    let numOfRecordsToFetch = 20; // Set the number of random records you want
    let randomRecords = allRecords.slice(0, numOfRecordsToFetch);

    res.json(randomRecords);
});

//Authentication Route
app.get('/api/auth-status', async (req, res) => {
  if(req.oidc.isAuthenticated()){
    const user = await UserInfo.findOne({ userId: req.oidc.user.sub });
    res.json(user);
  }else{
    res.redirect("/")
  }
});

//Quickplay leaderboard POST
app.post('/api/leaderboard/quickplay/scores', async (req, res) => {
  let difficultyReq = req.body.difficulty;
  let userIdReq = req.body.userId;
  let userNameReq = req.body.userName;
  let scoreReq = req.body.score;
  let modeReq = req.body.mode;

  try {
    const existingQuickPlayLeader = await quickPlayLeader.findOne({ userId: userIdReq, difficulty: difficultyReq, mode:modeReq });

    if (existingQuickPlayLeader) {
      // Update the existing record with the new score
      existingQuickPlayLeader.score = scoreReq;
      await existingQuickPlayLeader.save();
      res.status(200).json({ message: 'Score updated successfully', data: existingQuickPlayLeader });
    } else {
      // Create a new record and save it to the database
      const newQuickPlayLeader = new quickPlayLeader({
        userId: userIdReq,
        userName: userNameReq,
        difficulty: difficultyReq,
        score: scoreReq,
        mode:modeReq
      });
      await newQuickPlayLeader.save();
      res.status(201).json({ message: 'New score added successfully', data: newQuickPlayLeader });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.log(error);
    res.status(500).json({ message: 'An error occurred', error: error });
  }
});

app.get('/api/leaderboard/quickplay/scores', async (req, res) => {
  try {
    const results = await Promise.all([
      quickPlayLeader.aggregate([
        { $match: { difficulty: "Elementary School" }},
        { $addFields: { convertedScore: { $toInt: "$score" } } },
        { $sort: { convertedScore: -1 } }
      ]),
      quickPlayLeader.aggregate([
        { $match: { difficulty: "High School" }},
        { $addFields: { convertedScore: { $toInt: "$score" } } },
        { $sort: { convertedScore: -1 } }
      ]),
      quickPlayLeader.aggregate([
        { $match: { difficulty: "College" }},
        { $addFields: { convertedScore: { $toInt: "$score" } } },
        { $sort: { convertedScore: -1 } }
      ]),
      quickPlayLeader.aggregate([
        { $match: { difficulty: "Genius" }},
        { $addFields: { convertedScore: { $toInt: "$score" } } },
        { $sort: { convertedScore: -1 } }
      ])
    ]);
    console.log(results[0])
    res.json({
      elementarySchool: results[0],
      highSchool: results[1],
      college: results[2],
      genius: results[3]
    });
  } catch (error) {
    res.status(500).send("Error retrieving leaderboards");
  }
});



//HEAD TO HEAD Question Generator Route
app.post('/api/HeadToHead/start', async (req, res) => {
  try {
    let difficulty = req.body.difficulty;
    let subject = req.body.subject;
    let prompt = generatePrompt(difficulty, subject);
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt + "If there is any excess text in the data, can you clean it out so that I will be able to use the JSON.parse JavaScript function on it" }],
      model: "gpt-4"
    });

    let questionsArray = JSON.parse(completion.choices[0].message.content);
    let savedQuestions = [];

    // Fetch all questions from the database before the loop
    const allQuestions = await TriviaQuestion.find({}).lean(); // Using .lean() for performance if you only need plain JavaScript objects
    const questionMap = new Map(allQuestions.map(q => [`${q.subject}_${q.answer}`, q]));

    console.log('QUESTIONSARRAY', questionsArray)
    if (Array.isArray(questionsArray) && questionsArray.length > 0) {
      for (const questionData of questionsArray) {
        // Check in-memory if the question already exists
        if (!questionMap.has(`${questionData.subject || subject}_${questionData.answer}`)) {
          let questionObject = new TriviaQuestion({
            question: questionData.question,
            choices: questionData.choices,
            answer: questionData.answer,
            subject: questionData.subject || subject,
            difficulty: difficulty
          });

          await questionObject.save();
          savedQuestions.push(questionObject);

          // Optionally, update the in-memory map to reflect the addition
          questionMap.set(`${questionData.subject || subject}_${questionData.answer}`, questionObject);
        }
      }
      res.json(savedQuestions);
    } else {
      res.status(500).json({error: "Error parsing JSON"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//GET for Head To Head if Subject already exists
app.get('/api/HeadToHead/start', async (req, res) => {
  try {
    let difficulty = req.query.difficulty;
    let subject = req.query.subject;
    let filter = req.query.filter
    if (filter === 'false') {
      const allRecords = await TriviaQuestion.find({
        difficulty: { $regex: new RegExp(difficulty, 'i') },
        subject: { $regex: new RegExp(subject, 'i') }
      }).exec();
      
      for (let i = allRecords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allRecords[i], allRecords[j]] = [allRecords[j], allRecords[i]];
      }
  
      let numOfRecordsToFetch = allRecords.length; // Set the number of random records you want
      let randomRecords = allRecords.slice(0, numOfRecordsToFetch);
      res.json(randomRecords);
    } else if(filter === 'true') {
      const allRecords = await TriviaQuestion.find({
        difficulty: { $regex: new RegExp(difficulty, 'i') },
        subject: { $regex: new RegExp(subject, 'i') }
      }).exec();
      
      for (let i = allRecords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allRecords[i], allRecords[j]] = [allRecords[j], allRecords[i]];
      }
  
      let numOfRecordsToFetch = 10; // Set the number of random records you want
      let randomRecords = allRecords.slice(0, numOfRecordsToFetch);
      res.json(randomRecords);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "error" });
  }
});



//Head to Head Game Mode Select Autocomplete Route
app.get('/api/subject/autocomplete', async (req, res) => {
  TriviaQuestion.find().select('subject -_id').then(results => {
    const subjects = results.map(doc => doc.subject.trim().toLowerCase());
    const uniqueSubjects = [...new Set(subjects)]; // Remove duplicates
    res.json(uniqueSubjects);
  }).catch(err => {
      res.status(500).send('Error occurred: ' + err.message);
  });
})


// All other requests will be sent to your frontend app
//KEEP THIS LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const generatePrompt = (difficulty, subject) => {
  let topicDescription; // Customize this based on the difficulty
  switch (difficulty) {
    case 'Elementary School':
      topicDescription = "Generate a trivia question that is simple, clear, and suitable for an elementary school student. The question should challenge children in this age group without being too complex for them, yet it should be too straightforward for high school students or adults.";
      break;
    case 'High School':
      topicDescription = 'Generate a trivia question that is engaging and challenging for a high school student. The question should be complex enough to test the knowledge typical of this educational level but not too advanced for someone not in college.';
      break;
    case 'College':
      topicDescription = 'Generate a trivia question that is suitable for a college student, requiring a deeper level of understanding and critical thinking. The question should be challenging for individuals who have not received higher education.';
      break;
    case 'Genius':
      topicDescription = 'Generate a trivia question that is highly challenging and suitable for an expert in a specific field. The question should require specialized knowledge and be difficult for those without professional or advanced expertise in the subject area.';
      break;
    default:
      topicDescription = 'Generate a general knowledge trivia question that is interesting and accessible to a broad audience. The question should not require specialized knowledge and should be suitable for various ages and educational backgrounds.';
  }
  return `Generate 10 unique trivia questions focusing on the following themes: ${subject}. I want you to get more specific into this topic depending on the age group. Each question should explore specific details, revealing fascinating and lesser-known information within these themes. Ensure the questions are captivating, thought-provoking, and uncommon in standard trivia collections. Aim to challenge trivia enthusiasts with novel and surprising topics, avoiding repetition and well-known trivia subjects. Creatively expand on these themes to offer a rich variety of questions. ${topicDescription}.  Format the response as an array of JSON objects, strictly adhering to the following structure: {"question": "<question_text>", "choices": ["<choice1>", "<choice2>", "<choice3>", "<choice4>"], "answer": "<correct_answer>", "subject": "<selected_topic>", "difficulty": "${difficulty}"}. For the difficulty level in each question, please make sure to set it as ${difficulty}. Please do not include any additional text or information outside of this JSON structure.`
  //return `Generate a unique trivia question focusing on one of the following themes: obscure historical events, lesser-known scientific discoveries, unusual cultural practices around the world, niche aspects of sports, hidden gems in the entertainment industry, or intriguing geography facts. Please do a good job of choosing a random one of these topics as it is of utmost importance that if I want more questions, I get a an equal chance of getting a different subject. Each question should explore specific details, revealing fascinating and lesser-known information within these themes. Ensure the questions are captivating, thought-provoking, and uncommon in standard trivia collections. Aim to challenge trivia enthusiasts with novel and surprising topics, avoiding repetition and well-known trivia subjects. Creatively expand on these themes to offer a rich variety of questions. ${topicDescription}.  Format the response as a JSON object, strictly adhering to the following structure: {"question": "<question_text>", "choices": ["<choice1>", "<choice2>", "<choice3>", "<choice4>"], "answer": "<correct_answer>", "subject": "<selected_topic>", "difficulty": "${difficulty}"}. Please do not include any additional text or information outside of this JSON structure.`
}


