// To use ES6 syntax, create a file .jshinttrc in the app root and set { "esversion": 6 }
const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	port = 5000;

// Ref: https://mongoosejs.com/
const mongoose = require('mongoose'),
	dbName = 'Idea';

mongoose
	.connect(`mongodb://localhost/${dbName}`, {
		// Here, specify the DB name as 'Idea'
		useNewUrlParser: true
	})
	.then(() => console.log(`MongoDB connected to '${dbName}' database...`))
	.catch((err) => console.log(err));

// Load database
require(`./models/${dbName}`); // Idea.js
const `$dbName` = mongoose.model(`${dbName}`);

// VIEW ENGINE - HANDLEBARS
/*
Add the following three statements to use Handlebars as the view engine.
Here, the default html layout is define in views/layouts/main.handlebars
and update <body></body> to <body> {{{ body }}} </body>.
While the default page is views/index.handlebars.
Both views and view/main folders are to be manually created.
Ref: https://www.npmjs.com/package/express-handlebars 
*/
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// BODY-PARSER for parsing html's body section
// Ref: https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// HOME PAGE
app.get('/', (req, res) => {
	const info = 'Dynamic content is set in the backend, app.js.';
	res.render('index', {
		// render the page with dynamic content
		dynamicContent: info
	});
});
// ABOUT PAGE
app.get('/about', (req, res) => {
	res.render('ABOUT');
});
// IDEAS INDEX PAGE
app.get('/ideas', (req, res) => {
	Idea.find({})
		.sort({ date: 'desc' })
		.then((ideas) => {
			res.render('ideas/index', {
				ideas: ideas
			});
		});
});
// ADDING IDEAS
app.get('/ideas/add', (req, res) => {
	res.render('ideas/add');
});
// EDITING IDEAS
app.get('/ideas/edit/:id', (req, res) => {
	Idea.findOne({ _id: req.params.id }).then((idea) => {
		res.render('ideas/edit', {
			idea: idea
		});
	});
});
// Processing FORM
app.post('/ideas', (req, res) => {
	let errors = [];

	// Processing form data after trimming whitespace
	if (!req.body.title.trim()) {
		errors.push({ text: 'Please add a title.' });
	}
	if (!req.body.details.trim()) {
		errors.push({ text: 'Please describe your idea.' });
	}

	if (errors.length > 0) {
		//Re-rendering the form with errors and already entered data
		res.render('ideas/add', {
			errors: errors,
			title: req.body.title,
			details: req.body.details
		});
	} else {
		// Add the idea to database
		const newUser = {
			title: req.body.title,
			details: req.body.details
		};
		new Idea(newUser).save().then((idea) => {
			res.redirect('/ideas');
		});
	}
});

// Listener
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
