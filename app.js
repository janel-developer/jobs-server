const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const contributionsRouter = require('./routes/contributions_routes')
const jobsRouter = require('./routes/jobs_routes')

// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.PORT || 3030;

// Equivalant of create server in http library
const app = express();

// Call the middleware we want to use

const whitelist = ["http://localhost:3000/"]
const corsOptions = {
	credenials: true,
	origin: (host,cb) => {
		const allowed = whitelist.find((whiteHost) => whiteHost.includes(host))
		if(allowed) {
			console.log("Allowing host: ", host)
			cb(null,true)
		}	
		else {
			cb("Not allowed", false)
		}
	}
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Hi from your Express Server. You are awesome.")
});

app.use("/contributions", contributionsRouter)
app.use("/jobs", jobsRouter)

// Listen
app.listen(port, () => console.log(`Listening on port ${port}. Arrr.`));
