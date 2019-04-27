const mongoose = require('mongoose'),

SampleSchema = new mongoose.Schema({
  title: { type:string, required:true },
  details: { type:string, required:true },
  date: { type:Date, default: Date.now }
});

// Defining a model called 'sampleDB' using the schema, SampleSchema
mongoose.model('sampleDB', SampleSchema);
  
  
