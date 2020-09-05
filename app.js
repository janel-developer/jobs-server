const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const contributionsRouter = require('./routes/contributions_routes');
const jobsRouter = require('./routes/jobs_routes');

// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.PORT || 3030;

// Equivalant of create server in http library
const app = express();

if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// Database
const dbConn = process.env.MONGODB_URI || 'mongodb://localhost/jobs_app'

// Set three properties to avoid deprecation warnings:
// useNewUrlParser: true
// useUnifiedTopology: true
// useFileAndModify: false
// useCreateIndex: true
mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database',dbConn);
        }
    });

// Middleware
const whitelist = ["http://localhost:3000/","https://jakes-jobs.netlify.app/"]
const corsOptions = {
	credenials: true,
	origin: (host,cb) => {
		const allowed = whitelist.find((whiteHost) => whiteHost.includes(host))
		if(allowed) {
			console.log("Allowing host: ", host)
			cb(null,true)
		}	
		else {
			cb(`${host} not allowed`, false)
		}
	}
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Hi from your Express Server. You are awesome.")
});

app.use("/contributions", contributionsRouter);
app.use("/jobs", jobsRouter);

// Listen
app.listen(port, () => console.log(`Listening on port ${port}. Arrr.`));
