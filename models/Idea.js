const mongoose = require('mongoose'),
	IdeaSchema = new mongoose.Schema({
		title: { type: String, required: true },
		details: { type: String, required: true },
		date: { type: Date, default: Date.now }
	});

// Defining a model called 'sampleDB' using the schema, SampleSchema
mongoose.model('Idea', IdeaSchema);
