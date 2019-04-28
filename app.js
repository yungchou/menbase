/* 
To use ES6 syntax, create a file .jshinttrc in the app root and set
{ "esversion": 6 }
*/
const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	port = 5000;

// Ref: https://mongoosejs.com/
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/sampleDB', {
		useNewUrlParser: true
	})
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.log(err));

// Load database
require('./models/Idea'); // Idea.js
const Idea = mongoose.model('Idea');

// VIEW ENGINE
/*
Add the following three statements to use Handlebars as the view engine.
Here, the degault html layout is define in views/layouts/main.handlebars
and update <body></body> to <body> {{{ body }}} </body>.
While the default page is views/index.handlebars.
Both views and view/main folders are to be manually created.
Ref: https://www.npmjs.com/package/express-handlebars 
*/
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// BODY-PARSER for parsing user input
// Ref: https://github.com/expressjs/body-parser

// Other settings configured in middleware
app.use(function(req, res, next) {
	//set up somehting here
	next();
});

// BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
app.get('/', (req, res) => {
	const info = 'Dynamic content is set in the backend, app.js.';
	res.render('index', {
		// render the page with dynamic content
		dynamicContent: info
	});
});
app.get('/about', (req, res) => {
	res.render('ABOUT');
});
app.get('/ideas/add', (req, res) => {
	res.render('ideas/add');
});
app.post('/ideas', (req, res) => {
	let errors = [];

	// Validating data after triming whitespace
	if (!req.body.title.trim()) {
		errors.push({ text: 'Please add a title.' });
	}
	if (!req.body.details.trim()) {
		errors.push({ text: 'Please describe your idea.' });
	}

	// Checking if any error
	if (errors.length > 0) {
		res.render('ideas/add', {
			//Re-rendering the form with errors and entered data
			errors: errors,
			title: req.body.title,
			details: req.body.details
		});
	} else {
		// Passed the data validation
		const newUser = {
			title: req.body.title,
			details: req.body.details
		};
		new Idea(newUser).save().then(idea => {
			res.redirect('/ideas');
		});
	}
});

// Listener
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
