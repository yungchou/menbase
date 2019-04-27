/* 
To use ES6 syntax, create a file .jshinttrc in the app root and set
{ "esversion": 6 }
*/
const express = require('express'),
	app = express(),
	port = 5000;

// Ref: https://mongoosejs.com/
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/sampleDB', {
		useMongoClient: true,
		useNewUrlParser: true
	})
	.then(() => console.log('MongoDB connected...'))
	.catch((err) => console.log(err));

// Load sampleDB
require('./models/sampleDB');
const sampleDB = mongoose.model('sampleDB');

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

// Other settings configured in middleware
app.use(function(req, res, next) {
	//set up somehting here
	next();
});

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

// Listener
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
