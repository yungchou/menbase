const express = require('express'),
	exphbs = require('express-handlebars'),
	app = express(),
	port = 5000;

// Middleware of Handlebars
// Ref: https://www.npmjs.com/package/express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
	//set up somehting here
	next();
});

// Routing
app.get('/', (req, res) => {
	res.render('index');
});
app.get('/about', (req, res) => {
	res.render('ABOUT');
});

// Listener
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
